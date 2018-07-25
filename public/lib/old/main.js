/**
 * module[39]
 */

import * as THREE from "three";
import * as RES from "./resource";

import Ground from "./ground";
import AudioManager from "./audio-manager";
import ComboRing from "./combo-ring";
var a = 0;
class Game {
  constructor(options) {
    this.options = options;
    this.is_from_wn = 0;
    this.firstInit = true;
    this.distance = 0;
    this.heightestScore = 0;
    this.stage = "";
    this.succeedTime = 0;
    this.lastAddBonus = -2;
    this.lastStage = "";
    this.deadTimeout = null;
    this.currentScore = 0;
    this.seq = 0;
    this.thirdBlock = null;
    // this.straight = true;
    this.firstBlood = false;
    this.lastHardLevel = 200;
    this.guider = false;
    this.hardDistances = [];
    this.duration = [];
    this.quickArr = [];
    // this.socketFirstSync = !1
    this.init();
    this.randomSeed = Date.now();
    // TODO (0, A.setRandomSeed)(this.randomSeed);
    this.actionList = [];
    this.musicList = [];
    this.touchList = [];
    this.blocks = [];
    this.liveTime = 0;
    // wx.setKeepScreenOn && wx.setKeepScreenOn({
		// 	keepScreenOn: !0
		// })
  }

  init() {
    // this.gameCtrl = new C.default(this);
    // this.gameView = new P.default(this);
    // this.gameModel = new k.default(this)
    // this.instructionCtrl = new L.default(this);
    // this.historyTimes = new S.default(this), this.reporter = new E.default,
    this.audioManager = new AudioManager(this);
    this.scene = new THREE.Scene();

    // camera settings
    var FRUSTUMSIZE = RES.FRUSTUMSIZE,
		    SCR_RATIO   = RES.GAME.HEIGHT / RES.GAME.WIDTH,
        FS_PROD = FRUSTUMSIZE * SCR_RATIO;
    this.camera = new THREE.OrthographicCamera(
      FS_PROD / -2, FS_PROD / 2, FRUSTUMSIZE / 2, FRUSTUMSIZE / -2, -10, 85);
    this.camera.position.set(-17, 30, 26);
    this.camera.lookAt(new THREE.Vector3(13, 0, -4));
    this.scene.add(this.camera);

    // renderer settings
    this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			canvas: document.getElementById("fakeScreen"),
			preserveDrawingBuffer: true
		}),
    window.renderer = this.renderer;
    this.blocksPool = [];
    this.blocksInUse = [];
    this.doubleHit = 0;
    // OMITTED: screen ratio selection based on device
    this.renderer.setPixelRatio(1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(RES.GAME.WIDTH, RES.GAME.HEIGHT);
    this.renderer.localClippingEnabled = true;

    /*** add basic objects ***/
    // ground
    this.ground = new Ground();
    this.ground.obj.position.z = -84;
    this.camera.add(this.ground.obj)
    // combo rings
    this.waves = [];
    for (var i = 0; i < 4; i++) {
		    var ring = new ComboRing();
				this.waves.push(ring);
        ring.obj.visible = false;
        this.scene.add(ring.obj);
		}
    var comboRingMaterial = new THREE.MeshBasicMaterial({
			color: RES.COLORS.cream
		});
    this.combo = new THREE.Mesh(
      new THREE.CircleGeometry(.6, 40), comboRingMaterial
    );
    this.combo.name = "combo";
    this.combo.position.x = -50;
    this.combo.rotation.x = -Math.PI / 2;
    this.scene.add(this.combo);
    if (this.renderer.shadowMap.enabled) {
      this.shadowTarget = new THREE.Mesh(
        new THREE.PlaneGeometry(.1, .1), comboRingMaterial
      );
      this.shadowTarget.visible = false;
      this.shadowTarget.name = "shadowTarget";
      this.scene.add(this.shadowTarget);
    }
    // // blocks
    // this.currentBlock = new s.default(0);
    // this.initNextBlock = this.nextBlock = new s.default(1);
    // this.nextBlock.obj.position.x = 20;
    // // "i"
    // this.bottle = new u.default;
    // this.bottle.obj.position.set(-10, -RES.BLOCK.height / 2, 0);
    // this.scene.add(this.bottle.obj);
    // // tutorial setup
    // if (this.guider) {
    //   this.bottle.obj.position.set(-11, 50, 0);
    //   this.camera.position.x -= 19;
    //   setTimeout(function() {
  	// 		t.bottle.showup();
    //   }, 800);
    // }
  }
}

export default Game;
