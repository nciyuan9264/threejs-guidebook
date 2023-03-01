function init() {
    let stats = initStats();
    let renderer = initRenderer();
    let camera = initCamera();
    let scene = new THREE.Scene();

    let projector = new THREE.Projector();
    // document.getElementById("webgl-output")
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);    

    initDefaultLighting(scene);

    let groundPlane = addGroundPlane(scene)
    groundPlane.position.y = 0;

    // create a cube
    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    let cubeMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube
    cube.position.x = -10;
    cube.position.y = 4;
    cube.position.z = 0;

    // add the cube to the scene
    scene.add(cube);

    let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    let sphereMaterial = new THREE.MeshStandardMaterial({color: 0x7777ff});
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // position the sphere
    sphere.position.x = 20;
    sphere.position.y = 0;
    sphere.position.z = 2;
    sphere.castShadow = true;
    // add the sphere to the scene
    scene.add(sphere);

    let cylinderGeometry = new THREE.CylinderGeometry(2, 2, 20);
    let cylinderMaterial = new THREE.MeshStandardMaterial({color: 0x77ff77});
    let cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.castShadow = true;
    cylinder
        .position
        .set(0, 0, 1);

    scene.add(cylinder);

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add subtle ambient lighting
    let ambienLight = new THREE.AmbientLight(0x353535);
    scene.add(ambienLight);

    // call the render function
    let step = 0;

    let controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
        this.scalingSpeed = 0.03;
        this.showRay = false;
    };

    let gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);
    gui.add(controls, 'scalingSpeed', 0, 0.5);
    gui.add(controls, 'showRay').onChange(function (e) {
        if (tube) scene.remove(tube)
    });

    renderScene();
    let step = 0;
    let scalingStep = 0;

    function renderScene() {
        stats.update();

        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        // bounce the sphere up and down
        step += controls.bouncingSpeed;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

        // scale the cylinder
        scalingStep += controls.scalingSpeed;
        let scaleX = Math.abs(Math.sin(scalingStep / 4));
        let scaleY = Math.abs(Math.cos(scalingStep / 5));
        let scaleZ = Math.abs(Math.sin(scalingStep / 7));
        cylinder
            .scale
            .set(scaleX, scaleY, scaleZ);

        // render using requestAnimationFrame
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }

    let projector = new THREE.Projector();
    let tube;

    function onDocumentMouseDown(event) {

        let vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
        vector = vector.unproject(camera);

        let raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        let intersects = raycaster.intersectObjects([sphere, cylinder, cube]);

        if (intersects.length > 0) {
            console.log(intersects[0]);
            intersects[0].object.material.transparent = true;
            intersects[0].object.material.opacity = 0.1;
        }
    }

    function onDocumentMouseMove(event) {
        if (controls.showRay) {
            let vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
            vector = vector.unproject(camera);

            let raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
            let intersects = raycaster.intersectObjects([sphere, cylinder, cube]);

            if (intersects.length > 0) {

                let points = [];
                points.push(new THREE.Vector3(-30, 39.8, 30));
                points.push(intersects[0].point);

                let mat = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 0.6});
                let tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 60, 0.001);

                if (tube) 
                    scene.remove(tube);
                
                if (controls.showRay) {
                    tube = new THREE.Mesh(tubeGeometry, mat);
                    scene.add(tube);
                }
            }
        }
    }
}