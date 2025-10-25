function defineStatus() {
   const { userAgent, platform, maxTouchPoints } = navigator;

   const is_mobile = /Mobi|Android|iPhone/i.test(userAgent);
   const is_tablet =
      /Tablet|iPad/i.test(userAgent) ||
      (platform === "MacIntel" && maxTouchPoints > 1);

   const type = is_mobile ? "mobile" : is_tablet ? "mobile" : "desktop";

   const is_landscape = () => window.innerWidth > window.innerHeight;

   return {
      is_mobile,
      is_tablet,
      is_simplify: is_mobile || is_tablet,
      type,
      is_landscape,
   }
}


const device = {
   defineStatus,
}

export default device;