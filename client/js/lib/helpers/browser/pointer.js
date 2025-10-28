const coords = new THREE.Vector2();


function scaleByDPR(input) {
   return ~~(input * window.devicePixelRatio || 1);
}

function getPos(ev) {
   const x = ev.clientX, y = ev.clientY;
   return [scaleByDPR(x), scaleByDPR(y)];
}

function getRaycastPos(ev, width, height) {
   const pageX = ev.type === 'touchend' ? ev.changedTouches[0].clientX: ev.pageX;
   const pageY = ev.type === 'touchend' ? ev.changedTouches[0].clientY : ev.pageY;

   coords.x = scaleByDPR(pageX) / width * 2 - 1;
   coords.y = -scaleByDPR(pageY) / height * 2 + 1;

   return coords;
}


const pointer = {
   getPos,
   getRaycastPos,
};

export default pointer;