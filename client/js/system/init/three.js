import * as THREE from '/dependencies/three/three.module.js';

window.THREE = THREE;

class THREEViewer {
   add(args) {
      for (const key in args) {
         this[key] = args[key];
      }
   }
}

window.THREEViewer = new THREEViewer();

export default {};