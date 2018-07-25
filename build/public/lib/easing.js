"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * module[41]
 * Easing functions lifted from module[41].
 * Because no EXACTLY same lib (AFAIK) are there online.
 * A similar one: http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js
 * @file
 */

var Easing = {
	Linear: function Linear(t, e, i, n) {
		return i * t / n + e;
	},
	Quad: {
		easeIn: function easeIn(t, e, i, n) {
			return i * (t /= n) * t + e;
		},
		easeOut: function easeOut(t, e, i, n) {
			return -i * (t /= n) * (t - 2) + e;
		},
		easeInOut: function easeInOut(t, e, i, n) {
			return (t /= n / 2) < 1 ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e;
		}
	},
	Cubic: {
		easeIn: function easeIn(t, e, i, n) {
			return i * (t /= n) * t * t + e;
		},
		easeOut: function easeOut(t, e, i, n) {
			return i * ((t = t / n - 1) * t * t + 1) + e;
		},
		easeInOut: function easeInOut(t, e, i, n) {
			return (t /= n / 2) < 1 ? i / 2 * t * t * t + e : i / 2 * ((t -= 2) * t * t + 2) + e;
		}
	},
	Quart: {
		easeIn: function easeIn(t, e, i, n) {
			return i * (t /= n) * t * t * t + e;
		},
		easeOut: function easeOut(t, e, i, n) {
			return -i * ((t = t / n - 1) * t * t * t - 1) + e;
		},
		easeInOut: function easeInOut(t, e, i, n) {
			return (t /= n / 2) < 1 ? i / 2 * t * t * t * t + e : -i / 2 * ((t -= 2) * t * t * t - 2) + e;
		}
	},
	Quint: {
		easeIn: function easeIn(t, e, i, n) {
			return i * (t /= n) * t * t * t * t + e;
		},
		easeOut: function easeOut(t, e, i, n) {
			return i * ((t = t / n - 1) * t * t * t * t + 1) + e;
		},
		easeInOut: function easeInOut(t, e, i, n) {
			return (t /= n / 2) < 1 ? i / 2 * t * t * t * t * t + e : i / 2 * ((t -= 2) * t * t * t * t + 2) + e;
		}
	},
	Sine: {
		easeIn: function easeIn(t, e, i, n) {
			return -i * Math.cos(t / n * (Math.PI / 2)) + i + e;
		},
		easeOut: function easeOut(t, e, i, n) {
			return i * Math.sin(t / n * (Math.PI / 2)) + e;
		},
		easeInOut: function easeInOut(t, e, i, n) {
			return -i / 2 * (Math.cos(Math.PI * t / n) - 1) + e;
		}
	},
	Expo: {
		easeIn: function easeIn(t, e, i, n) {
			return 0 == t ? e : i * Math.pow(2, 10 * (t / n - 1)) + e;
		},
		easeOut: function easeOut(t, e, i, n) {
			return t == n ? e + i : i * (1 - Math.pow(2, -10 * t / n)) + e;
		},
		easeInOut: function easeInOut(t, e, i, n) {
			return 0 == t ? e : t == n ? e + i : (t /= n / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + e : i / 2 * (2 - Math.pow(2, -10 * --t)) + e;
		}
	},
	Circ: {
		easeIn: function easeIn(t, e, i, n) {
			return -i * (Math.sqrt(1 - (t /= n) * t) - 1) + e;
		},
		easeOut: function easeOut(t, e, i, n) {
			return i * Math.sqrt(1 - (t = t / n - 1) * t) + e;
		},
		easeInOut: function easeInOut(t, e, i, n) {
			return (t /= n / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + e : i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + e;
		}
	},
	Elastic: {
		easeIn: function easeIn(t, e, i, n, r, a) {
			var o;
			return 0 == t ? e : 1 == (t /= n) ? e + i : (void 0 === a && (a = .3 * n), !r || r < Math.abs(i) ? (o = a / 4, r = i) : o = a / (2 * Math.PI) * Math.asin(i / r), -r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * n - o) * (2 * Math.PI) / a) + e);
		},
		easeOut: function easeOut(t, e, i, n, r, a) {
			var o;
			return 0 == t ? e : 1 == (t /= n) ? e + i : (void 0 === a && (a = .3 * n), !r || r < Math.abs(i) ? (r = i, o = a / 4) : o = a / (2 * Math.PI) * Math.asin(i / r), r * Math.pow(2, -10 * t) * Math.sin((t * n - o) * (2 * Math.PI) / a) + i + e);
		},
		easeInOut: function easeInOut(t, e, i, n, r, a) {
			var o;
			return 0 == t ? e : 2 == (t /= n / 2) ? e + i : (void 0 === a && (a = n * (.3 * 1.5)), !r || r < Math.abs(i) ? (r = i, o = a / 4) : o = a / (2 * Math.PI) * Math.asin(i / r), t < 1 ? r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * n - o) * (2 * Math.PI) / a) * -.5 + e : r * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * n - o) * (2 * Math.PI) / a) * .5 + i + e);
		}
	},
	Back: {
		easeIn: function easeIn(t, e, i, n, r) {
			return void 0 === r && (r = 1.70158), i * (t /= n) * t * ((r + 1) * t - r) + e;
		},
		easeOut: function easeOut(t, e, i, n, r) {
			return void 0 === r && (r = 1.70158), i * ((t = t / n - 1) * t * ((r + 1) * t + r) + 1) + e;
		},
		easeInOut: function easeInOut(t, e, i, n, r) {
			return void 0 === r && (r = 1.70158), (t /= n / 2) < 1 ? i / 2 * (t * t * ((1 + (r *= 1.525)) * t - r)) + e : i / 2 * ((t -= 2) * t * ((1 + (r *= 1.525)) * t + r) + 2) + e;
		}
	},
	Bounce: {
		easeIn: function easeIn(t, e, i, r) {
			return i - n.Bounce.easeOut(r - t, 0, i, r) + e;
		},
		easeOut: function easeOut(t, e, i, n) {
			return (t /= n) < 1 / 2.75 ? i * (7.5625 * t * t) + e : t < 2 / 2.75 ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : t < 2.5 / 2.75 ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e;
		},
		easeInOut: function easeInOut(t, e, i, r) {
			return t < r / 2 ? .5 * n.Bounce.easeIn(2 * t, 0, i, r) + e : .5 * n.Bounce.easeOut(2 * t - r, 0, i, r) + .5 * i + e;
		}
	}
};

exports.default = Easing;