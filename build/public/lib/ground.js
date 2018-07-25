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

var Animation = _interopRequireWildcard(_animation);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HEIGHT = Config.GAME.HEIGHT;
var WIDTH = Config.GAME.WIDTH;

var Ground = function () {
  function Ground() {
    _classCallCheck(this, Ground);

    /*var vertexShader = [
      'varying vec3 vWorldPosition;',
      'void main()',
      '{',
      '  vec4 worldPosition = modelMatrix * vec4(position, 1.0);',
      '  worldPosition = worldPosition.xyz;',
      '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
      '}'
    ].join('\n');
    var fragmentShader = [
      'uniform vec3 topColor;',
      'uniform vec3 bottomColor;',
      'uniform float offset;',
      'uniform float exponent;',
        'varying vec3 vWorldPosition;',
      'void main()',
      '{',
      '  float h = normalize(vWorldPosition + offset).y;',
      '  gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);',
      '}'
    ].join('\n')
    var uniforms = {
    topColor: { type: "c", value: new THREE.Color(0x0077ff) },
    bottomColor: { type: "c", value: new THREE.Color(0xffffff) },
    offset: { type: "f", value: 400 },
    exponent: {type: "f", value: 0.6 }
    }*/
    this.obj = new THREE.Object3D();
    this.obj.name = 'ground';
    var geometry = new THREE.PlaneGeometry(WIDTH / HEIGHT * Config.FRUSTUMSIZE, Config.FRUSTUMSIZE);
    this.materials = [];
    var colors = [['rgba(215, 219, 230, 1)', 'rgba(188, 190, 199, 1)'], ['rgba(255, 231, 220, 1)', 'rgba(255, 196, 204, 1)'], ['rgba(255, 224, 163, 1)', 'rgba(255, 202, 126, 1)'], ['rgba(255, 248, 185, 1)', 'rgba(255, 245, 139, 1)'], ['rgba(218, 244, 255, 1)', 'rgba(207, 233, 210, 1)'], ['rgba(219, 235, 255, 1)', 'rgba(185, 213, 235, 1)'], ['rgba(216, 218, 255, 1)', 'rgba(165, 176, 232, 1)'], ['rgba(207, 207, 207, 1)', 'rgba(199, 196, 201, 1)']];
    var that = this;
    for (var i = 0; i < 7; ++i) {
      var texture = new THREE.Texture(that.generateLaserBodyCanvas(colors[i][0], colors[i][1]));
      texture.needsUpdate = true;
      var material = new THREE.MeshBasicMaterial({
        map: texture,
        opacity: 1,
        transparent: true
      });
      that.materials.push(material);
      var ground = new THREE.Mesh(geometry, material);
      ground.position.z = -(i + 1) * 0.1;
      ground.name = i;
      ground.updateMatrix();
      ground.matrixAutoUpdate = false;
      that.obj.add(ground);
      //if ( i >= 1) ground.visible = false;
    }
    for (var i = 1; i < 7; ++i) {
      this.obj.children[i].visible = false;
    }
    this.current = 0;
    //this.obj.receiveShadow = true;
    //this.obj.rotation.x = -Math.PI / 2 ;
    //this.obj.rotation.z = -Math.PI / 3 ;
    //this.obj.matrixAutoUpdate = false;
  }

  _createClass(Ground, [{
    key: "generateLaserBodyCanvas",
    value: function generateLaserBodyCanvas(colorStart, colorStop) {
      // init canvas
      // set gradient
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = 64;
      canvas.height = 64;
      context.clearRect(0, 0, canvas.width, canvas.height);
      var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
      //gradient.addColorStop( 0.3, 'rgba(40, 40, 40, 1)' );
      //gradient.addColorStop( 0.5, 'rgba(255, 255, 255, 1)' );
      //gradient.addColorStop( 0.7, 'rgba(40, 40, 40, 1)' );
      gradient.addColorStop(0, colorStart);
      gradient.addColorStop(1, colorStop);
      // fill the rectangle
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      // return the just built canvas

      return canvas;
    }
  }, {
    key: "changeColor",
    value: function changeColor() {
      var _this = this;

      var next = this.current + 1 > 6 ? 0 : this.current + 1;
      var current = this.current;
      Animation.customAnimation.to(this.materials[this.current], 5, { opacity: 0, onComplete: function onComplete() {
          _this.obj.children[current].visible = false;
        } });
      this.obj.children[next].visible = true;
      Animation.customAnimation.to(this.materials[next], 4, { opacity: 1 });
      this.current = next;
    }
  }]);

  return Ground;
}();

exports.default = Ground;