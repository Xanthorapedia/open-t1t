var _storage = __webpack_require__(5);

var _storage2 = _interopRequireDefault(_storage);

var _session = __webpack_require__(6);

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

class GameModel {
  constructor(game) {
    this.game = game;
    this.mode = '';
    this.stage = '';
    this.is_from_wn = 0;
    this.firstBlood = false;
    this.currentScore = 0;
    this.highestScore = 0;
    this.observeInfo = {};
    this.friendsScore = [];
    this.weekBestScore = 0;
    this.startTime = Math.floor(Date.now() / 1000);
  }

  _createClass(GameModel, [{
    key: 'setMode',
    value: function setMode(mode) {
      this.mode = mode;
      this.game.mode = mode;
    }
  }, {
    key: 'setStage',
    value: function setStage(stage) {
      this.stage = stage;
      this.game.stage = stage;
    }
  }, {
    key: 'init',
    value: function init() {
      _session2.default.init();

      var fb = _storage2.default.getFirstBlood();
      if (!fb) {
        this.setFirstBlood(true);
        _storage2.default.saveFirstBlood();
      }

      this.highestScore = _storage2.default.getHeighestScore() || 0;
      _session2.default.setServerConfig(_storage2.default.getServerConfig());

      this.weekBestScore = _storage2.default.getWeekBestScore() || 0;
      this.friendsScore = _storage2.default.getFriendsScore();
    }
  }, {
    key: 'getServerConfig',
    value: function getServerConfig() {
      return _session2.default.serverConfig;
    }
  }, {
    key: 'setIsFromWn',
    value: function setIsFromWn(number) {
      this.is_from_wn = number;
      this.game.is_from_wn = number;
    }
  }, {
    key: 'setFirstBlood',
    value: function setFirstBlood(bool) {
      this.firstBlood = bool;
      this.game.firstBlood = bool;
    }
  }, {
    key: 'getMode',
    value: function getMode() {
      return this.mode;
    }
  }, {
    key: 'setScore',
    value: function setScore(score) {
      this.currentScore = score;
      // if (score > this.highestScore) {
      //   this.saveHeighestScore(score)
      // }
    }
  }, {
    key: 'saveHeighestScore',
    value: function saveHeighestScore(score) {
      var verifyData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (verifyData) {
        var expire = this.getNextSunday();
        var vData = {
          ts: expire,
          data: verifyData
        };
      } else {
        var vData = '';
      }

      _storage2.default.saveHeighestScore(score);
      _storage2.default.saveActionData(vData);
      this.highestScore = score;
    }
  }, {
    key: 'saveWeekBestScore',
    value: function saveWeekBestScore() {
      var score = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var data = {
        ts: this.getNextSunday(),
        data: score
      };
      _storage2.default.saveWeekBestScore(data);
    }
  }, {
    key: 'getActionData',
    value: function getActionData() {
      return _storage2.default.getActionData();
    }
  }, {
    key: 'getHighestScore',
    value: function getHighestScore() {
      return this.highestScore;
    }
  }, {
    key: 'saveFriendsScore',
    value: function saveFriendsScore(data) {
      this.friendsScore = data;
      var formatData = {
        ts: this.getNextSunday(),
        data: data
      };
      _storage2.default.saveFriendsScore(formatData);
    }
  }, {
    key: 'getSessionId',
    value: function getSessionId() {
      return _session2.default.sessionId;
    }
  }, {
    key: 'getPkId',
    value: function getPkId() {
      return _session2.default.pkId;
    }
  }, {
    key: 'clearPkId',
    value: function clearPkId() {
      _session2.default.clearPkId();
    }
  }, {
    key: 'setShareTicket',
    value: function setShareTicket(rawData) {
      _session2.default.setShareTicket(rawData);
    }
  }, {
    key: 'getShareTicket',
    value: function getShareTicket() {
      return _session2.default.shareTicket;
    }
  }, {
    key: 'clearShareTicket',
    value: function clearShareTicket() {
      _session2.default.clearShareTicket();
    }
  }, {
    key: 'setGameId',
    value: function setGameId(id) {
      _session2.default.setGameId(id);
    }
  }, {
    key: 'setGameTicket',
    value: function setGameTicket(ticket) {
      _session2.default.setGameTicket(ticket);
    }
  }, {
    key: 'clearGameId',
    value: function clearGameId() {
      _session2.default.clearGameId();
    }
  }, {
    key: 'clearGameTicket',
    value: function clearGameTicket() {
      _session2.default.clearGameTicket();
    }
  }, {
    key: 'setObserveInfo',
    value: function setObserveInfo(opt) {
      this.observeInfo.headimg = opt.headimg;
      this.observeInfo.nickName = opt.nickName;
    }
  }, {
    key: 'clearObserveInfo',
    value: function clearObserveInfo() {
      this.observeInfo.headimg = null;
      this.observeInfo.nickName = null;
    }
  }, {
    key: 'getNextSunday',
    value: function getNextSunday() {
      var now = new Date();
      var day = now.getDay();
      now.setHours(0, 0, 0, 0);
      var expire = now.valueOf() + (8 - day) % 7 * 24 * 60 * 60 * 1000;
      return expire;
    }
}

exports.default = GameModel;

/***/ 