"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require("three");

var THREE = _interopRequireWildcard(_three);

var _config = require("./config.js");

var Config = _interopRequireWildcard(_config);

var _animation = require("./animation.js");

var _animation2 = _interopRequireDefault(_animation);

var _text = require("./text.js");

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HEIGHT = Config.GAME.HEIGHT;
var WIDTH = Config.GAME.WIDTH;
var ASPECT = WIDTH / HEIGHT;

var UI = function () {
  function UI(scene, camera, full2D, game) {
    _classCallCheck(this, UI);

    var that = this;
    this.game = game;
    // this.full2D = full2D;
    this.scene = scene;
    this.camera = camera;
    this.score = 0;
    this.double = 1;

    // var observeGeometry = new THREE.PlaneGeometry(FRUSTUMSIZE * ASPECT * 0.034, FRUSTUMSIZE * ASPECT * 0.034 / 42 * 48);
    // var observeMaterial = new THREE.MeshBasicMaterial({
    //   map: loader.load('res/observShare.png'),
    //   transparent: true,
    // });

    // var observeBg = new THREE.Mesh(new THREE.PlaneGeometry(9.5, 9.5), new THREE.MeshBasicMaterial({
    //   map: loader.load('res/share2x.png'),
    //   transparent: true,
    // }))
    // observeBg.position.set(-1.1, -1.8, 0)

    // this.observe = new THREE.Mesh(observeGeometry, observeMaterial);
    // var res = wx.getSystemInfoSync()
    // var sys = (res.system).toLowerCase()
    // if (res.screenHeight >= 812 && sys.indexOf('ios') > -1) {
    //   this.observe.position.set(-FRUSTUMSIZE * ASPECT * 0.38, - FRUSTUMSIZE * 0.464, -1)
    // } else {
    //   this.observe.position.set(-FRUSTUMSIZE * ASPECT * 0.435, - FRUSTUMSIZE * 0.464, -1)
    // }
    // // this.observe.position.set(-FRUSTUMSIZE / 2 * ASPECT, -FRUSTUMSIZE / 2, -1)
    // this.observe.updateMatrix();
    // this.observe.matrixAutoUpdate = false;
    // this.observe.visible = false

    // this.observe.add(observeBg)
    // this.camera.add(this.observe);

    //this.createSky();
    this.scoreText = new _text2.default('0', { fillStyle: 0x252525, sumScore: true, opacity: 0.8 });
    this.scoreText.obj.position.set(0, 21, -10);
    //this.scoreText.obj.scale.set(1.4, 1.4, 1.4);
    this.scoreText.obj.updateMatrix();
    this.scoreText.obj.matrixAutoUpdate = false;
    this.camera.add(this.scoreText.obj);
    this.quickText = new _text2.default('好快！', { fillStyle: 0x252525, chinese: true });
    this.quickText.obj.position.set(-13, 18, -10);
    this.quickText.obj.updateMatrix();
    this.quickText.obj.matrixAutoUpdate = false;
    this.quickText.obj.visible = false;
    this.perfectText = new _text2.default('很好！', { fillStyle: 0x252525, chinese: true });
    this.perfectText.obj.position.set(-13, 16, -10);
    this.perfectText.obj.updateMatrix();
    this.perfectText.obj.matrixAutoUpdate = false;
    this.perfectText.obj.visible = false;
    this.camera.add(this.quickText.obj);
    this.camera.add(this.perfectText.obj);
  }

  _createClass(UI, [{
    key: "reset",
    value: function reset() {
      this.scoreText.setScore(0);
      //var bonus = this.gameOverPage.getObjectByName('bonus');
      //if (bonus) this.gameOverPage.remove(bonus);
      //this.camera.remove(this.gameOverPage);
      //this.bgAudio.currentTime = 0;
      //this.bgAudio.play();
      this.score = 0;
      this.double = 1;
      this.perfectText.obj.visible = false;
      this.quickText.obj.visible = false;
    }
  }, {
    key: "update",
    value: function update() {
      //if (!this.bgAudio.paused) this.music.rotation.z -= 0.02;

    }
  }, {
    key: "hideScore",
    value: function hideScore() {
      this.scoreText.obj.visible = false;
    }
  }, {
    key: "showScore",
    value: function showScore() {
      this.scoreText.obj.visible = true;
    }
  }, {
    key: "addScore",
    value: function addScore(score, double, quick, keepDouble) {
      if (keepDouble) {
        this.score += score;
        this.setScore(this.score);
        return;
      }
      if (double) {
        if (this.double === 1) this.double = 2;else this.double += 2;
      } else {
        this.double = 1;
      }
      if (quick && this.double <= 2) {
        this.double *= 2;
      }
      this.double = Math.min(32, this.double);
      score = score * this.double;
      this.score += score;
      this.setScore(this.score);
      // var showToast = Math.random() < 0.4;
      // if (double && showToast && (this.game.mode != 'observe')) {
      //   //this.perfectText.obj.scale.set(0, 0, 0)
      //   //TweenMax.to(this.perfectText.obj.scale, 0.4, { x: 0.8, y: 0.8, z: 0.8  });
      //   var text = ['太棒了！', '很好！', '稳住！'];
      //   //this.perfectText.setText(text[Math.floor(Math.random() * 3)]);
      //   this.perfectText.obj.visible = true;
      //   customAnimation.to(this.perfectText.material, 0.4, { opacity: 1 });
      //   customAnimation.to(this.perfectText.material, 0.4, { opacity: 0, delay: 0.6, onComplete: () => {
      //     this.perfectText.obj.visible = false;
      //   }});
      //   if (double && !quick) {
      //     this.perfectText.obj.position.y = 18;
      //   } else {
      //     this.perfectText.obj.position.y = 16;
      //   }
      //   this.perfectText.obj.updateMatrix();
      // }
      // if (quick && showToast && (this.game.mode != 'observe')) {
      //   //this.quickText.obj.scale.set(0, 0, 0)
      //   //TweenMax.to(this.quickText.obj.scale, 0.4, { x: 0.8, y: 0.8, z: 0.8 });
      //   var text = ['好快！', '给力！'];
      //   //this.quickText.setText(text[Math.floor(Math.random() * 2)]);
      //   this.quickText.obj.visible = true;
      //   customAnimation.to(this.quickText.material, 0.4, { opacity: 1 });
      //   customAnimation.to(this.quickText.material, 0.4, { opacity: 0, delay: 0.6, onComplete: () => {
      //     this.quickText.obj.visible = false;
      //   }});
      // }
    }
  }, {
    key: "setScore",
    value: function setScore(score) {
      //console.log("setScore");
      this.scoreText.setScore(score);
      Config.BLOCK.minRadiusScale -= 0.005;
      //console.log("BBB", BLOCK.minRadiusScale, BLOCK.maxRadiusScale)
      Config.BLOCK.minRadiusScale = Math.max(0.25, Config.BLOCK.minRadiusScale);
      Config.BLOCK.maxRadiusScale -= 0.005;
      Config.BLOCK.maxRadiusScale = Math.max(Config.BLOCK.maxRadiusScale, 0.6);
      Config.BLOCK.maxDistance += 0.03;
      Config.BLOCK.maxDistance = Math.min(22, Config.BLOCK.maxDistance);

      // BLOCK.minRadiusScale = +BLOCK.minRadiusScale.toFixed(2);
      // BLOCK.maxRadiusScale = +BLOCK.maxRadiusScale.toFixed(2);
      // BLOCK.maxDistance = +BLOCK.maxDistance.toFixed(2);
    }
  }]);

  return UI;
}();

exports.default = UI;