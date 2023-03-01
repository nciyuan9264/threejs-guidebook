function init() {

  // setup the scene for rendering
  let camera = initCamera(new THREE.Vector3(30, 30, 30));
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  let posSrc = { pos: 1}  
  let tween = new TWEEN.Tween(posSrc).to({pos: 0}, 2000); 
  tween.easing(TWEEN.Easing.Bounce.InOut); 
 
  let tweenBack = new TWEEN.Tween(posSrc).to({pos: 1}, 2000); 
  tweenBack.easing(TWEEN.Easing.Bounce.InOut); 
  
  tweenBack.chain(tween); 
  tween.chain(tweenBack); 

  tween.start();

  let loaderScene = new BaseLoaderScene(camera, false, false, function(mesh) {

    TWEEN.update();

    let positionArray = mesh.geometry.attributes['position']
    let origPosition = mesh.geometry.origPosition

    for (i = 0; i < positionArray.count ; i++) {
      let oldPosX = origPosition.getX(i);
      let oldPosY = origPosition.getY(i);
      let oldPosZ = origPosition.getZ(i);
      positionArray.setX(i, oldPosX * posSrc.pos);
      positionArray.setY(i, oldPosY * posSrc.pos);
      positionArray.setZ(i, oldPosZ * posSrc.pos);
    }
    positionArray.needsUpdate = true;
  });

  let loader = new THREE.PLYLoader();
  loader.load("../../assets/models/carcloud/carcloud.ply", function (geometry) {
    let material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1,
      opacity: 0.6,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: generateSprite()
    });

    // copy the original position, so we can referene that when tweening
    let origPosition = geometry.attributes['position'].clone()
    geometry.origPosition = origPosition

    let group = new THREE.Points(geometry, material);
    group.scale.set(2.5, 2.5, 2.5);
    loaderScene.render(group, camera);
  });
}

// From Three.js examples
function generateSprite() {

  let canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  let context = canvas.getContext('2d');

  // draw the sprites
  let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
  gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
  gradient.addColorStop(1, 'rgba(0,0,0,1)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // create the texture
  let texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}