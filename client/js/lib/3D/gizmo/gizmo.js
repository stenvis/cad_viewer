import easing from "/js/lib/helpers/math/easing.js";

const {
   min, max,
} = Math;

const { 
   lerp,
   easeInSine,
} = easing;

const 
   coords = new THREE.Vector2(),
   WS = window.innerHeight / 3,
   GS = 4,
   SPEED = 3.2;

const SIDES = {
   top: {
      angles: { x: 90, y: 90 },
      object: null, 
   },
   front: {
      angles: { x: 90, y: 0 },
      object: null, 
   },
   left: {
      angles: { x: 0, y: 0 },
      object: null, 
   },
   right: {
      angles: { x: 180, y: 0 },
      object: null, 
   },
   back: {
      angles: { x: -90, y: 0 },
      object: null, 
   },
   bottom: {
      angles: { x: 90, y: -90 },
      object: null, 
   }
};

let BORDER_MESH;


class Gizmo {
   #renderer;
   #scene;
   #camera;
   #base_camera;
   #gizmo;
   #active_side_name;

   constructor(renderer, base_camera) {
      this.#renderer = renderer;
      this.#base_camera = base_camera;

      this.#scene = new THREE.Scene();
      this.#camera = new THREE.OrthographicCamera(-GS, GS, GS, -GS, 0, 10);
      const dir_light = new THREE.DirectionalLight(0xffffff, 1);
      const hem_light = new THREE.HemisphereLight(0xffffff, 0xededed, 1.4);
      dir_light.position.set(2, 2, 2); 
      this.#scene.add(dir_light);
      this.#scene.add(hem_light);

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


      const 
         color = new THREE.Color(0.26, 0.96, 0.62),
         hover_color = new THREE.Color(0.3, 0.5, 0.98),
         opacity = 0.8,
         hover_opacity = 1,
         progress = 0;

      for (const name in SIDES) {
         const mesh = cube_mesh.getObjectByName(name);

         const material = new THREE.MeshStandardMaterial({
            color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity,
         });

         material.userData.src_color = color;
         material.userData.hover_color = hover_color;
         material.userData.src_opacity = opacity;
         material.userData.hover_opacity = hover_opacity;
         material.userData.progress = progress;

         mesh.material = material;

         SIDES[name].object = mesh;
      }


      BORDER_MESH = cube_mesh.getObjectByName('Cube');

      const material = new THREE.MeshStandardMaterial({
         color,
         side: THREE.DoubleSide,
         transparent: true,
         opacity,
      });

      material.userData.src_opacity = opacity;
      material.userData.hover_opacity = 0.4;
      material.userData.progress = progress;

      BORDER_MESH.material = material;


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
      this.#gizmo.quaternion.copy(this.#base_camera.quaternion).invert();
   }

   render() {
      const { width, height } = canvas;
      this.#renderer.autoClear = false;
      this.#renderer.clearDepth();
      this.#renderer.setViewport(width - WS, height - WS, WS, WS);
      this.#renderer.setScissor(width - WS, height - WS, WS, WS);
      this.#renderer.setScissorTest(true);
      this.#renderer.render(this.#scene, this.#camera);
   }

   borderFadeIn() {
      const {
         src_opacity,
         hover_opacity,
         progress,
      } = BORDER_MESH.material.userData;

      let time = progress;

      function tick(dt) {
         time += dt * SPEED;

         const progress = min(easeInSine(time), 1);

         const o = lerp(src_opacity, hover_opacity, progress);

         BORDER_MESH.material.opacity = o;
         BORDER_MESH.material.userData.progress = progress;

         if (progress === 1) THREEViewer.system.pool.removeTarget(BORDER_MESH.uuid);
      }

      THREEViewer.system.pool.rewriteTarget(BORDER_MESH.uuid, tick);
   }

   borderFadeOut() {
      const {
         src_opacity,
         hover_opacity,
         progress,
      } = BORDER_MESH.material.userData;

      let time = progress;

      function tick(dt) {
         time -= dt * SPEED;

         const progress = max(time, 0);

         const o = lerp(src_opacity, hover_opacity, progress);

         BORDER_MESH.material.opacity = o;
         BORDER_MESH.material.userData.progress = progress;

         if (progress === 0) THREEViewer.system.pool.removeTarget(BORDER_MESH.uuid);
      }

      THREEViewer.system.pool.rewriteTarget(BORDER_MESH.uuid, tick);
   }

   sideFadeIn(material) {
      const {
         src_color,
         hover_color,
         src_opacity,
         hover_opacity,
         progress,
      } = material.userData;

      let time = progress;

      function tick(dt) {
         time += dt * SPEED;

         const progress = min(easeInSine(time), 1);

         const
            r = lerp(src_color.r, hover_color.r, progress),
            g = lerp(src_color.g, hover_color.g, progress),
            b = lerp(src_color.b, hover_color.b, progress),
            o = lerp(src_opacity, hover_opacity, progress);

         material.color.set(r, g, b);
         material.opacity = o;
         material.userData.progress = progress;

         if (progress === 1) THREEViewer.system.pool.removeTarget(material.uuid);
      }

      THREEViewer.system.pool.rewriteTarget(material.uuid, tick);
   }

   sideFadeOut(material) {
      const {
         src_color,
         hover_color,
         src_opacity,
         hover_opacity,
         progress,
      } = material.userData;

      let time = progress;

      function tick(dt) {
         time -= dt * SPEED;

         const progress = max(time, 0);

         const
            r = lerp(src_color.r, hover_color.r, progress),
            g = lerp(src_color.g, hover_color.g, progress),
            b = lerp(src_color.b, hover_color.b, progress),
            o = lerp(src_opacity, hover_opacity, progress);

         material.color.set(r, g, b);
         material.opacity = o;
         material.userData.progress = progress;

         if (progress === 0) THREEViewer.system.pool.removeTarget(material.uuid);
      }

      THREEViewer.system.pool.rewriteTarget(material.uuid, tick);
   }

   mousemove(intersection) {
      const { object } = intersection;

      const { name } = object;

      if (this.#active_side_name == name) return;

      if (!SIDES[name]) return;

      const { material } = object;

      if (SIDES[this.#active_side_name]) {
         this.sideFadeOut(SIDES[this.#active_side_name].object.material);
      }

      this.sideFadeIn(material);
      this.borderFadeIn();

      this.#active_side_name = name;
   }

   pointerup(intersection) {
      const { name } = intersection.object, side = SIDES[name];

      if (!side) return;

      const { x, y } = side.angles;

      THREEViewer.system.orbital.rotateOrbital(x, y);
   }

   raycast(ev, raycaster) {
      const 
         { width } = canvas,
         { clientX, clientY, type } = ev;

      const 
         x = (clientX - width) / WS,
         y = -(clientY / WS);

      coords.x = (x * 2) + 1;
      coords.y = (y * 2) + 1;
 
      raycaster.setFromCamera(coords, this.#camera);

      const intersection = raycaster.intersectObject(this.#scene)[0];

      if (!intersection) {
         if (SIDES[this.#active_side_name]) {
            this.sideFadeOut(SIDES[this.#active_side_name].object.material);
            this.borderFadeOut();
            this.#active_side_name = null;
         }

         document.body.style.cursor = 'default';

         return false;
      }

      this[type](intersection);

      document.body.style.cursor = 'pointer';

      return true;
   }

   get scene() {
      return this.#scene;
   }
}


export default Gizmo;