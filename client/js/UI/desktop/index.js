import system_ui from "./global/system.js";
import raycast_ui from "./global/raycast.js";
import orbital_ui from "./workspace/orbital.js";
import upload_glb_ui from "./workspace/upload-glb.js";
import reset_view_ui from "./workspace/reset-view.js";

function register() {
   system_ui.register();
   raycast_ui.register();
   orbital_ui.register();
   upload_glb_ui.register();
   reset_view_ui.register();
}

export default register;