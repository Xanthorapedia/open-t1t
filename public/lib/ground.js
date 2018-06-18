/**
 * module[17]
 * Background class
 * @file
 */

import * as THREE from "three";
import * as RES from "./resource";
import * as ANIM from "./animations"

/**
 * Represents the ground with mutable gradient colors.
 * @class
 */
class Ground {
  /**
   * Constructs a Ground from.
   * @constructor
   */
  constructor() {
    this.obj = new THREE.Object3D(), this.obj.name = "ground";
    // big enough (but how big?) to cover the whole screen
    var geormetry = new THREE.PlaneGeometry(
      RES.GAME.HEIGHT / RES.GAME.WIDTH * RES.FRUSTUMSIZE, RES.FRUSTUMSIZE);
    this.materials = [];
    for (var colors = [
			["rgba(215, 219, 230, 1)", "rgba(188, 190, 199, 1)"],
			["rgba(255, 231, 220, 1)", "rgba(255, 196, 204, 1)"],
			["rgba(255, 224, 163, 1)", "rgba(255, 202, 126, 1)"],
			["rgba(255, 248, 185, 1)", "rgba(255, 245, 139, 1)"],
			["rgba(218, 244, 255, 1)", "rgba(207, 233, 210, 1)"],
			["rgba(219, 235, 255, 1)", "rgba(185, 213, 235, 1)"],
			["rgba(216, 218, 255, 1)", "rgba(165, 176, 232, 1)"],
			["rgba(207, 207, 207, 1)", "rgba(199, 196, 201, 1)"]
    ], i = 0; i < colors.length; i++) {
      // for each color combination, determine texture (color), create material
      // and mesh, and add mesh as ground's children
      var texture = new THREE.Texture(
        this.generateLaserBodyCanvas(colors[i][0], colors[i][1]));
      texture.needsUpdate = true;

      var material = new THREE.MeshBasicMaterial({
      	map: texture,
  			opacity: 1,
  			transparent: true
  		});
    	this.materials.push(material);

    	var mesh = new THREE.Mesh(geormetry, material);
			mesh.position.z = .1 * -(i + 1), mesh.name = i;
      mesh.updateMatrix(), mesh.matrixAutoUpdate = false, this.obj.add(mesh)
    }
    // only the first mesh is visible at this time
		for (i = 1; i < this.obj.children.length; i++)
      this.obj.children[i].visible = false;
		this.current = 0;
  }

  /**
   * Creates a 64 * 64 bitmap of gradient colors from color0 to color1
   * (top down).
   * @method
   */
  generateLaserBodyCanvas(color0, color1) {
    // obtain a 64 * 64 bitmap
    var canvas = document.createElement("canvas");
        canvas.width = 64, canvas.height = 64;
    var context2d = canvas.getContext("2d");
        context2d.clearRect(0, 0, canvas.width, canvas.height);
    // grad: color0 (top) -> color1 (bottom)
    var grad = context2d.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, color0), grad.addColorStop(1, color1);
    // fill bitmap with grad
    context2d.fillStyle = grad;
    context2d.fillRect(0, 0, canvas.width, canvas.height);
    return canvas;
  }

  /**
   * Changes ground color from current to next listed above.
   * @method
   */
  changeColor() {
    // wrap around, but should be 7?
		var nxtColorIdx = this.current + 1 > 6 ? 0 : this.current + 1;
    var curColorIdx = this.current;
    // color transition, set old color invisible
    var esta = this;
		ANIM.customAnimation.to(this.materials[curColorIdx], 5, {
			opacity: 0,
			onComplete: function() {
				esta.obj.children[curColorIdx].visible = false
			}
		});
    // set next color visible and gradually switch to new color
    this.obj.children[nxtColorIdx].visible = true
    ANIM.customAnimation.to(this.materials[nxtColorIdx], 4, {
			opacity: 1
		});

    this.current = nxtColorIdx;
  }
}

export default Ground;
