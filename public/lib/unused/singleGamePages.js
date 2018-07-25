class GamePage {
  constructor(game) {
    this.game = game;
    this.model = this.game.gameModel;
    this.full2D = this.game.full2D;
    this.UI = this.game.UI;
    this.viewer = this.game.viewer;
    this.name = 'game';
  }
  show() {
    var is_from_wn = this.model.is_from_wn;
    var firstBlood = this.model.firstBlood;

    if (!is_from_wn && !this.game.guider) {
      // this.UI.observe.visible = true
      if (firstBlood) {
        this.viewer.lookers.showLookers({
          avaImg: false,
          icon: true,
          wording: true
        });
      } else {
        this.viewer.open();
      }
    }

    this.UI.showScore();

    this.UI.scoreText.obj.position.y = 21;
    this.UI.scoreText.obj.position.x = -13;
    this.UI.scoreText.changeStyle({ textAlign: 'left' });
  }
  hide() {
    // this.viewer.close();
    // this.UI.observe.visible = false
    this.UI.hideScore();
  }
  hideLookersShare() {
    var firstBlood = this.model.firstBlood;
    if (firstBlood) {
      this.model.setFirstBlood(false);
      // this.viewer.open();
    }
  }
}

class SingleStartPage {
  constructor(game) {
    this.game = game;
    this.model = this.game.gameModel;
    this.full2D = this.game.full2D;
    this.name = 'startPage';
  }
  show() {
    var _this = this;

    if (!this.full2D) {
      // this.game.handleWxOnError({
      //   message: 'can not find full 2D',
      //   stack: ''
      // });
    }
    setTimeout(function () {
      if (_this.full2D) {
        _this.full2D.showStartPage();
      } else {
        // wx.exitMiniProgram()
      }
    }, 0);
  }
  hide() {
    this.full2D.hide2D();
  }
}

class SingleGameOverPage {
  constructor(game) {
    this.game = game;
    this.model = this.game.gameModel;
    this.full2D = this.game.full2D;
    this.name = 'singleSettlementPgae';
  }
  show() {
    var _this = this;

    var score = this.model.currentScore;
    var highest_score = this.model.getHighestScore();
    var start_time = this.model.startTime;
    var week_best_score = this.model.weekBestScore;
    var game_cnt = this.game.historyTimes.getTimes();
    if (!this.full2D) {
      this.game.handleWxOnError({
        message: 'can not find full 2D gameOverPage',
        stack: ''
      });
    }

    setTimeout(function () {
      if (_this.full2D) {
        _this.full2D.showGameOverPage({
          score: score,
          highest_score: highest_score,
          start_time: start_time,
          week_best_score: week_best_score,
          game_cnt: game_cnt
        });
      } else {
        // wx.exitMiniProgram()
      }
    }, 0);
  }
  hide() {
    this.full2D.hide2D();
  }
}

export { GamePage, SingleStartPage, SingleGameOverPage };
