class Storage {
  constructor() {
  }
  getFriendsScore() {
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
  saveFriendsScore(data) {
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
  saveMyUserInfo(myUserInfo) {
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
  saveHeighestScore(data) {
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
  getHeighestScore() {
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
  getMyUserInfo() {
    // try {
    //   var value = wx.getStorageSync('my_user_info') || false;
    //   // console.log('Storage get my user info success', value)
    //   return value;
    // } catch (e) {
    //   // console.log('Storage get my user info fail', e)
    //   return false;
    // }
  }
  saveSessionId(sessionId) {
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
  getSessionId(callback) {
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
  clearSessionId() {
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
  saveServerConfig(data) {
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
  getServerConfig() {
    // try {
    //   var value = wx.getStorageSync('server_config') || 0;
    //   // console.log('Storage get getServerConfig success', value)
    //   return value;
    // } catch (e) {
    //   // console.log('Storage get getServerConfig fail')
    //   return 0;
    // }
  }
  getFirstBlood() {
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
  saveFirstBlood() {
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
  getHistoryTimes() {
    // try {
    //   var value = wx.getStorageSync('history_Times2') || false;
    //   // console.log('Storage get history_Times success', value)
    //   return value;
    // } catch (e) {
    //   // console.log('Storage get history_Times fail')
    //   return false;
    // }
  }
  saveHistoryTimes(data) {
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
  saveActionData(data) {
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
  getActionData() {
    // try {
    //   var value = wx.getStorageSync('action_data0') || false;
    //   // console.log('Storage get history_Times success', value)
    //   return value;
    // } catch (e) {
    //   // console.log('Storage get history_Times fail')
    //   return false;
    // }
  }
  saveWeekBestScore(data) {
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
  getWeekBestScore() {
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
}

export default { Storage };
