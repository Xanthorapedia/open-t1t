/**
 * module[4]
 * @file
 * Audio manager class
 */

import * as RES from "./config.js";
// var check = void 0;
/**
 * Responsible for playing audio.
 * @class
 */
class AudioManager {
  /**
   * Constructs a audio manager.
   * @constructor
   */
  constructor(game) {
    // check = this;
    this.game = game;
    this.musicPool = Object.keys(RES.AUDIO);
    var AudioContext = window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // yes, they mean the same thing :)
    var esta = this;
    // creates audio source for each piece of sound
    this.musicPool.forEach(function(name) {
      // but no "this" anymore in this callback
      esta[name] = createInnerAudioContext(AudioContext ? new AudioContext() : null, RES.AUDIO[name]);
		})

    // set specific proerties
    this.scale_loop.loop = true;
    this.store.onPlay(function() {
  		this.store.before && this.store.before();
  	});
    this.store.onEnded(function() {
  		this.store.after && this.store.after();
      this.timer = setTimeout(function() {
  			this.store.seek(0), this.store.play()
  		}, 3e3);
  	});
    this.sing.onEnded(function() {
  		this.timer = setTimeout(function() {
  			this.sing.seek(0), this.sing.play()
  		}, 3e3);
  	});
    this.water.onEnded(function() {
  		this.timer = setTimeout(function() {
  			this.water.seek(0), this.water.play()
  		}, 3e3);
  	});
    this.scale_intro.onEnded(function() {
  		"prepare" == this.game.bottle.status && this.scale_loop.play()
  	});
  }

  /**
   * Stops every playing audio.
   * @function
   */
  resetAudio() {
    this.musicPool.forEach(function(audio) {
			this[audio].stop();
		})
  }

  /**
   * Sets what to play "before" and "after" this audio
   * @function
   */
  register(audio, before, after) {
    this[audio].before = before, this[t].after = after;
  }

  /**
   * Destroys timer
   * @function
   */
  clearTimer(before, after) {
    this.timer && (clearTimeout(this.timer), this.timer = null)
  }

  /**
   * Stops playing immediately and play again
   * @function
   */
  replay(audio) {
    var au = this[audio];
		au ? (au.stop(), au.play()) : console.warn("there is no music", audio)
  }
}

function createInnerAudioContext(context, audioURL) {
  // creates an extendable audio source "thing"
  var src = {
    _buffer: null,
    begin: 0,                     // where to start playing
    onended: null,                // what happens right before playing?
    onplay: null,                 // and right after?
    seek: function(where) {       // sets start
      src.begin = where;
    },
    play: function() {            // play!
      if (!context)
        return;
      src = Object.assign(context.createBufferSource(), src);
      src.buffer = src._buffer;
      src.connect(context.destination);
      src.onplay && src.onplay();
      src.start(src.begin);
    },
    stop: function() {            // stop!
      src._proto_.stop();
    },
    onPlay:  function(handler) {  // setters
      src.onplay  = handler;
    },
    onEnded: function(handler) {
      src.onended = handler;
    },
  }
  if (!context)
    return src;
  // requests audio file from url
  var request = new XMLHttpRequest();
  request.open("GET", audioURL, true);
  request.responseType = 'arraybuffer';
  // takes the audio from http request and decode it in an audio buffer
  request.onload = function(){
    // decodes array buffered mp3 file and connect the buffered source to the
    // output (context.destination)
    context.decodeAudioData(request.response, function(buffer) {
      src = Object.assign(context.createBufferSource(), src);
      // src is now also a BuffereSourceNode
      src._buffer = src.buffer = buffer;
      src.loop = false;
      src.connect(context.destination);
      // console.log(check)
      // check.combo2.play()
    }, function(e) {
      console.log('Error decoding file', e);
    });
  };
  request.send();

  return src;
};

export default AudioManager;
