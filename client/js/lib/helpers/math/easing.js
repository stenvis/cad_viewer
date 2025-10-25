const { pow, sin, cos, PI } = Math;

function easeOutQuint(x) {
   return 1 - pow(1 - x, 5);
}

function easeOutSine(x) {
   return sin((x * PI) / 2);
}

function easeInExpo(x) {
   return x === 0 ? 0 : pow(2, 10 * x - 10);
}

function easeOutQuad(x) {
   return 1 - (1 - x) * (1 - x);
}

function lerp(pS, pE, diff) {
   return (1 - diff) * pS + diff * pE;
}

function easeInSine(x) {
  return 1 - Math.cos((x * Math.PI) / 2);
}

function easeInOutSine(x) {
   return -(cos(PI * x) - 1) / 2;
}

function easeInOutCubic(x) {
   return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
}

function easeInOutQuart(x) {
   return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
}

function easeInOutQuad(x) {
   return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
}

function easeInOutQuint(x) {
   return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
}

function easeInOutBack(x) {
   const c1 = 1.70158, c2 = c1 * 1.525;
   return x < 0.5
      ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

const easing = {
   lerp,

   easeInOutSine,

   easeInOutCubic,
   easeInOutQuart,
   easeInOutQuad,
   easeInOutQuint,
   easeInOutBack,

   easeOutSine,
   easeInExpo,
   easeInSine,
   easeOutQuad,
   easeOutQuint,
};

export default easing;