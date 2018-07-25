"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require("three");

var THREE = _interopRequireWildcard(_three);

var _config = require("./config.js");

var Config = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var geometry = new THREE.RingGeometry(Config.WAVE.innerRadius, Config.WAVE.outerRadius, Config.WAVE.thetaSeg);

var Wave = function () {
  function Wave() {
    _classCallCheck(this, Wave);

    var material = new THREE.MeshBasicMaterial({ color: Config.COLORS.pureWhite, transparent: true });
    this.obj = new THREE.Mesh(geometry, material);
    this.obj.rotation.x = -Math.PI / 2;
    this.obj.name = 'wave';
    //this.obj.visible = false;
  }

  _createClass(Wave, [{
    key: "reset",
    value: function reset() {
      this.obj.scale.set(1, 1, 1);
      this.obj.material.opacity = 1;
      this.obj.visible = false;
    }
  }]);

  return Wave;
}();

exports.default = Wave;