class Mode3D {
   constructor() {
   }

   update() {
      const { models } = THREEViewer.dataset;

      const mesh = models.getObject('test').scene;

      mesh.scale.setScalar(0.001);

      mesh.traverse(child => {
         if (child.isMesh) {
            const { color } = child.material;

            // const material = new THREE.MeshStandardMaterial({ color });
            const material = new THREE.MeshBasicMaterial({ color });
            // console.log(material);
            child.material = material;
         }
      });

      THREEViewer.system.scene.add(mesh);
   }
}

export default Mode3D;