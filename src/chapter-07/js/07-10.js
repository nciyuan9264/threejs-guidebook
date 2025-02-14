function init() {

  // use the defaults
  let stats = initStats();
  let webGLRenderer = initRenderer();
  let scene = new THREE.Scene();
  let camera = initCamera(new THREE.Vector3(20, 0, 150));
  camera.lookAt(new THREE.Vector3(20, 30, 0));

  createSprites();
  render();

  let group;

  function getTexture() {
    let texture = new THREE.TextureLoader().load("../../assets/textures/particles/sprite-sheet.png");
    return texture;
  }

  function createSprites() {
    group = new THREE.Object3D();
    let range = 200;
    for (let i = 0; i < 400; i++) {
      group.add(createSprite(10, false, 0.6, 0xffffff, i % 5, range));
    }
    scene.add(group);
  }

  function createSprite(size, transparent, opacity, color, spriteNumber, range) {

    let spriteMaterial = new THREE.SpriteMaterial({
      opacity: opacity,
      color: color,
      transparent: transparent,
      map: getTexture()
    });

    // we have 1 row, with five sprites
    spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0);
    spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1);
    spriteMaterial.depthTest = false;

    spriteMaterial.blending = THREE.AdditiveBlending;

    let sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size, size, size);
    sprite.position.set(
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
      Math.random() * range - range / 2);

    return sprite;
  }



  function render() {

    stats.update();
    group.rotation.x +=0.01;

    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
  }
}