import pointer from '/js/lib/helpers/browser/pointer.js';

const _raycaster = new THREE.Raycaster();

let _camera, _gizmo;


function setFromCamera(ev) {
   const { width, height } = canvas, coords = pointer.getRaycastPos(ev, width, height);
   _raycaster.setFromCamera(coords, _camera);
}

function checkUnderCursor(ev) {
   // setFromCamera(ev);

   _gizmo.raycast(ev, _raycaster);
}

function init() {
   const { camera, gizmo } = THREEViewer.system;
   _camera = camera;
   _gizmo = gizmo;
}


const raycaster = {
   init,
   setFromCamera,
   checkUnderCursor,
};

export default raycaster;
