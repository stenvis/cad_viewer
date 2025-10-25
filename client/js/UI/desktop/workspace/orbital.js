import ev from '/js/lib/helpers/browser/ev-listener.js';
import DOM from '/js/storage/dom.js';

const {
   canvas,
} = DOM;

let is_locked = true, was_move = false;
let camera, orbital, pool, zoom;


function move(ev) {
   if (is_locked) return;
   orbital.update(ev);
   was_move = true;
}

function pointerDown(ev) {
   if (ev.which == 3) {
      if (orbital.is_centroid) return;
      orbital.setMode('centroid');
      orbital.update(ev);
   }
   is_locked = false;
   orbital.pointerDown();
}

function pointerUp(ev) {
   if (ev.which == 3) {
      if (orbital.is_orbital) return;
      orbital.setMode('orbital');
      is_locked = true;
      return;
   }
   if (was_move) orbital.pointerUp();
   is_locked = true;
   was_move = false;
}

function changeZoom({ deltaY }) {
   zoom.change(deltaY);
}

function pointerLeave() {
   orbital.setMode('orbital');
   is_locked = true;
   was_move = false;
}

function register() {
   initVariables();
   addEvents();
}

function addEvents() {
   ev.on(canvas, 'pointerdown', pointerDown);
   ev.on(canvas, 'pointermove', move);
   ev.on(canvas, 'pointerup', pointerUp);
   ev.on(canvas, 'wheel', changeZoom);
   ev.on(canvas, 'pointerleave', pointerLeave);
}

function delEvents() {
   ev.off(canvas, 'pointerdown', pointerDown);
   ev.off(canvas, 'pointermove', move);
   ev.off(canvas, 'pointerup', pointerUp);
   ev.off(canvas, 'wheel', changeZoom);
   ev.off(canvas, 'pointerleave', pointerLeave);
}

function initVariables() {
   camera = THREEViewer.system.camera;
   orbital = THREEViewer.system.orbital;
   pool = THREEViewer.system.pool;
   zoom = THREEViewer.system.orbital.zoom;
}


const orbital_ui = {
   register,
};

export default orbital_ui;