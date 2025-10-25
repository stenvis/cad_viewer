import ev from '/js/lib/helpers/browser/ev-listener.js';

let touch_time = 0;

function _blockDoubleTouch(ev) {
   const timestamp = performance.now();
   const time = timestamp - touch_time;

   if (time < 500) {
      ev.preventDefault();
      ev.stopPropagation();
      touch_time = 0;
      return;
   }

   touch_time = timestamp;
}

function block(ev) {
   ev.preventDefault();
   ev.stopPropagation();
}

function blockDoubleTouch() {
   ev.on(window, 'touchend', _blockDoubleTouch, { passive: false });
}

function blockGesture() {
   ev.on(document, 'gesturestart', block, { passive: false });
   ev.on(document, 'gesturechange', block, { passive: false });
   ev.on(document, 'gestureend', block, { passive: false });
}

function blockTouches() {
   ev.on(window, 'touchstart', block, { passive: false });
   ev.on(window, 'touchmove', block, { passive: false });
   ev.on(window, 'touchend', block, { passive: false });
}

function unblockTouches() {
   ev.off(window, 'touchstart', block, { passive: false });
   ev.off(window, 'touchmove', block, { passive: false });
   ev.off(window, 'touchend', block, { passive: false });
}


const block_ui = {
   blockDoubleTouch,
   blockTouches,
   unblockTouches,
   blockGesture,
};

export default block_ui;