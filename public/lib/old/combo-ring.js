/**
 * module[28]
 * The ring (or wave or whatever) that appears when combo.
 * @file
 */

 import * as THREE from "three";
 import { WAVE } from "./resource";

 /**
  * Combo ring. Appears and then disappears around bottle after combo.
  * @constructor
  */
 class ComboRing {
   /**
    * Constructs a combo ring.
    * @constructor
    */
   constructor() {
     // geormetry and material
     var ring = new THREE.RingGeometry(
       WAVE.innerRadius, WAVE.outerRadius, WAVE.thetaSeg);
     var material = new r.MeshBasicMaterial({
				color: RES.COLORS.pureWhite,
				transparent: true
			});

     this.obj = new THREE.Mesh(ring, material);
     // horizontal
     this.obj.rotation.x = -Math.PI / 2;
     this.obj.name = "wave";
   }

   /**
    * Resets the ring to initial status. Called after combo.
    * @method
    */
   reset() {
     this.obj.scale.set(1, 1, 1);
     this.obj.material.opacity = 1;
     this.obj.visible = false;
   }
 }

export default ComboRing;
