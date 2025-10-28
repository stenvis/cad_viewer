import { canvas_bg_color } from "/configs/configs.js";
import { pmrem_generator } from '/js/lib/loaders/rgbe.js';
import SYSTEM_PRESETS from "/js/system/presets.js";
import OrbitalCamera from "/js/lib/3D/camera/camera.js";
import AnimationPool from "/js/lib/3D/pool/pool.js";
import Workspace from "/js/core/workspace/workspace.js";
import Gizmo from "/js/lib/3D/gizmo/gizmo.js";

const {
   CTX_PRESETS,
} = SYSTEM_PRESETS;

const canvas = document.getElementById('canvas');

const
   scene = new THREE.Scene(),
   renderer = new THREE.WebGLRenderer({
      canvas,
      ...CTX_PRESETS,
   });

renderer.toneMapping = THREE.NeutralToneMapping;

renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.VSMShadowMap;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

pmrem_generator(renderer);

scene.background = new THREE.Color(canvas_bg_color);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
const orbital = new OrbitalCamera(camera);
const workspace = new Workspace();
const pool = new AnimationPool();
const gizmo = new Gizmo(renderer, camera);

// const ambientLight = new THREE.AmbientLight(0xffffff, 1.);
// scene.add(ambientLight);

// const hemiLight = new THREE.HemisphereLight(0xffffff, 0xededed, .4);
// hemiLight.position.set(0, 20, 0);
// scene.add(hemiLight);

const system = {
   canvas,
   scene,
   renderer,
   camera,
   orbital,
   workspace,
   pool,
   gizmo,
};

window.THREEViewer.add({
   system,
});

export default system;