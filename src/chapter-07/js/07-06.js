function init() {

  let stats = initStats();
  let camera = initCamera(new THREE.Vector3(20, 0, 150));
  let scene = new THREE.Scene();
  let webGLRenderer = initRenderer();

  createSprites();
  render();

  function createSprites() {
    let material = new THREE.SpriteMaterial({
      map: createGhostTexture(),
      color: 0xffffff
    });

    let range = 500;
    for (let i = 0; i < 1500; i++) {
      let sprite = new THREE.Sprite(material);
      sprite.position.set(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() *
        range - range / 2);
      sprite.scale.set(4, 4, 4);
      scene.add(sprite);
    }
  }

  let step = 0;

  function render() {
    stats.update();
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
  }

}