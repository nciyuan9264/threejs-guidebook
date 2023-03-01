function addGeometry(scene, geom, name, texture, gui, controls) {
  let mat = new THREE.MeshStandardMaterial(
    {
      map: texture,
      metalness: 0.2,
      roughness: 0.07
  });
  let mesh = new THREE.Mesh(geom, mat);
  mesh.castShadow = true;
  
  scene.add(mesh);
  addBasicMaterialSettings(gui, controls, mat, name + '-THREE.Material');
  addSpecificMaterialSettings(gui, controls, mat, name + '-THREE.MeshStandardMaterial');

  return mesh;
};

function addGeometryWithMaterial(scene, geom, name, gui, controls, material) {
  let mesh = new THREE.Mesh(geom, material);
  mesh.castShadow = true;
  
  scene.add(mesh);
  addBasicMaterialSettings(gui, controls, material, name + '-THREE.Material');
  addSpecificMaterialSettings(gui, controls, material, name + '-Material');

  return mesh;
};