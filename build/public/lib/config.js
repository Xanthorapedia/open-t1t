'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numberMaterial = exports.grayMaterial = exports.shadow = exports.desk_shadow = exports.cylinder_shadow = exports.loader = exports.FRUSTUMSIZE = exports.BLOCK = exports.AUDIO = exports.CAMERA = exports.WAVE = exports.GAME = exports.PARTICLE = exports.BOTTLE = exports.COLORS = undefined;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var COLORS = {
  red: 0xCC463D,
  pureRed: 0xff0000,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf39ab7,
  brownDark: 0x23190f,
  blue: 0x009FF7,
  yellow: 0xFFBE00,
  pureWhite: 0xffffff,
  orange: 0xf7aa6c,
  orangeDark: 0xFF8C00,
  black: 0x000000,
  cream: 0xF5F5F5,
  green: 0x2C9F67,
  lightBlue: 0xD1EEEE,
  cyan: 0x93e4ce,
  yellowBrown: 0xffcf8b,
  purple: 0x8a9ad6

};

var BOTTLE = {
  // bodyWidth: 2.8,
  // bodyDepth: 2.8,
  headRadius: 0.945,
  bodyWidth: 2.34,
  bodyDepth: 2.34,

  bodyHeight: 3.2,

  reduction: 0.005,
  minScale: 0.5,
  velocityYIncrement: 15,
  velocityY: 135,
  velocityZIncrement: 70
};

var PARTICLE = {
  radius: 0.3,
  detail: 2
};

var GAME = {
  BOTTOMBOUND: -55,
  TOPBOUND: 41,
  gravity: 720,
  //gravity: 750,
  touchmoveTolerance: 20,
  LEFTBOUND: -140,
  topTrackZ: -30,
  rightBound: 90,
  HEIGHT: window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth,
  WIDTH: window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth,
  canShadow: true
};

var WAVE = {
  innerRadius: 2.2,
  outerRadius: 3,
  thetaSeg: 25
};

var CAMERA = {
  fov: 60
};

var AUDIO = {
  success: 'res/success.mp3',
  perfect: 'res/perfect.mp3',
  scale_loop: 'res/scale_loop.mp3',
  scale_intro: 'res/scale_intro.mp3',
  restart: 'res/start.mp3',
  fall: 'res/fall.mp3',
  fall_2: 'res/fall_2.mp3',
  combo1: 'res/combo1.mp3',
  combo2: 'res/combo2.mp3',
  combo3: 'res/combo3.mp3',
  combo4: 'res/combo4.mp3',
  combo5: 'res/combo5.mp3',
  combo6: 'res/combo6.mp3',
  combo7: 'res/combo7.mp3',
  combo8: 'res/combo8.mp3',
  icon: 'res/icon.mp3',
  pop: 'res/pop.mp3',
  sing: 'res/sing.mp3',
  store: 'res/store.mp3',
  water: 'res/water.mp3'
};

var BLOCK = {
  radius: 5,
  width: 10,
  minRadiusScale: 0.8,
  maxRadiusScale: 1,
  height: 5.5,
  radiusSegments: [4, 50],
  floatHeight: 0,
  minDistance: 1,
  maxDistance: 17,
  minScale: BOTTLE.minScale,
  reduction: BOTTLE.reduction,
  moveDownVelocity: 0.07,
  fullHeight: 5.5 / 21 * 40
};

var FRUSTUMSIZE = window.innerHeight / window.innerWidth / 736 * 414 * 60;

var loader = new THREE.TextureLoader();

var cylinder_shadow = new THREE.MeshBasicMaterial({ map: loader.load('res/cylinder_shadow.png'), transparent: true, alphaTest: 0.01 });
var desk_shadow = new THREE.MeshBasicMaterial({ map: loader.load('res/desk_shadow.png'), transparent: true, alphaTest: 0.01 });
var shadow = new THREE.MeshBasicMaterial({ map: loader.load('res/shadow.png'), transparent: true, alphaTest: 0.01 });
var grayMaterial = new THREE.MeshLambertMaterial({ map: loader.load('res/gray.png') });
var numberMaterial = new THREE.MeshLambertMaterial({ map: loader.load('res/number.png'), alphaTest: 0.6 });

// const REPORTERTIMEOUT = 60001;

exports.COLORS = COLORS;
exports.BOTTLE = BOTTLE;
exports.PARTICLE = PARTICLE;
exports.GAME = GAME;
exports.WAVE = WAVE;
exports.CAMERA = CAMERA;
exports.AUDIO = AUDIO;
exports.BLOCK = BLOCK;
exports.FRUSTUMSIZE = FRUSTUMSIZE;
exports.loader = loader;
exports.cylinder_shadow = cylinder_shadow;
exports.desk_shadow = desk_shadow;
exports.shadow = shadow;
exports.grayMaterial = grayMaterial;
exports.numberMaterial = numberMaterial;