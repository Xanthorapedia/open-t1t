"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require("three");

var THREE = _interopRequireWildcard(_three);

var _font = require("./font.js");

var _font2 = _interopRequireDefault(_font);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Text = function () {
  function Text(text, options) {
    _classCallCheck(this, Text);

    this.material = new THREE.MeshBasicMaterial({ color: options.fillStyle || 0xffffff, transparent: true });
    if (options.opacity) this.material.opacity = options.opacity;
    this.options = options || {};
    this.obj = new THREE.Object3D();
    this.obj.name = 'text';
    if (options.chinese) {
      var chinese = new THREE.Mesh(new THREE.TextGeometry(text, { 'font': _font2.default, 'size': 1.0, 'height': 0.1 }), this.material);
      this.obj.add(chinese);
      if (options.textAlign == 'center') chinese.position.x = text.length * 1.1 / -2;
      // var chinese = new THREE.Mesh(new THREE.TextGeometry(text, { 'font': FONT, 'size': 1.0, 'height': 0.1 }), this.material);
      // this.obj.add(chinese);
      // if (options.textAlign == 'center') chinese.position.x = text.length * 1.1 / -2;
    } else {
      this.scores = [];
      this.plus = new THREE.Mesh(new THREE.TextGeometry('+', { 'font': _font2.default, 'size': 3.0, 'height': 0.1 }), this.material);
      var amount = this.options.sumScore ? 5 : 2;
      for (var i = 0; i < 10; ++i) {
        var duplicateArr = [];
        var geometry = new THREE.TextGeometry(i, { 'font': _font2.default, 'size': 3.0, 'height': 0.1 });
        for (var j = 0; j < amount; ++j) {
          var score = new THREE.Mesh(geometry, this.material);
          score.using = false;
          duplicateArr.push(score);
        }
        this.scores.push(duplicateArr);
      }
      this.setScore(text);
    }
  }

  _createClass(Text, [{
    key: "setScore",
    value: function setScore(score) {
      var perWidth = 2.5;
      score = score.toString();
      var lengthSum = score.length * perWidth;
      var amount = this.options.sumScore ? 5 : 2;
      var sum = this.options.textAlign == 'center' ? -lengthSum / 2 : 0;
      if (this.options.plusScore) {
        sum = -(lengthSum + perWidth) / 2;
        this.plus.position.x = sum;
        this.obj.add(this.plus);
        sum += perWidth;
      }
      for (var i = 0, len = this.scores.length; i < len; ++i) {
        for (var j = 0; j < amount; ++j) {
          if (this.scores[i][j].using) {
            this.obj.remove(this.scores[i][j]);
            this.scores[i][j].using = false;
          }
        }
      }
      for (var i = 0, len = score.length; i < len; ++i) {
        var scores = this.scores[score[i]];
        for (var j = 0; j < amount; ++j) {
          if (!scores[j].using) {
            scores[j].position.x = sum;
            scores[j].using = true;
            this.obj.add(scores[j]);
            break;
          }
        }
        sum += perWidth;
      }
    }
  }, {
    key: "changeStyle",
    value: function changeStyle(obj) {
      Object.assign(this.options, obj);
      this.obj.updateMatrix();
    }
  }]);

  return Text;
}();

exports.default = Text;