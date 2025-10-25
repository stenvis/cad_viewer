import Mode3D from '/js/core/view-modes/3D/mode.js';

const VIEW_MODES = {
   '3D': new Mode3D(),
   // '2D': Mode2D,
}

class Workspace {
   #active_view_mode;

   setViewMode(mode = '3D') {
      this.#active_view_mode = VIEW_MODES[mode];
      this.update();
   }

   update() {
      this.#active_view_mode.update();
   }
}

export default Workspace;