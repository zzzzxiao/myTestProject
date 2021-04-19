export const requestAnimationFrame = 
  // window.requestAnimationFrame ||
  // window.webkitRequestAnimationFrame ||
  // window.mozRequestAnimationFrame ||
  // window.msRequestAnimationFrame ||
  // window.oRequestAnimationFrame ||
  function(func) {
      return window.setTimeout(func, 300); // 1000 / 60
  };

export const cancelAnimationFrame = 
  // window.cancelAnimationFrame ||
  // window.webkitCancelAnimationFrame ||
  // window.mozCancelAnimationFrame ||
  // window.msCancelAnimationFrame ||
  // window.oCancelAnimationFrame ||
  window.clearTimeout;

export const range = n =>
  new Array(n).fill(0).map((e, idx) => idx);

export const canvasStyle = config =>
  `display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:${config.zIndex};opacity:${config.opacity}`;

export const randomNum = (min, max) => {
    let Range = max - min;
    let Rand = Math.random();
    let num = min + Math.floor(Rand * Range); // 舍去
    return num;
};
