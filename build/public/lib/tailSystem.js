'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cellTailConfig = {
  duration: 100,
  height: 2.0,
  width: 0.5,
  distance: 0.5
};

var TailSystem = function () {
  function TailSystem(scene, bottle) {
    _classCallCheck(this, TailSystem);

    this.scene = scene;
    this.bottle = bottle;
    this.tailsRemainPool = [];
    this.tailsUsingPool = [];
    this.lastDotPosition = this.bottle.obj.position.clone();
    this.nowPosition = this.bottle.obj.position.clone();

    this.distance = cellTailConfig.distance;

    this.init();
  }

  _createClass(TailSystem, [{
    key: 'init',
    value: function init() {
      var width = cellTailConfig.width;
      var height = cellTailConfig.height;
      this.geometry = new THREE.PlaneGeometry(width, height);
      this.material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3
      });
      //this.cloneMesh = new THREE.Mesh(geometry, material)
      //this.cloneMesh.visible = false
      // this.cloneMesh.visible = true

      // 创造50个尾巴单元,平面和圆柱，先选择平面
      for (var i = 0; i < 20; i++) {
        var cellTail = new CellTail(this.geometry, this.material);

        this.scene.add(cellTail.mesh);
        this.tailsRemainPool.push(cellTail);
      }
    }
  }, {
    key: 'update',
    value: function update(tickTime) {
      // console.log(tickTime)
      this.updateActiveCell(tickTime);
      if (this.bottle.status == 'prepare') {
        this.nowPosition = this.bottle.obj.position.clone();
        this.lastDotPosition = this.bottle.obj.position.clone();
      }

      if (this.bottle.status == 'jump') {
        var distance = void 0;

        // 更新位置
        this.nowPosition = this.bottle.obj.position.clone();

        distance = this.nowPosition.clone().distanceTo(this.lastDotPosition.clone());
        if (distance < 5) {
          if (distance >= this.distance) {
            // 距离过大问题
            var m = distance / this.distance;
            var n = Math.floor(m);
            var lastPosition = this.lastDotPosition.clone();
            var nowPosition = this.nowPosition.clone();
            var tickScale = tickTime / cellTailConfig.duration;
            for (var i = 1; i <= n; i++) {
              nowPosition = this.lastDotPosition.clone().lerp(this.nowPosition.clone(), i / m);
              var scale = 1 + tickScale * (i / m - 1);
              scale = scale <= 0 ? 0 : scale;
              this.layEgg(lastPosition.clone(), nowPosition.clone(), scale);
              lastPosition = nowPosition.clone();
              if (i == n) {
                this.lastDotPosition = nowPosition.clone();
              }
            }
          }
        } else {
          this.lastDotPosition = this.nowPosition.clone();
        }
      }
    }
  }, {
    key: 'updateActiveCell',
    value: function updateActiveCell(tickTime) {
      var array = this.tailsUsingPool;
      var deltaScaleY = 1 / cellTailConfig.duration;
      var delatAlpha = 1 / cellTailConfig.duration;
      for (var i = 0; i < array.length; i++) {
        // 更新时间
        array[i].tickTime += tickTime;

        // 压缩所有cell的高度
        var newScale = array[i].mesh.scale.y - deltaScaleY * tickTime;
        if (newScale > 0) {

          array[i].mesh.scale.y = newScale > 0 ? newScale : 0;

          // array[i].mesh.material.opacity = 0.3

          // 判断透明度和高度，剔除用完的
          if (array[i].tickTime >= cellTailConfig.duration) {
            array[i].reset();
            var cell = array.shift();
            this.tailsRemainPool.push(cell);
            i--;
          }
        } else {
          array[i].reset();
          var _cell = array.shift();
          this.tailsRemainPool.push(_cell);
          i--;
        }
      }
    }
  }, {
    key: 'correctPosition',
    value: function correctPosition() {
      this.lastDotPosition = this.bottle.obj.position.clone();
    }
  }, {
    key: 'layEgg',
    value: function layEgg(lastDotPosition, nowPosition) {
      var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      // 获取一个
      var cellTail = this.getMesh();

      this.tailsUsingPool.push(cellTail);

      // 摆放位置
      cellTail.mesh.position.set(nowPosition.x, nowPosition.y, nowPosition.z);

      cellTail.mesh.scale.y = scale;

      // 修正方向
      cellTail.mesh.lookAt(lastDotPosition);

      cellTail.mesh.rotateY(Math.PI / 2);

      // 变可见
      cellTail.mesh.visible = true;
    }
  }, {
    key: 'getMesh',
    value: function getMesh() {
      var res = this.tailsRemainPool.shift();
      if (!res) {
        res = new CellTail(this.geometry, this.material);
        this.scene.add(res.mesh);
      }
      return res;
    }
  }, {
    key: 'allReset',
    value: function allReset() {
      this.tailsRemainPool.forEach(function (el) {
        el.reset();
      });
    }
  }]);

  return TailSystem;
}();

exports.default = TailSystem;

var CellTail = function () {
  function CellTail(geometry, material) {
    _classCallCheck(this, CellTail);

    this.tickTime = 0;
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.visible = false;
    this.mesh.name = 'tail';
  }

  _createClass(CellTail, [{
    key: 'reset',
    value: function reset() {
      this.tickTime = 0;
      this.mesh.scale.set(1, 1, 1);
      this.mesh.visible = false;
    }
  }]);

  return CellTail;
}();