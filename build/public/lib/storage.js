"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
  function Storage() {
    _classCallCheck(this, Storage);
  }

  _createClass(Storage, [{
    key: "getFriendsScore",
    value: function getFriendsScore() {
      // try {
      //   var value = wx.getStorageSync('friends_score') || [];
      //   if (value && value.ts) {
      //     if (value.ts < Date.now()) {
      //       value = [];
      //     } else {
      //       value = value.data;
      //     }
      //   } else {
      //     value = [];
      //   }
      //   // console.log('Storage get getFriendsScore success', value)
      //   return value;
      // } catch (e) {
      //   // console.log('Storage get getFriendsScore fail', e)
      //   return [];
      // }
    }
  }, {
    key: "saveFriendsScore",
    value: function saveFriendsScore(data) {
      // wx.setStorage({
      //   key: 'friends_score',
      //   data: data,
      //   success: function success(res) {
      //     // console.log('Storage save friend score success', data)
      //   },
      //   fail: function fail(err) {
      //     // console.log('Storage save friend score fail', data)
      //   }
      // });
    }
  }, {
    key: "saveMyUserInfo",
    value: function saveMyUserInfo(myUserInfo) {
      // wx.setStorage({
      //   key: 'my_user_info',
      //   data: myUserInfo,
      //   success: function success(res) {
      //     // console.log('Storage save my user info success', res)
      //   },
      //   fail: function fail(err) {
      //     // console.log('Storage save  my user info fail ', err)
      //   }
      // });
    }
  }, {
    key: "saveHeighestScore",
    value: function saveHeighestScore(data) {
      // wx.setStorage({
      //   key: 'my_heighest_score',
      //   data: data,
      //   success: function success(res) {
      //     // console.log('Storage save my heighest score success', data, res)
      //   },
      //   fail: function fail(err) {
      //     // console.log('Storage save  my heighest score fail ', err)
      //   }
      // });
    }
  }, {
    key: "getHeighestScore",
    value: function getHeighestScore() {
      return 0;
      // try {
      //   var value = wx.getStorageSync('my_heighest_score') || false;
      //   // console.log('Storage get Heighest Score success', value)
      //   return value;
      // } catch (e) {
      //   // console.log('Storage get Heighest Score fail', e)
      //   return false;
      // }
    }
  }, {
    key: "getMyUserInfo",
    value: function getMyUserInfo() {
      // try {
      //   var value = wx.getStorageSync('my_user_info') || false;
      //   // console.log('Storage get my user info success', value)
      //   return value;
      // } catch (e) {
      //   // console.log('Storage get my user info fail', e)
      //   return false;
      // }
    }
  }, {
    key: "saveSessionId",
    value: function saveSessionId(sessionId) {
      // wx.setStorage({
      //   key: 'session_id',
      //   data: sessionId,
      //   success: function success(res) {
      //     // console.log('Storage session ID success', res)
      //   },
      //   fail: function fail(err) {
      //     // console.log('Storage save session ID fail ', err)
      //   }
      // });
    }
  }, {
    key: "getSessionId",
    value: function getSessionId(callback) {
      // // wx.getStorage({
      // //   key: 'session_id',
      // //   success: function (res) {
      // //     console.log('Storage get session ID success', res)
      // //     callback(res.data)
      // //   },
      // //   fail: function (err) {
      // //     console.log('Storage get session ID fail', err)
      // //     callback(false)
      // //   }
      // // })
      // try {
      //   var value = wx.getStorageSync('session_id') || '';
      //   // console.log('Storage get sessionid success', value)
      //   return value;
      // } catch (e) {
      //   // console.log('Storage get sessionid fail')
      //   return "";
      // }
    }
  }, {
    key: "clearSessionId",
    value: function clearSessionId() {
      // wx.removeStorage({
      //   key: 'session_id',
      //   success: function success(res) {
      //     // console.log('Storage clear session_id success')
      //   },
      //   fail: function fail(res) {
      //     // console.log('Storage clear session_id fail')
      //   }
      // });
    }
  }, {
    key: "saveServerConfig",
    value: function saveServerConfig(data) {
      // wx.setStorage({
      //   key: 'server_config',
      //   data: data,
      //   success: function success(res) {
      //     // console.log('Storage save ServerConfig success', res)
      //   },
      //   fail: function fail(err) {
      //     // console.log('Storage save ServerConfig fail ', err)
      //   }
      // });
    }
  }, {
    key: "getServerConfig",
    value: function getServerConfig() {
      // try {
      //   var value = wx.getStorageSync('server_config') || 0;
      //   // console.log('Storage get getServerConfig success', value)
      //   return value;
      // } catch (e) {
      //   // console.log('Storage get getServerConfig fail')
      //   return 0;
      // }
    }
  }, {
    key: "getFirstBlood",
    value: function getFirstBlood() {
      return 0;
      // try {
      //   var value = wx.getStorageSync('first_blood') || 0;
      //   // console.log('Storage get first_blood success', value)
      //   return value;
      // } catch (e) {
      //   // console.log('Storage get first_blood fail')
      //   return 0;
      // }
    }
  }, {
    key: "saveFirstBlood",
    value: function saveFirstBlood() {
      // wx.setStorage({
      //   key: 'first_blood',
      //   data: 1,
      //   success: function success(res) {
      //     // console.log('Storage save first_blood success', res)
      //   },
      //   fail: function fail(err) {
      //     // console.log('Storage save first_blood fail', err)
      //   }
      // });
    }
  }, {
    key: "getHistoryTimes",
    value: function getHistoryTimes() {
      // try {
      //   var value = wx.getStorageSync('history_Times2') || false;
      //   // console.log('Storage get history_Times success', value)
      //   return value;
      // } catch (e) {
      //   // console.log('Storage get history_Times fail')
      //   return false;
      // }
    }
  }, {
    key: "saveHistoryTimes",
    value: function saveHistoryTimes(data) {
      // wx.setStorage({
      //   key: 'history_Times2',
      //   data: data,
      //   success: function success(res) {
      //     // console.log('Storage save history_Times success', res)
      //   },
      //   fail: function fail(err) {
      //     // console.log('Storage save history_Times fail', err)
      //   }
      // });
    }
  }, {
    key: "saveActionData",
    value: function saveActionData(data) {
      // wx.setStorage({
      //   key: 'action_data0',
      //   data: data,
      //   success: function success(res) {
      //     console.log('Storage save actionData0 success', res);
      //   },
      //   fail: function fail(err) {
      //     console.log('Storage save actionData0 fail', err);
      //   }
      // });
    }
  }, {
    key: "getActionData",
    value: function getActionData() {
      // try {
      //   var value = wx.getStorageSync('action_data0') || false;
      //   // console.log('Storage get history_Times success', value)
      //   return value;
      // } catch (e) {
      //   // console.log('Storage get history_Times fail')
      //   return false;
      // }
    }
  }, {
    key: "saveWeekBestScore",
    value: function saveWeekBestScore(data) {
      // wx.setStorage({
      //   key: 'weeek_best_score0',
      //   data: data,
      //   success: function success(res) {
      //     // console.log('Storage save weeek_best_score0 success', res)
      //   },
      //   fail: function fail(err) {
      //     // console.log('Storage save weeek_best_score0 fail', err)
      //   }
      // });
    }
  }, {
    key: "getWeekBestScore",
    value: function getWeekBestScore() {
      // try {
      //   var value = wx.getStorageSync('weeek_best_score0') || 0;
      //   if (value && value.ts) {
      //     if (value.ts < Date.now()) {
      //       value = 0;
      //     } else {
      //       value = value.data;
      //     }
      //   }
      //   console.log('Storage get weeek_best_score0 success', value);
      //   return value;
      // } catch (e) {
      //   // console.log('Storage get history_Times fail')
      //   return 0;
      // }
    }
  }]);

  return Storage;
}();

exports.default = { Storage: Storage };