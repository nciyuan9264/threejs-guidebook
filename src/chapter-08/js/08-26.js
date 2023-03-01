function init() {

  // setup the scene for rendering
  let camera = initCamera(new THREE.Vector3(30, 30, 30));
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  let loaderScene = new BaseLoaderScene(camera);

  let loader = new THREE.SVGLoader();

  // you can use slicer to convert the model
  loader.load("../../assets/models/tiger/tiger.svg", function (paths) {
    let group = new THREE.Group();
    group.scale.multiplyScalar( 0.1 );
    group.scale.y *= -1;
    for ( let i = 0; i < paths.length; i ++ ) {
      let path = paths[ i ];
      let material = new THREE.MeshBasicMaterial( {
        color: path.color,
        side: THREE.DoubleSide,
        depthWrite: false
      } );
      let shapes = path.toShapes( true );
      for ( let j = 0; j < shapes.length; j ++ ) {
        let shape = shapes[ j ];
        let geometry = new THREE.ShapeBufferGeometry( shape );
        let mesh = new THREE.Mesh( geometry, material );
        group.add( mesh );
      }
    }
          
    console.log(group);
    loaderScene.render(group, camera);
  });


}