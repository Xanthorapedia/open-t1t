import { GamePage, SingleStartPage, SingleGameOverPage } from "./singleGamePages.js"
// import SingleFriendRankPage from "./singleFriendRankPage.js"
// import ShareApp from "./shareApp.js"
// import Network from "./network.js"

class SingleCtrl {
  constructor(game, modeCtrl) {
    this.name = 'single';
    this.game = game;
    this.gameCtrl = this.game.gameCtrl;
    this.model = this.game.gameModel;
    this.view = this.game.gameView;
    this.modeCtrl = modeCtrl;
    // this.netWorkCtrl = this.gameCtrl.netWorkCtrl;
    // this.gameSocket = this.game.gameSocket;

    this.startPage = new SingleStartPage(game);
    this.gamePage = new SingleGamePage(game);
    this.gameOverPage = new SingleGameOverPage(game);
    // this.friendRankPage = new SingleFriendRankPage(game);
    this.currentPage = null;
    this.lastPage = null;

    this.socketTimeout = null;
  }

  init(options) {
    this.startPage.show();
    this.model.setStage(this.startPage.name);
    this.currentPage = this.startPage;
  }
  clickStart() {
    this.hideCurrentPage();
    this.gamePage.show();
    this.game.replayGame();
    this.model.setStage(this.gamePage.name);
    this.currentPage = this.gamePage;
  }
  showGameOverPage() {
    this.hideCurrentPage();
    this.gameOverPage.show();

    // 清空上次留存的pkId
    this.model.clearPkId();
    this.model.setStage(this.gameOverPage.name);
    this.currentPage = this.gameOverPage;
  }
  gameOverClickReplay() {
    this.clickStart();
  }
  // showFriendRank() {
  //   this.lastPage = this.currentPage;
  //   this.hideCurrentPage();
  //   this.friendRankPage.show();
  //   this.model.setStage(this.friendRankPage.name);
  //   this.currentPage = this.friendRankPage;
  // }
  // friendRankReturn() {
  //   this.hideCurrentPage();
  //   this.lastPage.show();

  //   this.model.setStage(this.lastPage.name);
  //   this.currentPage = this.lastPage;
  //   // this.lastPage = null
  // }
  // shareGroupRank() {
  //   var _this = this;

  //   ShareApp.shareGroupRank(function (success, isGroup) {
  //     _this.gameCtrl.afterShareGroupRank(success, isGroup);
  //   });
  // }
  // clickRank() {
  //   this.showFriendRank();
  // }
  // shareBattleCard() {
  //   var _this2 = this;

  //   var sessionId = this.model.getSessionId();
  //   var currentScore = this.model.currentScore;
  //   var pkId = this.model.getPkId();
  //   if (!sessionId) {
  //     this.view.showNoSession();
  //     return;
  //   }

  //   if (!pkId) {
  //     Network.createPK(currentScore).then(function () {
  //       _this2.afterHavePkId();
  //     }, function () {
  //       _this2.getPKErr();
  //     }).catch(function (err) {
  //       return console.log(err);
  //     });
  //   } else {
  //     this.afterHavePkId();
  //   }
  // }
  // afterHavePkId() {
  //   var _this3 = this;

  //   var pkId = this.model.getPkId();
  //   var score = this.model.currentScore;

  //   (0, ShareApp.shareBattle)(pkId, score, function (success, isGroup) {
  //     _this3.gameCtrl.afterShareBattle(success, isGroup);
  //   });
  // }
  // getPKErr() {
  //   this.view.showGetPkIdFail();
  // }
  // shareObservCard() {
  //   this.gamePage.hideLookersShare();
  //   this.model.setStage('loading');
  //   wx.showLoading();
  //   var sessionId = this.model.getSessionId();
  //   if (!sessionId) {
  //     this.netWorkCtrl.netWorkLogin(this.afterLogin.bind(this));
  //   } else {
  //     this.afterLogin(true);
  //   }
  // }
  // afterLogin(success) {
  //   var _this4 = this;

  //   if (success) {
  //     // 连接socket和请求gameId
  //     Network.requestCreateGame(function (success, res) {
  //       if (success) {
  //         _this4.model.setGameId(res.data.game_id);
  //         _this4.model.setGameTicket(res.data.up_op_ticket);
  //         _this4.shareObservCardA();
  //       } else {
  //         _this4.shareObservCardFail(res);
  //       }
  //     });
  //   } else {
  //     this.shareObservCardFail();
  //   }
  // }
  // // shareObservCardFail(res) {

  //   // 提示wording弹窗
  //   this.view.showShareObserveCardFail(res);

  //   // 清理gameId，gameTicket
  //   this.model.clearGameId();
  //   this.model.clearGameTicket();

  //   // 切回stage loading -> game
  //   if (this.model.stage == 'loading') {
  //     this.model.setStage('game');
  //   }

  //   // 清除定时器
  //   this.clearSocketTimeout();

  //   // 关闭socket 回到游戏页面
  //   this.gameSocket.close();

  //   // 清除wx.showloading
  //   wx.hideLoading();
  // }
  // shareObservCardA() {
  //   this.socketTimeout = setTimeout(this.shareObservCardFail.bind(this), 5000);

  //   /**
  //    * 连接网络
  //    * socket连接上自动joingame，中间出错，直接调用分享失败,关闭socket
  //    */
  //   this.gameSocket.connectSocket();
  // }
  // socketJoinSuccess(success) {
  //   wx.hideLoading();
  //   if (success) {

  //     // 取消定时器
  //     this.clearSocketTimeout();
  //     this.shareObservCardB();
  //   } else {
  //     this.shareObservCardFail();
  //   }
  // }
  // shareObservCardB() {
  //   var _this5 = this;

  //   (0, ShareApp.shareObserve)(function (success, num) {
  //     if (!!success) {
  //       _this5.gameCtrl.afterShareObserveCard(num);
  //     }
  //     setTimeout(function () {
  //       // console.log('!!!!!shareObservCardB,stage', this.model.stage)
  //       if (_this5.model.stage == 'loading') {
  //         _this5.model.setStage('game');
  //       }
  //       _this5.modeCtrl.singleChangeToPlayer();
  //       _this5.currentPage = null;
  //     }, 50);
  //   });
  // }
  // clearSocketTimeout() {
  //   if (this.socketTimeout != null) {
  //     clearTimeout(this.socketTimeout);
  //     this.socketTimeout = null;
  //   }
  // }
  // wxOnhide() {
  //   return;
  // }
  // wxOnshow() {
  //   return;
  // }
  destroy() {
    this.hideCurrentPage();
    this.currentPage = null;
    this.model.setStage('');
    // 清理gameId，gameTicket
    this.model.clearGameId();
    this.model.clearGameTicket();

    // 清除定时器
    this.clearSocketTimeout();

    this.game.resetScene();
  }
  hideCurrentPage() {
    if (this.currentPage) {
      this.currentPage.hide();
    }
  }
}

export default { singleCtrl };
