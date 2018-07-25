import Game from "./game.js";
// import Simulator from "./sim.js";

const controller = new Game(null);
var lastFrameTime = Date.now();

// var Stats = function () {

//   var beginTime = Date.now(), prevTime = beginTime, frames = 0, count = 0, flag = true;

//   return {

//     begin: function () {

//       beginTime = Date.now();

//     },

//     stop: function () {
//       flag = false;
//       if (count > 3) controller.removeShadow();
//     },

//     end: function () {
//       //if (!flag) return;
//       frames++;

//       var time = Date.now();

//       //console.log("prevy", prevTime, time);
//       if (time >= prevTime + 1000) {
//         console.log("frames", frames * 1000 / (time - prevTime));

//         prevTime = time;
//         frames = 0;

//       }

//       return time;

//     }

//   };

// };

// var stats = new Stats();

// const oRequestAnimation = requestAnimationFrame;
// const frameCallbacks = [];
// var lastestFrameCallback = void 0;
//
// const requestAnimationFrameHandler = function requestAnimationFrameHandler() {
//   var _frameCallbacks = [];
//   var _lastestFrameCallback = lastestFrameCallback;
//
//   frameCallbacks.forEach(function (cb) {
//     _frameCallbacks.push(cb);
//   });
//   lastestFrameCallback = undefined;
//   frameCallbacks.length = 0;
//
//   _frameCallbacks.forEach(function (cb) {
//     typeof cb === 'function' && cb();
//   });
//   if (typeof _lastestFrameCallback === 'function') {
//     _lastestFrameCallback();
//   }
//
//   oRequestAnimation(requestAnimationFrameHandler);
// };
//
// window.requestAnimationFrame = function (callback, isLastest) {
//   if (!isLastest) {
//     frameCallbacks.push(callback);
//   } else {
//     lastestFrameCallback = callback;
//   }
// };

// requestAnimationFrameHandler();

// controller.guider = true;
// controller.stage = 'startPage';
// controller.show = true;
controller.stage = 'game';
controller.replayGame(Date.now());

function animate() {
  //stats.begin();
  var now = Date.now();
  var tickTime = now - lastFrameTime;
  lastFrameTime = now;
  // requestAnimationFrame(animate, true);
  requestAnimationFrame(animate);
  if (tickTime > 100) return;
  controller.update(tickTime / 1000);
  //stats.end();
}

animate();
// controller.update(300)
// setTimeout(function() {controller.update(300);}, 4000);
