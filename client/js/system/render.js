import Resize from '/js/system/resize.js';
import system from '/js/system/system.js';

let _render_requested;

const { scene, renderer, camera, canvas, pool } = system;

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

function tick() {
   _render_requested = false;
   renderer.render(scene, camera);
}

function tick_1() {
   renderer.render(scene, camera);
   pool.pass();
   _render_requested = null;
}

function animate() {
   _render_requested = requestAnimationFrame(tick_1, canvas);
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