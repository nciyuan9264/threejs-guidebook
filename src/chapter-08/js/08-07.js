// function init() {

//   // use the defaults
//   let stats = initStats();
//   let webGLRenderer = initRenderer();
//   let scene = new THREE.Scene();
//   let camera = initCamera(new THREE.Vector3(-30, 40, 50));
//   camera.lookAt(new THREE.Vector3(0, 10, 0));

//   let stats = initStats();

//   let keyLight = new THREE.SpotLight(0xffffff);
//   keyLight.position.set(00, 80, 80);
//   keyLight.intensity = 2;
//   keyLight.lookAt(new THREE.Vector3(0, 15, 0));
//   keyLight.castShadow = true;
//   keyLight.shadow.mapSize.height = 2048;
//   keyLight.shadow.mapSize.width = 2048;

//   scene.add(keyLight);

//   let backlight1 = new THREE.SpotLight(0xaaaaaa);
//   backlight1.position.set(150, 40, -20);
//   backlight1.intensity = 0.5;
//   backlight1.lookAt(new THREE.Vector3(0, 15, 0));
//   scene.add(backlight1);

//   let backlight2 = new THREE.SpotLight(0xaaaaaa);
//   backlight2.position.set(-150, 40, -20);
//   backlight2.intensity = 0.5;
//   backlight2.lookAt(new THREE.Vector3(0, 15, 0));
//   scene.add(backlight2);

//   // call the render function
//   let step = 0;


//   let mesh;

//   let mtlLoader = new THREE.MTLLoader();
//   mtlLoader.setPath("../../assets/models/butterfly/")
//   mtlLoader.load('butterfly.mtl', function (materials) {
//     materials.preload();
//     let objLoader = new THREE.OBJLoader();
//     objLoader.setMaterials(materials);
//     objLoader.load('../../assets/models/butterfly/butterfly.obj', function (object) {

//       // move wings to more horizontal position
//       [0, 2, 4, 6].forEach(function (i) {
//         object.children[i].rotation.z = 0.3 * Math.PI
//       });

//       [1, 3, 5, 7].forEach(function (i) {
//         object.children[i].rotation.z = -0.3 * Math.PI
//       });


//       // configure the wings,
//       let wing2 = object.children[5];
//       let wing1 = object.children[4];

//       wing1.material.opacity = 0.9;
//       wing1.material.transparent = true;
//       wing1.material.depthTest = false;
//       wing1.material.side = THREE.DoubleSide;

//       wing2.material.opacity = 0.9;
//       wing2.material.depthTest = false;
//       wing2.material.transparent = true;
//       wing2.material.side = THREE.DoubleSide;

//       object.scale.set(140, 140, 140);
//       mesh = object;
//       scene.add(mesh);

//       object.rotation.x = 0.2;
//       object.rotation.y = -1.3;
//     });
//   });



//   render();


//   function render() {
//     stats.update();

//     if (mesh) {
//       mesh.rotation.y += 0.006;
//     }

//     // render using requestAnimationFrame
//     requestAnimationFrame(render);
//     webGLRenderer.render(scene, camera);
//   }
// }


function init() {

  // setup the scene for rendering
  let camera = initCamera(new THREE.Vector3(50, 50, 50));
  let loaderScene = new BaseLoaderScene(camera);
  camera.lookAt(new THREE.Vector3(0, 15, 0));

  let mtlLoader = new THREE.MTLLoader();
  mtlLoader.setPath("../../assets/models/butterfly/")
  mtlLoader.load('butterfly.mtl', function (materials) {
    materials.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('../../assets/models/butterfly/butterfly.obj', function (object) {

      // move wings to more horizontal position
      [0, 2, 4, 6].forEach(function (i) {
        object.children[i].rotation.z = 0.3 * Math.PI
      });

      [1, 3, 5, 7].forEach(function (i) {
        object.children[i].rotation.z = -0.3 * Math.PI
      });

      // configure the wings,
      let wing2 = object.children[5];
      let wing1 = object.children[4];

      wing1.material.opacity = 0.9;
      wing1.material.transparent = true;
      wing1.material.depthTest = false;
      wing1.material.side = THREE.DoubleSide;

      wing2.material.opacity = 0.9;
      wing2.material.depthTest = false;
      wing2.material.transparent = true;
      wing2.material.side = THREE.DoubleSide;

      object.scale.set(140, 140, 140);
      mesh = object;

      object.rotation.x = 0.2;
      object.rotation.y = -1.3;

      loaderScene.render(mesh, camera);
    });
  });
}