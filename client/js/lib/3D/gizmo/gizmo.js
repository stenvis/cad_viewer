const SIZE = (window.innerWidth / 10) * 0.8;

class Gizmo {
   #renderer;
   #scene;
   #camera;
   #src_camera;
   #gizmo;

   constructor(renderer, src_camera) {
      this.#renderer = renderer;
      this.#src_camera = src_camera;

      this.#scene = new THREE.Scene();
      const dir_light = new THREE.DirectionalLight(0xffffff, 1);
      const hem_light = new THREE.HemisphereLight(0xffffff, 0xededed, 1.4);
      dir_light.position.set(2, 2, 2); 
      this.#scene.add(dir_light);
      this.#scene.add(hem_light);

      this.#camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0, 10);
      this.#camera.position.z = 2;
   }

   init() {
      const { models, textures } = THREEViewer.dataset;

      this.#gizmo = new THREE.Group(); 
      const cube_mesh = models.getObject('gizmo').scene;
      const text_mesh = models.getObject('gizmo').scene.clone();
      const texture = textures.getObject('gizmo');

      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      texture.flipY = false;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = this.#renderer.capabilities.getMaxAnisotropy();

      cube_mesh.traverse(mesh => {
         const material = new THREE.MeshStandardMaterial({
            color: 0x42f59e,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
         });

         mesh.material = material;
      })

      text_mesh.traverse(mesh => {
         const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
         });

         mesh.material = material;
      })

      this.#gizmo.add(cube_mesh).add(text_mesh);

      this.#scene.add(this.#gizmo);

      this.enable();
   }

   enable() {
		THREEViewer.emitters.camera.on('orbital_damping', this.updateCameraView);
   }

   updateCameraView = () => {
      this.#gizmo.quaternion.copy(this.#src_camera.quaternion).invert();
   }

   render() {
      this.#renderer.autoClear = false;
      this.#renderer.clearDepth();
      this.#renderer.setViewport(SIZE, SIZE, SIZE, SIZE);
      this.#renderer.setScissor(SIZE, SIZE, SIZE, SIZE);
      this.#renderer.setScissorTest(true);
      this.#renderer.render(this.#scene, this.#camera);
   }
}

export default Gizmo;