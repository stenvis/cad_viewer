import ev from '/js/lib/helpers/browser/ev-listener.js';
import DOM from '/js/storage/dom.js';

const {
   canvas,
} = DOM;

const {
   abs,
} = Math;

let is_locked = true, was_zoom = false, is_pinch = false;
let around_view_force = 0;
let last_touch_x = 0, last_touch_y = 0;
let force_touch_x = 0, force_touch_y = 0;
let src_dist = 0, dst_dist = 0;
let orbital, zoom;

const 
   ZOOM_SPEED = 4,
   PINCH_THRESHOLD = 8;


function getForce() {
   return around_view_force;
}

function touchEnd(ev) {
   if (is_pinch || was_zoom) {
      if (ev.touches.length === 0) {
         is_pinch = false;
         was_zoom = false;
      }
      return;
   }

   src_dist = 0;
   dst_dist = 0;
   is_locked = true;
}

function addTouchForce(ev) {
    const { clientX, clientY } = ev.touches[0];

    const
      dx = clientX - force_touch_x,
      dy = clientY - force_touch_y;

    around_view_force += abs(dx) + abs(dy);

    force_touch_x = dx;
    force_touch_y = dy;
}

function getTouchDistance(t0, t1) {
   const dx = t0.clientX - t1.clientX;
   const dy = t0.clientY - t1.clientY;
   return Math.sqrt(dx*dx + dy*dy);
}

function touchStart(ev) {
   ev.preventDefault();

   const { is_around, is_active_reset } = orbital;

   if (is_active_reset) return;

   if (ev.touches.length === 2) {
      if (is_around) return;
      src_dist = getTouchDistance(ev.touches[0], ev.touches[1]);
      dst_dist = src_dist;
      is_pinch = true;
      return;
   }

   is_locked = false;

   orbital.pointerDown();

   const { clientX, clientY } = ev.touches[0];

   last_touch_x = clientX;
   last_touch_y = clientY;

   around_view_force = 0;
}

function moveByTouch(ev) {
   ev.preventDefault();

   const { is_around, is_active_reset } = orbital;

   if (is_active_reset) return;

   if (ev.touches.length === 2) {
      if (is_around) return;
      dst_dist = getTouchDistance(ev.touches[0], ev.touches[1]);
      const delta = dst_dist - src_dist;
      if (Math.abs(delta) < PINCH_THRESHOLD) return;
      zoom.change(-delta * ZOOM_SPEED);
      src_dist = dst_dist;
      was_zoom = true;
      return;
   }

   if (is_locked || is_pinch) return;

   addTouchForce(ev);

   const { clientX, clientY } = ev.touches[0];
   const
      dirX = ~~(clientX - last_touch_x),
      dirY = ~~(clientY - last_touch_y);

   last_touch_x = clientX;
   last_touch_y = clientY;

   const dpr = window.devicePixelRatio;
   orbital.touch(dirX * dpr, dirY * dpr);
}

function register() {
   init();

   ev.on(canvas, 'touchmove', moveByTouch, { passive: false });
   ev.on(canvas, 'touchstart', touchStart, { passive: false });
   ev.on(canvas, 'touchend', touchEnd, { passive: false });
}

function unregister() {
   ev.off(canvas, 'touchmove', moveByTouch, { passive: false });
   ev.off(canvas, 'touchstart', touchStart, { passive: false });
   ev.off(canvas, 'touchend', touchEnd, { passive: false });

   is_locked = true;
   around_view_force = 0;
}

function init() {
   const { system } = THREEViewer;
   orbital = system.orbital;
   zoom = orbital.zoom;
   console.log(orbital, zoom);
}


const orbital_ui = {
   register,
   unregister,
   getForce,
};

export default orbital_ui;