import Game from "../lib/main";

var game = new Game();

// change ground color and re-register every 6 secs
! function changeGroundColor() {
  game.ground.changeColor()
  setTimeout(function() {
    changeGroundColor();
  }, 6*1e3);
}();

function update () {
  // Draw!
  renderer.render(game.scene, game.camera);
  // Schedule the next frame.
  requestAnimationFrame(update);
}
// Schedule the first frame.
requestAnimationFrame(update);
