"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require("three");

var THREE = _interopRequireWildcard(_three);

var _jimp = require("jimp");

var _jimp2 = _interopRequireDefault(_jimp);

var _animation = require("./animation.js");

var Animation = _interopRequireWildcard(_animation);

var _random = require("./random.js");

var Random = _interopRequireWildcard(_random);

var _config = require("./config.js");

var Config = _interopRequireWildcard(_config);

var _game = require("./game.js");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Animation.setSkipAnim(true);

var WIDTH = Config.GAME.WIDTH;
var HEIGHT = Config.GAME.HEIGHT;

var Simulator = function () {
  function Simulator(game) {
    _classCallCheck(this, Simulator);

    this.game = game;
    this.gl = game.renderer.getContext();
  }

  _createClass(Simulator, [{
    key: "init",
    value: function init() {
      var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();

      this.game.stage = 'game';
      this.replay(seed);
    }
  }, {
    key: "replay",
    value: function replay() {
      var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();

      this.game.replayGame(seed);
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      this.game.update(300);
    }
  }, {
    key: "jump",
    value: function jump(ms) {
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
  }, {
    key: "_screenshot",
    value: function _screenshot(cb) {
      var gl = this.gl;
      var fillBuffer = function fillBuffer(error, image) {
        // no canvas involved, directly read from renderer buffer
        gl.readPixels(0, 0, WIDTH, HEIGHT, gl.RGBA, gl.UNSIGNED_BYTE, image.bitmap.data);
        // three's frame buffer is upside down
        image.flip(false, true);
        var tmp = Date.now();
        console.log("img generated: ", tmp, tmp - benchMarkTimer), benchMarkTimer = tmp;
        // generate base64
        image.getBase64(_jimp2.default.MIME_PNG, function (error, str) {
          var tmp = Date.now();
          console.log("base64 done: ", tmp, tmp - benchMarkTimer), benchMarkTimer = tmp;
          // exit here
          cb(str);
        });
      };
      // pre-allocated container
      if (typeof this._screenshot.img === "undefined") this._screenshot.img = new _jimp2.default(WIDTH, HEIGHT, fillBuffer);else {
        fillBuffer(null, this._screenshot.img);
      }
    }
  }, {
    key: "screenshot",
    value: function screenshot(cb) {
      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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
      } else cb(esta.screenshot.ret);
    }
  }, {
    key: "getState",
    value: function getState(cb) {
      var includeImg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // calls cb when image update is complete
      var state = {
        onComplete: cb
      };
      state["terminal"] = this.game.bottle.status === "fall";
      state["score"] = this.game.currentScore;
      if (includeImg) {
        this.screenshot(function (str) {
          state["img"] = str;
          cb && cb(state);
        });
      } else cb && cb(state);
      return state;
    }
  }]);

  return Simulator;
}();

exports.default = Simulator;