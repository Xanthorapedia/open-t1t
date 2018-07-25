import * as THREE from "three";
import Jimp from "jimp"
import * as Animation from "./animation.js"
import * as Random from "./random.js"
import * as Config from "./config.js"
import Game from "./game.js"

Animation.setSkipAnim(true);

const WIDTH = Config.GAME.WIDTH;
const HEIGHT = Config.GAME.HEIGHT;

class Simulator {
  constructor(game) {
    this.game = game;
    this.gl = game.renderer.getContext();
  }

  init(seed=Date.now()) {
    this.game.stage = 'game';
    this.replay(seed)
  }

  replay(seed=Date.now()) {
    this.game.replayGame(seed);
    this.update();
  }

  update() {
    this.game.update(300);
  }

  jump(ms) {
    var that = this.game;
    that.currentBlock.rebound();
    var duration = ms / 1000;
    // that.duration.push(duration);

    that.bottle.velocity.vz = Math.min(duration * Config.BOTTLE.velocityZIncrement, 150);
    that.bottle.velocity.vz = +that.bottle.velocity.vz.toFixed(2);
    that.bottle.velocity.vy = Math.min(Config.BOTTLE.velocityY + duration * Config.BOTTLE.velocityYIncrement, 180);
    that.bottle.velocity.vy = +that.bottle.velocity.vy.toFixed(2);
    that.direction = new THREE.Vector2(that.nextBlock.obj.position.x - that.bottle.obj.position.x, that.nextBlock.obj.position.z - that.bottle.obj.position.z);
    that.direction.x = +that.direction.x.toFixed(2);
    that.direction.y = +that.direction.y.toFixed(2);
    var direction = new THREE.Vector3(that.direction.x, 0, that.direction.y);
    that.bottle.jump(direction.normalize());
    ////////////////////////////// added to take care of delayed head rotation
    Animation.customAnimation.to(that.bottle.human.rotation, 0.14, { z: that.bottle.human.rotation.z - Math.PI });
    //////////////////////////////
    that.hideCombo();
    that.hit = that.checkHit2(that.bottle, that.currentBlock, that.nextBlock);
    if (that.currentBlock.order == 15) {
      that.currentBlock.hideGlow();
    }

    that.distance = Config.BLOCK.minDistance + Random.random() * (Config.BLOCK.maxDistance - Config.BLOCK.minDistance);
    that.distance = +that.distance.toFixed(2);
    that.straight = Random.random() > 0.5 ? 1 : 0;

    if (that.hit === 1 || that.hit === 7) {
      var block = that.generateNextBlock();
      that.thirdBlock = block;
    }

    this.update();
  }

  _screenshot(cb) {
    var gl = this.gl;
    var fillBuffer = function (error, image) {
      // no canvas involved, directly read from renderer buffer
      gl.readPixels(0, 0, WIDTH, HEIGHT,
        gl.RGBA, gl.UNSIGNED_BYTE, image.bitmap.data);
      // three's frame buffer is upside down
      image.flip(false, true);
      var tmp = Date.now();
      console.log("img generated: ", tmp, tmp - benchMarkTimer), benchMarkTimer = tmp;
      // generate base64
      image.getBase64(Jimp.MIME_PNG, function (error, str) {
        var tmp = Date.now();
        console.log("base64 done: ", tmp, tmp - benchMarkTimer), benchMarkTimer = tmp;
        // exit here
        cb(str);
      });
    };
    // pre-allocated container
    if (typeof this._screenshot.img === "undefined")
      this._screenshot.img = new Jimp(WIDTH, HEIGHT, fillBuffer);
    else {
      fillBuffer(null, this._screenshot.img);
    }
  }

  screenshot(cb, update=true) {
    // to ensure everything (light, texture, ...) is right
    this.update();
    var esta = this;
    if (update || typeof this.screenshot.ret === "undefined") {
      // ensures screen is captured before written to return buffer
      new Promise(function (resolve, reject) {
        esta._screenshot(resolve);
      }).then(function (str) {
        esta.screenshot.ret = str;
        cb(esta.screenshot.ret);
      }).catch(function (wtf) {
        console.log(wtf);
      });
    }
    else
      cb(esta.screenshot.ret);
  }

  getState(cb, includeImg=true) {
    // calls cb when image update is complete
    var state = {
      onComplete: cb
    };
    state["terminal"] = this.game.bottle.status === "fall";
    state["score"] = this.game.currentScore;
    if (includeImg) {
      this.screenshot(function(str) {
        state["img"] = str;
        cb && cb(state);
      });
    }
    else
      cb && cb(state);
    return state;
  }
}

export default Simulator;
