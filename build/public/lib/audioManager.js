"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * module[4]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Audio manager class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _config = require("./config.js");

var RES = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// var check = void 0;
/**
 * Responsible for playing audio.
 * @class
 */
var AudioManager = function () {
  /**
   * Constructs a audio manager.
   * @constructor
   */
  function AudioManager(game) {
    _classCallCheck(this, AudioManager);

    // check = this;
    this.game = game;
    this.musicPool = Object.keys(RES.AUDIO);
    var AudioContext = window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // yes, they mean the same thing :)
    var esta = this;
    // creates audio source for each piece of sound
    this.musicPool.forEach(function (name) {
      // but no "this" anymore in this callback
      esta[name] = createInnerAudioContext(AudioContext ? new AudioContext() : null, RES.AUDIO[name]);
    });

    // set specific proerties
    this.scale_loop.loop = true;
    this.store.onPlay(function () {
      this.store.before && this.store.before();
    });
    this.store.onEnded(function () {
      this.store.after && this.store.after();
      this.timer = setTimeout(function () {
        this.store.seek(0), this.store.play();
      }, 3e3);
    });
    this.sing.onEnded(function () {
      this.timer = setTimeout(function () {
        this.sing.seek(0), this.sing.play();
      }, 3e3);
    });
    this.water.onEnded(function () {
      this.timer = setTimeout(function () {
        this.water.seek(0), this.water.play();
      }, 3e3);
    });
    this.scale_intro.onEnded(function () {
      "prepare" == this.game.bottle.status && this.scale_loop.play();
    });
  }

  /**
   * Stops every playing audio.
   * @function
   */


  _createClass(AudioManager, [{
    key: "resetAudio",
    value: function resetAudio() {
      this.musicPool.forEach(function (audio) {
        this[audio].stop();
      });
    }

    /**
     * Sets what to play "before" and "after" this audio
     * @function
     */

  }, {
    key: "register",
    value: function register(audio, before, after) {
      this[audio].before = before, this[t].after = after;
    }

    /**
     * Destroys timer
     * @function
     */

  }, {
    key: "clearTimer",
    value: function clearTimer(before, after) {
      this.timer && (clearTimeout(this.timer), this.timer = null);
    }

    /**
     * Stops playing immediately and play again
     * @function
     */

  }, {
    key: "replay",
    value: function replay(audio) {
      var au = this[audio];
      au ? (au.stop(), au.play()) : console.warn("there is no music", audio);
    }
  }]);

  return AudioManager;
}();

function createInnerAudioContext(context, audioURL) {
  // creates an extendable audio source "thing"
  var src = {
    _buffer: null,
    begin: 0, // where to start playing
    onended: null, // what happens right before playing?
    onplay: null, // and right after?
    seek: function seek(where) {
      // sets start
      src.begin = where;
    },
    play: function play() {
      // play!
      if (!context) return;
      src = Object.assign(context.createBufferSource(), src);
      src.buffer = src._buffer;
      src.connect(context.destination);
      src.onplay && src.onplay();
      src.start(src.begin);
    },
    stop: function stop() {
      // stop!
      src._proto_.stop();
    },
    onPlay: function onPlay(handler) {
      // setters
      src.onplay = handler;
    },
    onEnded: function onEnded(handler) {
      src.onended = handler;
    }
  };
  if (!context) return src;
  // requests audio file from url
  var request = new XMLHttpRequest();
  request.open("GET", audioURL, true);
  request.responseType = 'arraybuffer';
  // takes the audio from http request and decode it in an audio buffer
  request.onload = function () {
    // decodes array buffered mp3 file and connect the buffered source to the
    // output (context.destination)
    context.decodeAudioData(request.response, function (buffer) {
      src = Object.assign(context.createBufferSource(), src);
      // src is now also a BuffereSourceNode
      src._buffer = src.buffer = buffer;
      src.loop = false;
      src.connect(context.destination);
      // console.log(check)
      // check.combo2.play()
    }, function (e) {
      console.log('Error decoding file', e);
    });
  };
  request.send();

  return src;
};

exports.default = AudioManager;