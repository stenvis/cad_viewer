import ev from '/js/lib/helpers/browser/ev-listener.js';
import raycaster from '/js/lib/3D/raycaster/raycaster.js';

const {
   checkUnderCursor,
} = raycaster;

let was_move = false;


function poinerDown() {
   was_move = false;
}

function mouseMove(ev) {
   checkUnderCursor(ev);
   was_move = true;
}

function pointerUp(ev) {
   if (was_move) return;
   checkUnderCursor(ev);
}

function register() {
   ev.on(canvas, 'pointerdown', poinerDown);
   ev.on(canvas, 'mousemove', mouseMove);
   ev.on(canvas, 'pointerup', pointerUp);
}


const raycast_ui = {
   register,
}

export default raycast_ui;