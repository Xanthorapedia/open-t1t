/**
 * module[2]
 * Resources: colors, shapes, audio, etc.
 */
import * as THREE from "three";

const COLORS = {
	red: 13387325,
	pureRed: 16711680,
	white: 14209233,
	brown: 5845806,
	pink: 15964855,
	brownDark: 2300175,
	blue: 40951,
	yellow: 16760320,
	pureWhite: 16777215,
	orange: 16231020,
	orangeDark: 16747520,
	black: 0,
	cream: 16119285,
	green: 2924391,
	lightBlue: 13758190,
	cyan: 9692366,
	yellowBrown: 16764811,
	purple: 9083606
},
BOTTLE = {
	headRadius: .945,
	bodyWidth: 2.34,
	bodyDepth: 2.34,
	bodyHeight: 3.2,
	reduction: .005,
	minScale: .5,
	velocityYIncrement: 15,
	velocityY: 135,
	velocityZIncrement: 70
},
PARTICLE = {
		radius: .3,
		detail: 2
},
GAME = {
	BOTTOMBOUND: -55,
	TOPBOUND: 41,
	gravity: 720,
	touchmoveTolerance: 20,
	LEFTBOUND: -140,
	topTrackZ: -30,
	rightBound: 90,
	HEIGHT: window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth,
	WIDTH:	window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth,
	canShadow: true
},
WAVE = {
	innerRadius: 2.2,
	outerRadius: 3,
	thetaSeg: 25
};

const CAMERA = {
	fov: 60
},
AUDIO = {
	success: "./res/success.mp3",
	perfect: "./res/perfect.mp3",
	scale_loop: "./res/scale_loop.mp3",
	scale_intro: "./res/scale_intro.mp3",
	restart: "./res/start.mp3",
	fall: "./res/fall.mp3",
	fall_2: "./res/fall_2.mp3",
	combo1: "./res/combo1.mp3",
	combo2: "./res/combo2.mp3",
	combo3: "./res/combo3.mp3",
	combo4: "./res/combo4.mp3",
	combo5: "./res/combo5.mp3",
	combo6: "./res/combo6.mp3",
	combo7: "./res/combo7.mp3",
	combo8: "./res/combo8.mp3",
	icon: "./res/icon.mp3",
	pop: "./res/pop.mp3",
	sing: "./res/sing.mp3",
	store: "./res/store.mp3",
	water: "./res/water.mp3"
},
BLOCK = {
	radius: 5,
	width: 10,
	minRadiusScale: .8,
	maxRadiusScale: 1,
	height: 5.5,
	radiusSegments: [4, 50],
	floatHeight: 0,
	minDistance: 1,
	maxDistance: 17,
	minScale: BOTTLE.minScale,
	reduction: BOTTLE.reduction,
	moveDownVelocity: .07,
	fullHeight: 5.5 / 21 * 40
};

const FRUSTUMSIZE = window.innerHeight / window.innerWidth / 736 * 414 * 60;
const loader = new THREE.TextureLoader;
const cylinder_shadow = new THREE.MeshBasicMaterial({
	map: loader.load("./res/cylinder_shadow.png"),
	transparent: true,
	alphaTest: .01
}), desk_shadow = new THREE.MeshBasicMaterial({
	map: loader.load("./res/desk_shadow.png"),
	transparent: true,
	alphaTest: .01
}), shadow = new THREE.MeshBasicMaterial({
	map: loader.load("./res/shadow.png"),
	transparent: true,
	alphaTest: .01
}), grayMaterial = new THREE.MeshLambertMaterial({
	map: loader.load("./res/gray.png")
}), numberMaterial = new THREE.MeshLambertMaterial({
	map: loader.load("./res/number.png"),
	alphaTest: .6
})
const REPORTERTIMEOUT = 60001

export { COLORS, BOTTLE, PARTICLE, GAME, WAVE, CAMERA, AUDIO, BLOCK, FRUSTUMSIZE,
	cylinder_shadow, desk_shadow, shadow, grayMaterial, numberMaterial
};
