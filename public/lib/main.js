import * as THREE from "three";
import * as RES from "./resource";

import Ground from "./ground"
import AudioManager from "./audio-manager"
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
    // waves
    this.waves = [];
    // for (a = 0; a < 4; ++a) {
		// 					var n = new l.default;
		// 					this.waves.push(n), n.obj.visible = !1, this.scene.add(n.obj)
		// 				}
    // combo rings
    var comboRingMaterial = new THREE.MeshBasicMaterial({
			color: RES.COLORS.cream
		});
  }
}

export default Game;
