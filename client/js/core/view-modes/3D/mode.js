const {
   max,
} = Math;

const box3 = new THREE.Box3();
const vec3 = new THREE.Vector3();

class Mode3D {
   #active_mesh;

   update() {
      const { emitters, dataset } = THREEViewer;

      const model = dataset.models.getObject('test');

      this.setModel(model);

      emitters.loader.on('gltf_parsed', this.setModel);
   }

   setModel = (model) => {
      if (this.#active_mesh) this.#active_mesh.removeFromParent();

      const { system } = THREEViewer;
      const mesh = model.scene;

      mesh.traverse(child => {
         if (child.isMesh) {
            const { color } = child.material;

            // const material = new THREE.MeshStandardMaterial({ color });
            const material = new THREE.MeshBasicMaterial({ color });
            child.material = material;
         }
      });


      const box = box3.setFromObject(mesh);
      box.getCenter(vec3);
      mesh.position.sub(vec3);
      box.getSize(vec3);

      const max_length = max(vec3.x, vec3.y, vec3.z) * 2;

      system.orbital.updateZoom(max_length);

      system.scene.add(mesh);

      this.#active_mesh = mesh;

      window.render.update();
   }
}

export default Mode3D;