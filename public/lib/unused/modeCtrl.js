import SingleCtrl from "./singleCtrl.js"
// import GroupShareCtrl from "./groupShareCtrl.js"
// import BattleCtrl from "./battleCtrl.js"
// import ObserveCtrl from "./observeCtrl.js"
// import PlayerCtrl from "./playerCtrl.js"

class ModeCtrl {
  constructor(game) {
    this.game = game;
    this.singleCtrl = new SingleCtrl2(game, this);
    // this.groupShareCtrl = new GroupShareCtrl2(game, this);
    // this.battleCtrl = new BattleCtrl2(game, this);
    // this.observeCtrl = new ObserveCtrl2(game, this);
    // this.playerCtrl = new PlayerCtrl2(game, this);

    this.model = game.gameModel;
    this.gameCtrl = game.gameCtrl;
    this.currentCtrl = null;
  }
  initFirstPage(options) {
    var mode = this.model.getMode();
    switch (mode) {
      case 'single':
        this.currentCtrl = this.singleCtrl;
        this.singleCtrl.init(options);
        this.gameCtrl.netWorkLogin();
        break;
      // case 'groupShare':
      //   this.currentCtrl = this.groupShareCtrl;
      //   this.groupShareCtrl.init(options);
      //   break;
      // case 'battle':
      //   this.currentCtrl = this.battleCtrl;
      //   this.battleCtrl.init(options);
      //   break;
      // case 'observe':
      //   this.currentCtrl = this.observeCtrl;
      //   this.observeCtrl.init(options);
      //   break;

      default:
        this.currentCtrl = this.singleCtrl;
        this.model.setMode('single');
        this.singleCtrl.init(options);
        // this.gameCtrl.netWorkLogin();
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        // console.log('InitFirstPage 找不到对应mode')
        // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        break;
    }
  }
  reInitFirstPage(options) {
    if (this.currentCtrl) {
      this.currentCtrl.destroy();
      this.currentCtrl = null;
    }
    this.gameCtrl.queryCtrl.identifyMode(options);
    this.initFirstPage(options);
  }
  clickStart() {
    if (this.currentCtrl) {
      if (this.currentCtrl.clickStart) {
        this.currentCtrl.clickStart();
      }
    }
  }
  showGameOverPage() {
    if (this.currentCtrl) {
      if (this.currentCtrl.showGameOverPage) {
        this.currentCtrl.showGameOverPage();
      }
    }
  }
  gameOverClickReplay() {
    if (this.currentCtrl) {
      if (this.currentCtrl.gameOverClickReplay) {
        this.currentCtrl.gameOverClickReplay();
      } else {
        // this.game.handleWxOnError({
        //   message: 'cannot Find this.currentCtrl.gameOverClickReplay',
        //   stack: this.game.mode + '' + this.game.stage
        // });
      }
    }
  }
  // showFriendRank() {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.showFriendRank) {
  //       this.currentCtrl.showFriendRank();
  //     }
  //   }
  // }
  // friendRankReturn() {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.friendRankReturn) {
  //       this.currentCtrl.friendRankReturn();
  //     }
  //   }
  // }
  // shareGroupRank() {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.shareGroupRank) {
  //       this.currentCtrl.shareGroupRank();
  //     }
  //   }
  // }
  // clickRank() {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.clickRank) {
  //       this.currentCtrl.clickRank();
  //     }
  //   }
  // }
  // shareBattleCard() {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.shareBattleCard) {
  //       this.currentCtrl.shareBattleCard();
  //     }
  //   }
  // }
  // changeMode(name) {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.destroy) {
  //       this.currentCtrl.destroy();
  //     }
  //   }
  //   this.model.setMode(this[name].name);
  //   this.currentCtrl = this[name];
  //   this[name].init();
  // }
  // singleChangeToPlayer() {
  //   // 因为是单机转主播，所以不需要hide
  //   this.model.setMode(this.playerCtrl.name);
  //   this.currentCtrl = this.playerCtrl;
  //   this.playerCtrl.init();
  // }
  // groupPlayGame() {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.groupPlayGame) {
  //       this.currentCtrl.groupPlayGame();
  //     }
  //   }
  // }
  // directPlaySingleGame() {
  //   if (this.currentCtrl) {
  //     this.currentCtrl.destroy();
  //   }
  //   this.model.setMode(this.singleCtrl.name);
  //   this.currentCtrl = this.singleCtrl;
  //   this.singleCtrl.clickStart();
  // }
  // battlePlay(pk) {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.battlePlay) {
  //       this.currentCtrl.battlePlay(pk);
  //     }
  //   }
  // }
  // shareObservCard() {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.shareObservCard) {
  //       this.currentCtrl.shareObservCard();
  //     }
  //   }
  // }
  // socketJoinSuccess(success) {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.socketJoinSuccess) {
  //       this.currentCtrl.socketJoinSuccess(success);
  //     }
  //   }
  // }
  // showPlayerGG(data) {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.showPlayerGG) {
  //       this.currentCtrl.showPlayerGG(data);
  //     }
  //   }
  // }
  // showPlayerWaiting() {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.showPlayerWaiting) {
  //       this.currentCtrl.showPlayerWaiting();
  //     }
  //   }
  // }
  // onPlayerOut() {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.onPlayerOut) {
  //       this.currentCtrl.onPlayerOut();
  //     } else {
  //       this.game.handleWxOnError({
  //         message: 'cannot Find this.currentCtrl.onPlayerOut',
  //         stack: this.game.mode + '' + this.game.stage
  //       });
  //     }
  //   }
  // }
  // onViewerStart() {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.onViewerStart) {
  //       this.currentCtrl.onViewerStart();
  //     }
  //   }
  // }
  // wxOnhide() {
  //   if (this.currentCtrl) {
  //     if (this.currentCtrl.wxOnhide) {
  //       this.currentCtrl.wxOnhide();
  //     }
  //   }
  // }
}

export default { ModeCtrl };
