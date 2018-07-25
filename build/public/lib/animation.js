"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setSkipAnim = exports.TweenAnimation = exports.customAnimation = undefined;

var _easing = require("./easing");

var _easing2 = _interopRequireDefault(_easing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var skipAnim = false; /**
                       * module[3]
                       * Handles (mainly registers) animation (gradual change in value w.r.t time).
                       * @file
                       */

function setSkipAnim(value) {
	skipAnim = value;
}

// number of animations ever requeted
var nRequestedAnim = -1;
// and the lowerbound (exclusive) of valid animation IDs
var minValidID = nRequestedAnim - 1;

/**
 * Sets up an animation.
 * Calls "callback" before each repaint with value in ["from", "to"] obtained
 * from easing "method" during next "duration (default 300)" frames.
 * @function
 */
function TweenAnimation(from, to, duration, method, callback) {
	// current animation ID
	var animID = ++nRequestedAnim;
	var isFunction = function isFunction(t) {
		return "function" == typeof t;
	};
	var isNumber = function isNumber(t) {
		return "number" == typeof t;
	};
	var isString = function isString(t) {
		return "string" == typeof t;
	};
	// strip units (ms/s) in string and/or retrn integer value
	var pareseTime = function pareseTime(t) {
		if (isNumber(t)) return t;
		if (isString(t)) {
			if (/\d+m?s$/.test(t)) return (/ms/.test(t) ? 1 * t.replace("ms", "") : 1e3 * t.replace("s", "")
			);
			if (/^\d+$/.test(t)) return +t;
		}
		return -1;
	};

	if (!isNumber(from) || !isNumber(to)) return window.console && console.error("from和to两个参数必须且为数值"), 0;

	if (!_easing2.default) return window.console && console.error("缓动算法函数缺失"), 0;

	// just jump to final status
	if (skipAnim) {
		isFunction(method) && method(to, true);
		isFunction(callback) && callback(to, true);
		return;
	}

	var animation = {
		duration: 300,
		easing: "Linear",
		callback: function callback(newVal, isComplete) {} // gets called before each repaint
	};
	// sets different types of animation parameters
	function setAnimParam(param) {
		isFunction(param) ? animation.callback = param : pareseTime(param) != -1 ? animation.duration = pareseTime(param) : isString(param) && (animation.easing = param);
	};
	setAnimParam(duration), setAnimParam(method), setAnimParam(callback);
	// if no requestAnimationFrame, setup a 60 fps timer
	window.requestAnimationFrame || (requestAnimationFrame = function requestAnimationFrame(handler) {
		setTimeout(handler, 17);
	});

	// where are we in this duration? (frameInDuration should be <= duration)
	var frameInDuration = -1;
	// frames per duration
	var fpd = Math.ceil(animation.duration / 17);
	// capitalize first character
	animation.easing = animation.easing.slice(0, 1).toUpperCase() + animation.easing.slice(1);
	// contraction of tween and easing
	var tweasing,
	    tweasingName = animation.easing.split(".");
	// if name has only 1 part (e.g. Linear), get that function
	// else see if the category (e.g. Quadratic) exists
	// if it does, assign the required function (e.g. Quartic.In) and test if it
	// is a valid function
	if (tweasingName.length == 1 ? tweasing = _easing2.default[tweasingName[0]] : tweasingName.length == 2 && (tweasing = _easing2.default[tweasingName[0]] && _easing2.default[tweasingName[0]][tweasingName[1]]), isFunction(tweasing) != 0) {
		var animStart = Date.now(),
		    lastframe = Date.now();
		/**
   * The frame update function that gets called before each repaint.
   * Calls the update callback and requests next frame.
   * @callback
   */
		!function fUpdateFrame() {
			var now = Date.now(),
			    msSinceLastFrame = now - lastframe,
			    fps = Math.ceil(1e3 / msSinceLastFrame);
			if (lastframe = now, msSinceLastFrame > 100) requestAnimationFrame(fUpdateFrame);else {
				// if animation is smooth, go to next frame
				if (fps >= 30) frameInDuration++;else {
					// no? recalculate where we are but don't look back
					var expectedFID = Math.floor((now - animStart) / 17);
					frameInDuration = expectedFID > frameInDuration ? expectedFID : frameInDuration + 1;
				}
				// (current, value_offset, value_amplitude, duration)
				var val = tweasing(frameInDuration, from, to - from, fpd);
				// request animation frame on calculated value before completion
				// and final ("to") value on completion
				// if animatio is obsolete, skip
				frameInDuration <= fpd && animID > minValidID ? (animation.callback(val), requestAnimationFrame(fUpdateFrame)) : frameInDuration > fpd && animID > minValidID && animation.callback(to, true);
			}
		}();
	} else console.error('没有找到名为"' + animation.easing + '"的动画算法');
};

/**
 * Invalidates all current animations.
 * @function
 */
TweenAnimation.killAll = function () {
	// see ~15 lines above
	minValidID = nRequestedAnim;
};

var customAnimation = {};

/**
 * A wrapper of TweenAnimation that changes properties in "toChange" value to
 * those listed in "changeTo" in "duration" seconds.
 * @function
 */
customAnimation.to = function (toChange, duration, changeTo) {
	duration *= 1e3;
	var tDelay = changeTo.delay || 0;
	// if has delay property, update
	// if has ease or onComplete property, set that property
	// if is other properties, register TweenAnimation
	for (var prop in changeTo) {
		// directly sets to final status
		if (skipAnim) {
			if (prop !== "delay" && prop !== "onComplete" && prop !== "ease") toChange[prop] = changeTo[prop];
			changeTo.onComplete && changeTo.onComplete();
			continue;
		}
		"delay" === prop ? tDelay = changeTo[prop] : "onComplete" === prop || "ease" === prop || setTimeout(function (prop) {
			// this anonymous (register) function is called after tDelay seconds
			return function () {
				// gradually changes value of this property
				TweenAnimation(toChange[prop], changeTo[prop], duration, changeTo.ease || "Linear", function (newVal, isComplete) {
					toChange[prop] = newVal;
					isComplete && changeTo.onComplete && changeTo.onComplete();
				});
			};
		}(prop), 1e3 * tDelay);
	}
};

exports.customAnimation = customAnimation;
exports.TweenAnimation = TweenAnimation;
exports.setSkipAnim = setSkipAnim;