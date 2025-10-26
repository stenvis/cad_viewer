import Resize from '/js/system/resize.js';
import system from '/js/system/system.js';

let _render_requested;

const { scene, renderer, camera, canvas, pool, gizmo } = system;

const resize = new Resize(system, canvas);

function checkResize() { 
   resize.check();
   update();
}

function update() {
   if (_render_requested) return;
   _render_requested = true;
   requestAnimationFrame(tick, canvas);
}

function renderTick() {
   renderer.setViewport(0, 0, resize.width, resize.height);
   renderer.setScissorTest(false);
   renderer.render(scene, camera);
   gizmo.render();
}

function tick() {
   _render_requested = false;
   renderTick();
}

function animation_tick() {
   renderTick();
   pool.pass();
   _render_requested = null;
}

function animate() {
   _render_requested = requestAnimationFrame(animation_tick, canvas);
}

function cancel() {
   cancelAnimationFrame(_render_requested);
}

function start() {
   tick();
   window.addEventListener('resize', checkResize);
   checkResize();
}

const render = {
   start,
   update,
   animate,
   cancel,
};

window.render = render;
export default render;