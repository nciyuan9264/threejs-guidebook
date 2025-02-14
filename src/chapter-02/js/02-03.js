function init() {

    let stats = initStats();

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    let scene = new THREE.Scene();
    scene.overrideMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });

    // create a camera, which defines where we're looking at.
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    let renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    // create the ground plane
    let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    let planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;

    // add the plane to the scene
    scene.add(plane);

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add subtle ambient lighting
    let ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    // add spotlight for the shadows
    let spotLight = new THREE.SpotLight(0xffffff, 1, 150, 120);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // add the output of the renderer to the html element
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // call the render function
    let step = 0;

    let controls = new function () {
        this.rotationSpeed = 0.02;
        this.numberOfObjects = scene.children.length;

        this.removeCube = function () {
            let allChildren = scene.children;
            let lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        };

        this.addCube = function () {

            let cubeSize = Math.ceil((Math.random() * 3));
            let cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            let cubeMaterial = new THREE.MeshLambertMaterial({
                color: Math.random() * 0xffffff
            });
            let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.castShadow = true;

            // position the cube randomly in the scene
            cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
            cube.position.y = Math.round((Math.random() * 5));
            cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

            // add the cube to the scene
            scene.add(cube);
            this.numberOfObjects = scene.children.length;
        };

        this.outputObjects = function () {
            console.log(scene.children);
        }
    };

    let gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'addCube');
    gui.add(controls, 'removeCube');
    gui.add(controls, 'outputObjects');
    gui.add(controls, 'numberOfObjects').listen();

    let trackballControls = initTrackballControls(camera, renderer);
    let clock = new THREE.Clock();

    render();

    function render() {

        trackballControls.update(clock.getDelta());
        stats.update();

        // rotate the cubes around its axes
        scene.traverse(function (e) {
            if (e instanceof THREE.Mesh && e != plane) {

                e.rotation.x += controls.rotationSpeed;
                e.rotation.y += controls.rotationSpeed;
                e.rotation.z += controls.rotationSpeed;
            }
        });

        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
}