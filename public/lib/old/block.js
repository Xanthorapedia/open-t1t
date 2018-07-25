/**
 * module[11]
 */

import * as THREE from "three";
import { GAME, COLORS, BLOCK }  from "./resource.js";
import * as _config  from "./resource.js";

// color specialized for blocks
const colors = {
  green: 6393958,
  white: 15658734,
  lightGreen: 8104320,
  gray: 10395294,
  black: 7171437,
  lightGray: 14408667,
  lightBlack: 13355979,
  brown: 6776679,
  middleLightGreen: 125084537,
  middleLightGray: 12303291,
  middleLightBlack: 8947848
}
// basic box shapes
var biggerGeometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2 + 0.02, _config.BLOCK.height + 0.04, _config.BLOCK.radius * 2 + 0.02);
var staticGeometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, _config.BLOCK.height, _config.BLOCK.radius * 2);
var shadowGeometry = new THREE.PlaneGeometry(11, 11);
var stripeMaterial = new THREE.MeshBasicMaterial({ map: _config.loader.load('res/stripe.png') });
var customMaterial = _config.GAME.canShadow ? THREE.MeshLambertMaterial : THREE.MeshBasicMaterial;

class Block {
  constructor(number) {
    //this.radiusSegments = BLOCK.radiusSegments[Math.floor(Math.random() * BLOCK.radiusSegments.length)];
		//this.geometry = new THREE.CylinderGeometry(BLOCK.radius, BLOCK.radius, BLOCK.height, this.radiusSegments);
		//this.colors = ['pink', 'cyan', 'yellowBrown', 'purple', 'orange'];
		//this.material = new THREE.MeshLambertMaterial({ color: COLORS[this.colors[Math.floor(5 * Math.random())]], shading: THREE.FlatShading });
		//this.obj = new THREE.Mesh(this.geometry, this.material);
		//this.obj.castShadow = true;
		this.radius = _config.BLOCK.radius;
		this.status = 'stop';
		this.scale = 1;
		this.type = 'green';
		this.types = ['green', 'black', 'gray'];
		this.radiusScale = 1;
		//this.obj.castShadow = true;
		//this.obj.receiveShadow = true;
		//if (this.radiusSegments === 4) this.obj.rotation.y = Math.PI / 4;
		//this.obj.scale.set(this.radiusScale, 1, this.radiusScale);
		this.obj = new THREE.Object3D();
		this.obj.name = 'block';
		this.body = new THREE.Object3D();
		if (type <= 8 || type == 27) {
			this.greenMaterial = new THREE.MeshLambertMaterial({ color: colors.green });
			this.whiteMaterial = new THREE.MeshLambertMaterial({ color: colors.white });
		}
		this.shadowWidth = 11;
		if (type == 2 || type == 7) {
			this.shadow = new THREE.Mesh(shadowGeometry, _config.desk_shadow);
			this.shadow.position.set(0, -_config.BLOCK.height / 2 - 0.001 * type, -4.5);
			this.shadow.scale.y = 1.2;
		} else if (type == 3 || type == 21 || type == 27 || type == 28 || type == 29 || type == 31) {
			this.shadow = new THREE.Mesh(shadowGeometry, _config.cylinder_shadow);
			this.shadow.position.set(-0.1, -_config.BLOCK.height / 2 - 0.001 * type, -2.8);
			this.shadow.scale.y = 1.4;
			this.shadow.scale.x = 1;
		} else {
			this.shadow = new THREE.Mesh(shadowGeometry, _config.shadow);
			this.shadow.position.set(-0.74, -_config.BLOCK.height / 2 - 0.001 * type, -2.73);
			this.shadow.scale.y = 1.4;
		}
		this.shadow.rotation.x = -Math.PI / 2;
		this.order = type;
		this.radiusSegments = 4;
		this.height = _config.BLOCK.height;
		this.canChange = true;
		if (type == 0) {
			var materials = [this.greenMaterial, this.whiteMaterial];
			var totalGeometry = new THREE.Geometry();
			var innerHeight = 3;
			var outerHeight = (_config.BLOCK.height - innerHeight) / 2;
			var outerGeometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, outerHeight, _config.BLOCK.radius * 2);
			this.geometry = outerGeometry;
			var innerGeometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, innerHeight, _config.BLOCK.radius * 2);
			this.merge(totalGeometry, outerGeometry, 0, [{ x: 0, y: -innerHeight / 2 - outerHeight / 2, z: 0 }, { x: 0, y: innerHeight / 2 + outerHeight / 2, z: 0 }]);
			this.merge(totalGeometry, innerGeometry, 1, [{ x: 0, y: 0, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 1) {
			var materials = [this.greenMaterial, this.whiteMaterial];
			var totalGeometry = new THREE.Geometry();
			var bottomHeight = _config.BLOCK.height / 5;
			var geometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, bottomHeight, _config.BLOCK.radius * 2);
			this.geometry = geometry;
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }, { x: 0, y: -2 * bottomHeight, z: 0 }, { x: 0, y: 2 * bottomHeight, z: 0 }]);
			this.merge(totalGeometry, geometry, 1, [{ x: 0, y: -bottomHeight, z: 0 }, { x: 0, y: bottomHeight, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 2) {
			var materials = [this.greenMaterial, this.whiteMaterial];
			var totalGeometry = new THREE.Geometry();
			this.radiusSegments = 50;
			var bottomHeight = 5;
			var topHeight = _config.BLOCK.height - bottomHeight;
			var bottomGeometry = new THREE.CylinderGeometry(_config.BLOCK.radius - 4, _config.BLOCK.radius - 2, bottomHeight, 50);
			var topGeometry = new THREE.CylinderGeometry(_config.BLOCK.radius, _config.BLOCK.radius, topHeight, 50);
			this.geometry = topGeometry;
			this.merge(totalGeometry, bottomGeometry, 1, [{ x: 0, y: -(_config.BLOCK.height - bottomHeight) / 2, z: 0 }]);
			this.merge(totalGeometry, topGeometry, 0, [{ x: 0, y: bottomHeight + topHeight / 2 - _config.BLOCK.height / 2, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 3) {
			this.radiusSegments = 50;
			this.middleLightGreenMaterial = new THREE.MeshLambertMaterial({ color: colors.middleLightGreen });
			var materials = [this.greenMaterial, this.whiteMaterial, this.middleLightGreenMaterial];
			var totalGeometry = new THREE.Geometry();
			var bottomHeight = 5;
			var topHeight = _config.BLOCK.height - bottomHeight;
			var bottomGeometry = new THREE.CylinderGeometry(_config.BLOCK.radius, _config.BLOCK.radius, bottomHeight, 50);
			var topGeometry = new THREE.CylinderGeometry(_config.BLOCK.radius, _config.BLOCK.radius, topHeight, 50);
			this.geometry = topGeometry;
			var ringGeometry = new THREE.RingGeometry(_config.BLOCK.radius * 0.6, _config.BLOCK.radius * 0.8, 30);
			ringGeometry.rotateX(-Math.PI / 2);
			this.merge(totalGeometry, bottomGeometry, 1, [{ x: 0, y: -(_config.BLOCK.height - bottomHeight) / 2, z: 0 }]);
			this.merge(totalGeometry, topGeometry, 0, [{ x: 0, y: bottomHeight + topHeight / 2 - _config.BLOCK.height / 2, z: 0 }]);
			this.merge(totalGeometry, ringGeometry, 2, [{ x: 0, y: _config.BLOCK.height / 2 + 0.01, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 4) {
			var materials = [this.greenMaterial, this.whiteMaterial];
			var totalGeometry = new THREE.Geometry();
			var geometry = staticGeometry;
			this.geometry = geometry;
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			var ringGeometry = new THREE.RingGeometry(1, 2, 30, 1);
			this.merge(totalGeometry, ringGeometry, 1, [{ x: 0, y: 0, z: _config.BLOCK.radius + 0.01 }]);
			ringGeometry.rotateY(-Math.PI / 2);
			this.merge(totalGeometry, ringGeometry, 1, [{ x: -_config.BLOCK.radius - 0.01, y: 0, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 5) {
			var materials = [this.greenMaterial, this.whiteMaterial];
			var totalGeometry = new THREE.Geometry();
			var innerHeight = 3;
			var outerHeight = (_config.BLOCK.height - innerHeight) / 2;
			var outerGeometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, outerHeight, _config.BLOCK.radius * 2);
			var innerGeometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, innerHeight, _config.BLOCK.radius * 2);
			this.merge(totalGeometry, outerGeometry, 0, [{ x: 0, y: -innerHeight / 2 - outerHeight / 2, z: 0 }, { x: 0, y: innerHeight / 2 + outerHeight / 2, z: 0 }]);
			this.merge(totalGeometry, innerGeometry, 1, [{ x: 0, y: 0, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 6) {
			var materials = [this.greenMaterial, this.whiteMaterial];
			var totalGeometry = new THREE.Geometry();
			var innerHeight = 3;
			var outerHeight = (_config.BLOCK.height - innerHeight) / 2;
			var outerGeometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, outerHeight, _config.BLOCK.radius * 2);
			var innerGeometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, innerHeight, _config.BLOCK.radius * 2);
			this.merge(totalGeometry, outerGeometry, 0, [{ x: 0, y: -innerHeight / 2 - outerHeight / 2, z: 0 }, { x: 0, y: innerHeight / 2 + outerHeight / 2, z: 0 }]);
			this.merge(totalGeometry, innerGeometry, 1, [{ x: 0, y: 0, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 7) {
			var materials = [this.greenMaterial, this.whiteMaterial];
			var totalGeometry = new THREE.Geometry();
			this.radiusSegments = 50;
			var bottomHeight = 5;
			var topHeight = _config.BLOCK.height - bottomHeight;
			var bottomGeometry = new THREE.CylinderGeometry(_config.BLOCK.radius - 4, _config.BLOCK.radius - 2, bottomHeight, 50);
			var topGeometry = new THREE.CylinderGeometry(_config.BLOCK.radius, _config.BLOCK.radius, topHeight, 50);
			this.geometry = topGeometry;
			this.merge(totalGeometry, bottomGeometry, 1, [{ x: 0, y: -(_config.BLOCK.height - bottomHeight) / 2, z: 0 }]);
			this.merge(totalGeometry, topGeometry, 0, [{ x: 0, y: bottomHeight + topHeight / 2 - _config.BLOCK.height / 2, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 8) {
			var materials = [this.greenMaterial, this.whiteMaterial];
			var totalGeometry = new THREE.Geometry();
			var bottomHeight = _config.BLOCK.height / 5;
			var geometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, bottomHeight, _config.BLOCK.radius * 2);
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }, { x: 0, y: -2 * bottomHeight, z: 0 }, { x: 0, y: 2 * bottomHeight, z: 0 }]);
			this.merge(totalGeometry, geometry, 1, [{ x: 0, y: -bottomHeight, z: 0 }, { x: 0, y: bottomHeight, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 9) {
			var pinkMaterial = new THREE.MeshLambertMaterial({ color: 0xed7c38 });
			var planeMaterial = new THREE.MeshBasicMaterial({
				map: _config.loader.load('res/game.png'),
				transparent: true
			});
			var materials = [pinkMaterial, planeMaterial];
			var totalGeometry = new THREE.Geometry();
			var geometry = staticGeometry;
			this.geometry = geometry;
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			this.merge(totalGeometry, new THREE.PlaneGeometry(5, 5), 1, [{ x: 0, y: 0.1, z: _config.BLOCK.radius + 0.01 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 10) {
			var yellowMaterial = new THREE.MeshLambertMaterial({ color: 0xfbe65e });
			var planeMaterial = new THREE.MeshBasicMaterial({
				map: _config.loader.load('res/emotion.png'),
				transparent: true
			});
			var materials = [yellowMaterial, planeMaterial];
			var totalGeometry = new THREE.Geometry();
			var geometry = staticGeometry;
			var faceGeometry = new THREE.CylinderGeometry(2, 2, 1, 50);
			var planeGeometry = new THREE.PlaneGeometry(1.5, 1.5);
			this.geometry = geometry;
			//var yellowLambertMaterial = new THREE.MeshLambertMaterial({ color: 0xfbe65e });
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			faceGeometry.rotateX(Math.PI / 2);
			this.merge(totalGeometry, faceGeometry, 0, [{ x: 0, y: 0, z: _config.BLOCK.radius + 0.51 }]);
			faceGeometry.rotateZ(Math.PI / 2);
			faceGeometry.rotateY(Math.PI / 2);
			this.merge(totalGeometry, faceGeometry, 0, [{ x: -_config.BLOCK.radius - 0.51, y: 0, z: 0 }]);
			this.merge(totalGeometry, planeGeometry, 1, [{ x: 0, y: 0, z: _config.BLOCK.radius + 1.02 }]);
			planeGeometry.rotateY(-Math.PI / 2);
			this.merge(totalGeometry, planeGeometry, 1, [{ x: -_config.BLOCK.radius - 1.02, y: 0, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 11) {
			var geometry = staticGeometry;
			var earGeometry = new THREE.BoxGeometry(3, 2, 4);
			this.geometry = geometry;
			var greenMaterial = new THREE.MeshLambertMaterial({ color: 0xb4e842 });
			var planeMaterial = new THREE.MeshBasicMaterial({
				map: _config.loader.load('res/green_face.png'),
				transparent: true
			});
			var planeGeometry = new THREE.PlaneGeometry(6, 3);
			var materials = [greenMaterial, planeMaterial];
			var totalGeometry = new THREE.Geometry();
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			this.merge(totalGeometry, planeGeometry, 1, [{ x: 0.5, y: -1, z: _config.BLOCK.radius + 0.01 }]);
			earGeometry.rotateZ(Math.PI / 5);
			this.merge(totalGeometry, earGeometry, 0, [{ x: -_config.BLOCK.radius - 1, y: 1, z: 2.5 }]);
			earGeometry.rotateZ(-2 * Math.PI / 5);
			this.merge(totalGeometry, earGeometry, 0, [{ x: _config.BLOCK.radius, y: 1, z: 2.5 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 12) {
			var geometry = staticGeometry;
			var earGeometry = new THREE.BoxGeometry(3, 2, 4);
			this.geometry = geometry;
			var greenMaterial = new THREE.MeshLambertMaterial({ color: 0xf2f2f2 });
			var planeMaterial = new THREE.MeshLambertMaterial({
				map: _config.loader.load('res/white_face.png')
			});
			var planeGeometry = new THREE.PlaneGeometry(6, 3);
			var materials = [greenMaterial, planeMaterial];
			var totalGeometry = new THREE.Geometry();
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			this.merge(totalGeometry, planeGeometry, 1, [{ x: 0.5, y: -1, z: _config.BLOCK.radius + 0.01 }]);
			earGeometry.rotateZ(Math.PI / 5);
			this.merge(totalGeometry, earGeometry, 0, [{ x: -_config.BLOCK.radius - 1, y: 1, z: 2.5 }]);
			earGeometry.rotateZ(-2 * Math.PI / 5);
			this.merge(totalGeometry, earGeometry, 0, [{ x: _config.BLOCK.radius, y: 1, z: 2.5 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 13) {
			var geometry = staticGeometry;
			this.geometry = geometry;
			var planeMaterial = new THREE.MeshLambertMaterial({
				map: _config.loader.load('res/money.png')
			});
			var planeGeometry = new THREE.PlaneGeometry(3, 3);
			var materials = [planeMaterial];
			var totalGeometry = new THREE.Geometry();
			this.mapUv(64, 64, geometry, 1, 2, 2, 4, 4);
			this.mapUv(64, 64, geometry, 2, 2, 2, 4, 4);
			this.mapUv(64, 64, geometry, 4, 2, 2, 4, 4);
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			this.merge(totalGeometry, planeGeometry, 0, [{ x: 0, y: 0, z: _config.BLOCK.radius + 0.01 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 14) {
			var geometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, this.height, _config.BLOCK.radius * 2);
			this.geometry = geometry;
			var material = new THREE.MeshLambertMaterial({
				map: _config.loader.load('res/tit.png')
			});
			this.mapUv(310, 310, geometry, 1, 0, 0, 200, 110);
			this.mapUv(310, 310, geometry, 2, 0, 110, 200, 310); //top
			this.mapUv(310, 310, geometry, 4, 200, 110, 310, 310); //right

			this.hitObj = new THREE.Mesh(geometry, material);

			// var materials = [material,  new THREE.ShadowMaterial({ transparent: true, color: 0x000000, opacity: 0.3, })];
			// var totalGeometry = new THREE.Geometry();
			// this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			// var planeGeometry = new THREE.PlaneGeometry(BLOCK.radius * 2, BLOCK.radius * 2);
			// planeGeometry.rotateX(-Math.PI / 2);
			// this.merge(totalGeometry, planeGeometry, 1, [{ x: 0, y: BLOCK.height / 2 + 0.1, z: 0 }]);
			// this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 15) {
			var geometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, this.height, _config.BLOCK.radius * 2);
			this.map = _config.loader.load('res/bag.png');
			var material = new THREE.MeshLambertMaterial({
				map: this.map
			});
			this.glowMap = _config.loader.load('res/glow_bag.png');
			this.hitObj = new THREE.Mesh(geometry, material);
		} else if (type == 16) {
			var geometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, this.height, _config.BLOCK.radius * 2);
			var material = new THREE.MeshLambertMaterial({
				map: _config.loader.load('res/dict.png')
			});
			this.mapUv(428, 428, geometry, 1, 0, 148, 280, 0);
			this.mapUv(428, 428, geometry, 2, 0, 148, 280, 428); //top
			this.mapUv(428, 428, geometry, 4, 280, 148, 428, 428); //right
			this.hitObj = new THREE.Mesh(geometry, material);
		} else if (type == 17) {
			this.height /= 3;
			var topMaterial = new THREE.MeshLambertMaterial({
				map: _config.loader.load('res/box_top.png')
			});
			var bottomMaterial = new THREE.MeshLambertMaterial({
				map: _config.loader.load('res/box_bottom.png')
			});
			var geometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, this.height, _config.BLOCK.radius * 2);
			this.geometry = geometry;
			var middleGeometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, this.height, _config.BLOCK.radius * 2);
			var materials = [topMaterial, bottomMaterial];
			var totalGeometry = new THREE.Geometry();
			this.mapUv(198, 198, geometry, 1, 0, 0, 148, 50);
			this.mapUv(198, 198, geometry, 2, 0, 50, 148, 198); //top
			this.mapUv(198, 198, geometry, 4, 148, 50, 198, 198); //right

			this.mapUv(444, 50, middleGeometry, 4, 148, 0, 296, 50, true);
			this.mapUv(444, 50, middleGeometry, 1, 0, 0, 148, 50);
			this.mapUv(444, 50, middleGeometry, 2, 0, 0, 1, 1); //top
			this.mapUv(444, 50, middleGeometry, 0, 296, 50, 444, 0);
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			this.merge(totalGeometry, middleGeometry, 1, [{ x: 0, y: -2 * this.height, z: 0 }]);

			var middleMaterial = new THREE.MeshLambertMaterial({
				map: _config.loader.load('res/box_middle.png')
			});
			this.middle = new THREE.Mesh(middleGeometry, middleMaterial);
			this.middle.position.y = -this.height;
			this.body.add(this.middle);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 18) {
			var geometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, this.height, _config.BLOCK.radius * 2);
			var material = new THREE.MeshLambertMaterial({
				map: _config.loader.load('res/express.png')
			});
			this.mapUv(428, 428, geometry, 1, 0, 0, 280, 148);
			this.mapUv(428, 428, geometry, 2, 0, 148, 280, 428); //top
			this.mapUv(428, 428, geometry, 4, 280, 148, 428, 428); //right
			this.hitObj = new THREE.Mesh(geometry, material);
		} else if (type == 19) {
			this.min = 0.9;
			this.height = _config.BLOCK.height / 21 * 4;
			var geometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, this.height + 0.1, _config.BLOCK.radius * 2);
			this.geometry = geometry;
			var material = new THREE.MeshLambertMaterial({
				color: 0xffffff,
				transparent: true,
				opacity: 0.3
			});
			var bottomGeometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2.05, _config.BLOCK.height / 21 * 17, _config.BLOCK.radius * 2.05);
			var bottomMaterial = new THREE.MeshBasicMaterial({
				map: _config.loader.load('res/sing.png')
			});
			var materials = [material, bottomMaterial];
			var totalGeometry = new THREE.Geometry();
			this.mapUv(416, 416, bottomGeometry, 1, 0, 0, 256, 160);
			this.mapUv(416, 416, bottomGeometry, 2, 0, 160, 256, 416); //top
			this.mapUv(416, 416, bottomGeometry, 4, 256, 160, 416, 416); //right
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			this.merge(totalGeometry, bottomGeometry, 1, [{ x: 0, y: -_config.BLOCK.height / 21 * 10.5, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
			this.record = new THREE.Object3D();

			this.record.add(new THREE.Mesh(new THREE.CylinderGeometry(_config.BLOCK.radius * 0.9, _config.BLOCK.radius * 0.9, 0.4, 50), new THREE.MeshBasicMaterial({ color: 0x2c2c2c })));
			var planeGeometry = new THREE.CircleGeometry(_config.BLOCK.radius * 0.9, 40);
			var planeMaterial = new THREE.MeshBasicMaterial({ map: _config.loader.load('res/record.png') });
			var plane = new THREE.Mesh(planeGeometry, planeMaterial);
			plane.rotation.x = -Math.PI / 2;
			plane.position.y = 0.26;
			this.record.add(plane);
			this.body.add(this.record);
			var planeGeometry = new THREE.PlaneGeometry(2, 2);
			this.musicIcon = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({ map: _config.loader.load('res/music_icon.png'), transparent: true }));
			this.musicIcon.position.set(0, 0, 0);
			this.musicIcon.rotation.y = -Math.PI / 4;
			this.musicIcon.rotation.x = -Math.PI / 5;
			this.musicIcon.rotation.z = -Math.PI / 5;
			this.musicIcon.visible = false;
			this.secondMusicIcon = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({ map: _config.loader.load('res/music_icon_two.png'), transparent: true }));
			this.secondMusicIcon.rotation.y = -Math.PI / 4;
			this.secondMusicIcon.rotation.x = -Math.PI / 5;
			this.secondMusicIcon.rotation.z = -Math.PI / 5;
			this.secondMusicIcon.visible = false;
			this.icons = [];
			this.icons.push(this.musicIcon, this.secondMusicIcon);
			for (var i = 0; i < 2; ++i) {
				this.body.add(this.icons[i]);
			}
		} else if (type == 20) {
			var geometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, this.height, _config.BLOCK.radius * 2 / 38 * 48);
			this.geometry = geometry;
			this.shadow.scale.set(1, 61 / 38, 48 / 38);
			//this.shadow.position.z += ;
			var material = new THREE.MeshLambertMaterial({
				map: _config.loader.load('res/disk.png')
			});
			var darkMaterial = new THREE.MeshBasicMaterial({ map: _config.loader.load('res/disk_dark.png'), transparent: true });
			var planeGeometry = new THREE.PlaneGeometry(3, 3);
			var materials = [darkMaterial, material];
			var totalGeometry = new THREE.Geometry();
			this.mapUv(236, 300, geometry, 1, 0, 250, 10, 260);
			this.mapUv(236, 300, geometry, 2, 0, 300, 236, 0); //top
			this.mapUv(236, 300, geometry, 4, 0, 250, 10, 260); //right
			this.merge(totalGeometry, geometry, 1, [{ x: 0, y: 0, z: 0 }]);
			this.merge(totalGeometry, planeGeometry, 0, [{ x: 3.5, y: 0.5, z: _config.BLOCK.radius / 38 * 48 + 0.01 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
			this.plane = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial({ map: _config.loader.load('res/disk_light.png'), transparent: true }));
			this.plane.position.set(3.5, 0.5, _config.BLOCK.radius / 38 * 48 + 0.03);
			this.plane.updateMatrix();
			this.plane.matrixAutoUpdate = false;
			this.body.add(this.plane);
			this.timer = setInterval(function () {
				_this.plane.visible = !_this.plane.visible;
			}, 1000);
		} else if (type == 21) {
			this.radiusSegments = 50;
			this.min = 0.8;
			this.height = _config.BLOCK.height / 21 * 4;
			var geometry = new THREE.CylinderGeometry(_config.BLOCK.radius * 0.7, _config.BLOCK.radius * 0.8, this.height, 50);
			this.geometry = geometry;
			var planeGeometry = new THREE.CircleGeometry(_config.BLOCK.radius * 0.7, 50);
			var bottomGeometry = new THREE.CylinderGeometry(_config.BLOCK.radius * 0.7, _config.BLOCK.radius * 0.5, _config.BLOCK.height / 21 * 17, 50);
			var material = new THREE.MeshBasicMaterial({ color: 0x4d4d4d });
			var planeMaterial = new THREE.MeshLambertMaterial({ map: _config.loader.load('res/westore_desk.png') });
			var bottomMaterial = new THREE.MeshBasicMaterial({ map: _config.loader.load('res/westore.png') });
			this.shadow.scale.set(0.55, 0.9, 0.7);
			var materials = [material, bottomMaterial, planeMaterial];
			var totalGeometry = new THREE.Geometry();
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			bottomGeometry.rotateY(2.3);
			this.merge(totalGeometry, bottomGeometry, 1, [{ x: 0, y: -_config.BLOCK.height / 21 * 10.5, z: 0 }]);
			planeGeometry.rotateX(-Math.PI / 2);
			planeGeometry.rotateY(-0.7);
			this.merge(totalGeometry, planeGeometry, 2, [{ x: 0, y: this.height / 2 + 0.01, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 22) {
			this.height = _config.BLOCK.height / 21 * 6;
			var geometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2.1, this.height, _config.BLOCK.radius * 2.1);
			this.geometry = geometry;
			var material = new THREE.MeshLambertMaterial({
				map: _config.loader.load('res/gift.png')
			});
			var bottomGeometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, _config.BLOCK.height / 21 * 15, _config.BLOCK.radius * 2);
			var bottomMaterial = new THREE.MeshLambertMaterial({
				color: 0xb193f5
			});
			this.mapUv(300, 370, geometry, 1, 0, 0, 300, 70);
			this.mapUv(300, 370, geometry, 2, 0, 70, 300, 370); //top
			this.mapUv(300, 370, geometry, 4, 0, 0, 300, 70, true); //right
			var materials = [material, bottomMaterial];
			var totalGeometry = new THREE.Geometry();
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			this.merge(totalGeometry, bottomGeometry, 1, [{ x: 0, y: -_config.BLOCK.height / 21 * 10.5, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 23) {
			this.height = _config.BLOCK.height / 21 * 5;
			var geometry = new THREE.Geometry();
			var deskGeometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, this.height, _config.BLOCK.radius * 2 / 38 * 40);
			geometry.merge(deskGeometry);
			this.shadow.scale.set(1, 48 / 38, 48 / 38);
			var legGeometry = new THREE.BoxGeometry(1.5, 3.5, 1.5);
			legGeometry.rotateZ(-0.3);
			legGeometry.vertices[7].y -= 0.4;
			legGeometry.vertices[6].y -= 0.4;
			legGeometry.translate(-4, -3, -3.5);
			geometry.merge(legGeometry);
			legGeometry.vertices[6].y += 0.5;
			legGeometry.translate(0, 0, 7);
			legGeometry.rotateX(-0.2);
			geometry.merge(legGeometry);
			legGeometry.vertices[7].y += 0.4;
			legGeometry.translate(5, -1, 0);
			legGeometry.rotateZ(0.4);
			geometry.merge(legGeometry);
			var material = new THREE.MeshLambertMaterial({
				map: _config.loader.load('res/stool.png')
			});
			this.hitObj = new THREE.Mesh(geometry, material);
			this.shadow = new THREE.Mesh(new THREE.PlaneGeometry(this.shadowWidth, this.shadowWidth), new THREE.MeshBasicMaterial({ map: _config.loader.load('res/stool_shadow.png'), transparent: true, alphaTest: 0.01 }));
			this.shadow.position.set(-0.76, -_config.BLOCK.height / 2 - 0.001 * type, -3.6);
			this.shadow.scale.y = 1.4;
			this.shadow.scale.x = 0.9;
			this.shadow.rotation.x = -Math.PI / 2;
		} else if (type == 24) {
			this.height = _config.BLOCK.height / 21 * 6;
			var geometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2 / 38 * 45, this.height, _config.BLOCK.radius * 2 / 38 * 45);
			this.geometry = geometry;
			var bottomGeometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2 / 38 * 40, _config.BLOCK.height / 21 * 15, _config.BLOCK.radius * 2 / 38 * 40);
			this.shadow.scale.set(40 / 38, 1.4, 1);
			var material = new THREE.MeshLambertMaterial({
				map: _config.loader.load('res/store_top.png')
			});
			var bottomMaterial = new THREE.MeshBasicMaterial({
				map: _config.loader.load('res/store_bottom.png'),
				transparent: true
			});
			var planeMaterial = new THREE.MeshBasicMaterial({ map: _config.loader.load('res/indoor.png'), transparent: true });
			var materials = [material, bottomMaterial, planeMaterial];
			var planeGeometry = new THREE.PlaneGeometry(3.1, 3.1);
			var totalGeometry = new THREE.Geometry();
			this.mapUv(340, 340, geometry, 1, 0, 0, 280, 60);
			this.mapUv(340, 340, geometry, 2, 0, 60, 280, 340); //top
			this.mapUv(340, 340, geometry, 4, 280, 60, 340, 340); //right
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			this.mapUv(434, 164, bottomGeometry, 1, 0, 0, 217, 164);
			this.mapUv(434, 164, bottomGeometry, 4, 217, 0, 434, 164, true); //right
			this.merge(totalGeometry, bottomGeometry, 1, [{ x: 0, y: -_config.BLOCK.height / 21 * 10.5, z: 0 }]);
			planeGeometry.rotateY(-Math.PI / 2);
			this.merge(totalGeometry, planeGeometry, 2, [{ x: -_config.BLOCK.radius / 38 * 40 - 0.01, y: -3.3, z: -2.5 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
			var doorGeometry = new THREE.PlaneGeometry(1.55, 3.1);
			this.door = new THREE.Mesh(doorGeometry, new THREE.MeshBasicMaterial({ map: _config.loader.load('res/door.png'), transparent: true }));
			this.door.rotation.y = -Math.PI / 2;
			this.door.position.set(-_config.BLOCK.radius / 38 * 40 - 0.02, -3.3, -3.3);
			this.body.add(this.door);
			this.secondDoor = new THREE.Mesh(doorGeometry, new THREE.MeshBasicMaterial({ map: _config.loader.load('res/second_door.png'), transparent: true }));
			this.secondDoor.rotation.y = -Math.PI / 2;
			this.secondDoor.position.set(-_config.BLOCK.radius / 38 * 40 - 0.02, -3.3, -1.7);
			this.body.add(this.secondDoor);
			// this.shadow.position.x += 0.6;
			// this.shadow.position.z += 1;
		} else if (type == 25) {
			var geometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, this.height, _config.BLOCK.radius * 2);
			this.geometry = geometry;
			var material = new THREE.MeshLambertMaterial({
				map: _config.loader.load('res/clock.png')
			});
			this.mapUv(320, 200, geometry, 1, 0, 0, 5, 5);
			this.mapUv(320, 200, geometry, 2, 0, 0, 5, 5); //top
			this.mapUv(320, 200, geometry, 4, 0, 200, 320, 0, true); //right
			var buttonMaterial = stripeMaterial;
			var buttonGeometry = new THREE.CylinderGeometry(1, 1, 1, 30);
			var materials = [material, buttonMaterial];
			var totalGeometry = new THREE.Geometry();
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			buttonGeometry.rotateZ(Math.PI / 2);
			this.merge(totalGeometry, buttonGeometry, 1, [{ x: -_config.BLOCK.radius - 0.5, y: 0, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
			this.plane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({ map: _config.loader.load('res/point.png'), transparent: true }));
			this.plane.position.set(0, 0, _config.BLOCK.radius + 0.04);
			this.body.add(this.plane);
			this.timer = setInterval(function () {
				_this.plane.visible = !_this.plane.visible;
			}, 1000);
			this.numbers = [];
			var numberGeometry = new THREE.PlaneGeometry(3, 3);
			for (var i = 0; i < 10; ++i) {
				var clockNumberMaterial = new THREE.MeshBasicMaterial({ map: _config.loader.load('res/' + i + '.png'), alphaTest: 0.5 });
				var arr = [];
				for (var j = 0; j < 4; ++j) {
					var time = new THREE.Mesh(numberGeometry, clockNumberMaterial);
					time.position.z = _config.BLOCK.radius + 0.01;
					time.visible = false;
					arr.push(time);
					this.body.add(time);
				}
				this.numbers.push(arr);
			}
			var date = new Date();
			var hour = ('0' + date.getHours()).slice(-2);
			var minute = ('0' + date.getMinutes()).slice(-2);
			this.numbers[hour[0]][0].position.x = -3.2 * this.radiusScale;
			this.numbers[hour[0]][0].visible = true;
			this.numbers[hour[1]][1].position.x = -1.3 * this.radiusScale;
			this.numbers[hour[1]][1].visible = true;
			this.numbers[minute[0]][2].position.x = 1.3 * this.radiusScale;
			this.numbers[minute[0]][2].visible = true;
			this.numbers[minute[1]][3].position.x = 3.2 * this.radiusScale;
			this.numbers[minute[1]][3].visible = true;
		} else if (type == 26) {
			var geometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, this.height, _config.BLOCK.radius * 2);
			var material = new THREE.MeshLambertMaterial({
				map: _config.loader.load('res/well.png')
			});
			this.mapUv(280, 428, geometry, 1, 0, 0, 280, 148);
			this.mapUv(280, 428, geometry, 2, 0, 148, 280, 428); //top
			this.mapUv(280, 428, geometry, 4, 0, 0, 280, 148, true); //right
			this.hitObj = new THREE.Mesh(geometry, material);
		} else if (type == 27) {
			this.radiusSegments = 50;
			var geometry = new THREE.CylinderGeometry(_config.BLOCK.radius * 2 / 38 * 25, _config.BLOCK.radius * 2 / 38 * 25, this.height, 50);
			this.geometry = geometry;
			this.shadow.scale.set(50 / 38, 50 / 38, 50 / 38);
			var material = new THREE.MeshBasicMaterial({
				map: _config.loader.load('res/golf_bottom.png')
			});
			var planeGeometry = new THREE.CircleGeometry(_config.BLOCK.radius * 2 / 38 * 25 + 0.01, 30);
			var planeMaterial = new customMaterial({ map: _config.loader.load('res/golf_top.png') });
			var totalGeometry = new THREE.Geometry();
			var materials = [material, planeMaterial];
			geometry.rotateY(3);
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			planeGeometry.rotateX(-Math.PI / 2);
			planeGeometry.rotateY(-0.7);
			this.merge(totalGeometry, planeGeometry, 1, [{ x: 0, y: this.height / 2 + 0.01, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
			this.sphere = new THREE.Mesh(new THREE.SphereGeometry(0.6, 10, 10), this.whiteMaterial);
			this.sphere.position.set(-8, -1, -1.5);
			this.obj.add(this.sphere);
		} else if (type == 28) {
			this.radiusSegments = 50;
			var geometry = new THREE.CylinderGeometry(_config.BLOCK.radius * 2 / 38 * 15, _config.BLOCK.radius * 2 / 38 * 15, this.height, 50);
			this.geometry = geometry;
			this.shadow.scale.set(30 / 38, 30 / 38, 30 / 38);
			var material = new THREE.MeshBasicMaterial({
				map: _config.loader.load('res/paper_bottom.png')
			});
			var planeGeometry = new THREE.CircleGeometry(_config.BLOCK.radius * 2 / 38 * 15 + 0.01, 30);
			var planeMaterial = new customMaterial({ map: _config.loader.load('res/paper_top.png') });
			var totalGeometry = new THREE.Geometry();
			var materials = [material, planeMaterial];
			geometry.rotateY(4);
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			planeGeometry.rotateX(-Math.PI / 2);
			planeGeometry.rotateY(-0.7);
			this.merge(totalGeometry, planeGeometry, 1, [{ x: 0, y: this.height / 2 + 0.01, z: 0 }]);
			this.shadow.scale.y = 1.1;
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
		} else if (type == 29) {
			this.radiusSegments = 50;
			this.min = 0.8;
			this.height = _config.BLOCK.height / 21 * 4;
			var geometry = new THREE.CylinderGeometry(_config.BLOCK.radius * 0.4, _config.BLOCK.radius * 0.4, this.height, 50);
			this.geometry = geometry;
			var material = stripeMaterial;
			var planeGeometry = new THREE.CircleGeometry(_config.BLOCK.radius * 0.4, 50);
			var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
			var middleGeometry = new THREE.CylinderGeometry(_config.BLOCK.radius * 0.4, _config.BLOCK.radius * 0.5, _config.BLOCK.height / 21 * 1, 50);
			var bottomGeometry = new THREE.CylinderGeometry(_config.BLOCK.radius * 0.5, _config.BLOCK.radius * 0.5, _config.BLOCK.height / 21 * 16, 50);
			var bottomMaterial = new THREE.MeshBasicMaterial({ map: _config.loader.load('res/medicine.png') });
			var totalGeometry = new THREE.Geometry();
			var materials = [material, planeMaterial, bottomMaterial];
			this.merge(totalGeometry, geometry, 0, [{ x: 0, y: 0, z: 0 }]);
			planeGeometry.rotateX(-Math.PI / 2);
			this.merge(totalGeometry, planeGeometry, 1, [{ x: 0, y: this.height / 2 + 0.01, z: 0 }]);
			this.merge(totalGeometry, middleGeometry, 1, [{ x: 0, y: -_config.BLOCK.height / 21 * 2.5, z: 0 }]);
			bottomGeometry.rotateY(2.3);
			this.merge(totalGeometry, bottomGeometry, 2, [{ x: 0, y: -_config.BLOCK.height / 21 * 11, z: 0 }]);
			this.hitObj = new THREE.Mesh(totalGeometry, materials);
			this.shadow.scale.set(0.55, 0.9, 0.7);

			// } else if (type == 30) {
			// 	this.canChange = false;
			// 	this.height = 0;
			// 	this.blackMaterial = new THREE.MeshLambertMaterial({ color: 0x4d4d4d, side: THREE.DoubleSide });
			// 	var radius = BLOCK.height;
			// 	var width = radius * 2;
			// 	this.radiusSegments = 4;
			// 	var body = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 32, 1, false, 0, Math.PI), new THREE.MeshLambertMaterial({ color: 0x679ae4 }));
			// 	body.rotation.z = -Math.PI / 2;
			// 	this.body.add(body);
			// 	this.hitObj = new THREE.Mesh(new THREE.BoxGeometry(width, 0.01, radius * 2), new THREE.MeshLambertMaterial({ color: 0x679ae2 }));
			// 	//desk.position.z = radius;
			// 	//desk.rotation.x = -Math.PI / 2;
			// 	var small = new THREE.Mesh(new THREE.CylinderGeometry(radius / 3, radius / 3, 0.5, 32, 1, false, 0, Math.PI), new THREE.MeshLambertMaterial({ color: 0xffd67e }));
			// 	small.rotation.z = -Math.PI / 2;
			// 	small.position.x = -width / 2 - 0.25;
			// 	small.position.y -= 1;
			// 	this.body.add(small);
			// 	var smallDesk = new THREE.Mesh(new THREE.PlaneGeometry(0.5, radius * 2 / 3), new THREE.MeshLambertMaterial({ color: 0xffd67e }));
			// 	smallDesk.rotation.x = -Math.PI / 2;
			// 	smallDesk.position.x = -width / 2 - 0.25;
			// 	smallDesk.position.y -= 1;
			// 	this.body.add(smallDesk);
			// } else if (type == 31) {
			// 	this.height = 0;
			// 	this.radiusSegments = 50;
			// 	var radius = BLOCK.radius;
			// 	var width = BLOCK.width;
			// 	this.hitObj = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, 0.5, 50),  new THREE.MeshLambertMaterial({ color: 0xffd67e }));
			// 	this.hitObj.receiveShadow = true;
			// 	this.body.add(this.hitObj);
			// 	var redSphere = new THREE.Mesh(new THREE.CylinderGeometry( radius + 0.5, radius + 1, 1, 50), new THREE.MeshLambertMaterial({ color: 0xdd5858 }));
			// 	redSphere.position.y = -1;
			// 	this.body.add(redSphere);
			// 	var middle = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, 2, 50), new THREE.MeshLambertMaterial({ color: 0x4d4d4d }));
			// 	middle.position.y = -3.5;
			// 	this.body.add(middle);
			// 	this.bottomSphere = this.hitObj.clone();
			// 	this.bottomSphere.scale.set(0.7, 0.7, 0.7);
			// 	this.bottomSphere.position.y = -6;
			// 	this.body.add(this.bottomSphere);
			// 	var body = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x4d4d4d }));
			// 	body.rotation.x = Math.PI;
			// 	body.position.y = -6;
			// 	this.body.position.y = BLOCK.height / 2 - 0.5;
			// 	this.body.add(body);
		} else if (type == -1) {
			var color = [0xee6060, 0xe4965e, 0xefbf57, 0x8ab34e, 0x71b4c4, 0x637cbd, 0xa461d4];
			var geometry = biggerGeometry;
			var material = new THREE.MeshLambertMaterial({ color: color[number], transparent: true });
			this.hitObj = new THREE.Mesh(geometry, material);
			var grayGeometry = new THREE.BoxGeometry(_config.BLOCK.radius * 2, _config.BLOCK.height, _config.BLOCK.radius * 2);
			this.mapUv(100, 88, grayGeometry, 2, 0, 0, 5, 5);
			var gray = new THREE.Mesh(grayGeometry, _config.grayMaterial);
			if (number == 0) gray.receiveShadow = true;
			this.body.add(gray);
			var planeGeometry = new THREE.PlaneGeometry(4, 8);
			var x1, y1, x2, y2;
			x1 = 64 * (number % 4);
			x2 = x1 + 64;
			y1 = parseInt(number / 4) * 128;
			y2 = y1 + 128;
			this.mapUv(256, 256, planeGeometry, 0, x1, y2, x2, y1);
			var plane = new THREE.Mesh(planeGeometry, _config.numberMaterial);
			plane.rotation.x = -Math.PI / 2;
			plane.rotation.z = -Math.PI / 2;
			plane.position.y = _config.BLOCK.height / 2 + 0.05;
			this.body.add(plane);
			this.obj.scale.set(0.7, 1, 0.7);
		}
		// else if (type == 26) {
		// 	this.radiusSegments = 50;
		// 	this.canChange = false;
		// 	this.height = BLOCK.height / 21 * 4;
		// 	var geometry = new THREE.CylinderGeometry(BLOCK.radius * 2 / 38 * 6.5, BLOCK.radius * 2 / 38 * 6.5, this.height, 50, 50);
		// 	var material = new THREE.MeshLambertMaterial({
		// 	 	color: 0xea8d9a
		// 	});
		// 	this.hitObj = new THREE.Mesh(geometry, material);
		// 	var middle = new THREE.Mesh(new THREE.CylinderGeometry(BLOCK.radius * 2 / 38 * 7, BLOCK.radius * 2 / 38 * 7, BLOCK.height / 21 * 22, 50, 50), new THREE.MeshLambertMaterial({ map: loader.load('res/pencil_middle.png') }));
		// 	var bottom = new THREE.Mesh(new THREE.CylinderGeometry(BLOCK.radius * 2 / 38 * 7, 0.01, BLOCK.height / 21 * 14, 50, 50), new THREE.MeshLambertMaterial({ map: loader.load('res/pencil_bottom.png') }));
		// 	this.shadow.scale.set(14 / 38, 14 / 38, 14 / 38);
		// 	this.shadow.position.z += 1.9;
		// 	middle.rotation.y = 0.9;
		// 	middle.position.y = -BLOCK.height / 21 * 13;
		// 	bottom.position.y =  -BLOCK.height / 21 * 31;
		// 	this.body.add(middle);
		// 	this.body.add(bottom);
		// 	var planeGeometry = new THREE.CircleGeometry(BLOCK.radius * 2 / 38 * 7 + 0.02, 50);
		// 	var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xf9d929 });
		// 	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
		// 	plane.rotation.x = -Math.PI / 2;
		// 	plane.rotation.z = -0.7;
		// 	plane.position.y = -this.height / 2 + 0.01;
		// 	this.body.add(plane);
		// }
		this.shadow.initZ = this.shadow.position.z;
		this.hitObj.receiveShadow = true;
		this.hitObj.name = 'hitObj';
		this.body.add(this.hitObj);
		this.hitObj.matrixAutoUpdate = false;
		this.shadow.initScale = this.shadow.scale.y;
		this.body.position.y = _config.BLOCK.height / 2 - this.height / 2;
		this.obj.add(this.shadow);
		this.obj.add(this.body);
  }

  merge(totalGeometry, geometry, index, positions) {
		for (var i = 0, len = geometry.faces.length; i < len; ++i) {
			geometry.faces[i].materialIndex = 0;
		}
		var mesh = new THREE.Mesh(geometry);
		for (var i = 0, len = positions.length; i < len; ++i) {
			mesh.position.set(positions[i].x, positions[i].y, positions[i].z);
			mesh.updateMatrix();
			totalGeometry.merge(mesh.geometry, mesh.matrix, index);
		}
	}

  mapUv(textureWidth, textureHeight, geometry, faceIdx, x1, y1, x2, y2, flag) {
		var tileUvW = 1 / textureWidth;
		var tileUvH = 1 / textureHeight;
		if (geometry.faces[faceIdx] instanceof THREE.Face3) {
			var UVs = geometry.faceVertexUvs[0][faceIdx * 2];
			if (faceIdx == 4 && !flag) {
				UVs[0].x = x1 * tileUvW;UVs[0].y = y1 * tileUvH;
				UVs[2].x = x1 * tileUvW;UVs[2].y = y2 * tileUvH;
				UVs[1].x = x2 * tileUvW;UVs[1].y = y1 * tileUvH;
			} else {
				UVs[0].x = x1 * tileUvW;UVs[0].y = y1 * tileUvH;
				UVs[1].x = x1 * tileUvW;UVs[1].y = y2 * tileUvH;
				UVs[2].x = x2 * tileUvW;UVs[2].y = y1 * tileUvH;
			}
			var UVs = geometry.faceVertexUvs[0][faceIdx * 2 + 1];
			if (faceIdx == 4 && !flag) {
				UVs[2].x = x1 * tileUvW;UVs[2].y = y2 * tileUvH;
				UVs[1].x = x2 * tileUvW;UVs[1].y = y2 * tileUvH;
				UVs[0].x = x2 * tileUvW;UVs[0].y = y1 * tileUvH;
			} else {
				UVs[0].x = x1 * tileUvW;UVs[0].y = y2 * tileUvH;
				UVs[1].x = x2 * tileUvW;UVs[1].y = y2 * tileUvH;
				UVs[2].x = x2 * tileUvW;UVs[2].y = y1 * tileUvH;
			}
		}
	}
}
