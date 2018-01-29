new Vue({
  el: "#app",
  data: {
    playerid: 0,
    players: null,
    jinengs: null,
    huaxues: null,
    hasJinengA: false,
    hasJinengB: false,
    level: 0,
    levelArr: [0, 1, 2, 3, 4, 5, 6, 7],
    zhuanshenLevel: 0,
    zhuanshenLevelArr: [0, 1, 2, 3, 4, 5],
    chujiAttr: [],
    pingzhi: "白",
    pingzhiObNum: {
      紫: 2,
      橙: 3,
      红: 4,
      金: 5
    },
    playerLevelNum: {
      白: 1,
      绿: 2,
      蓝: 3,
      紫: 4,
      橙: 5,
      红: 6,
      金: 7
    },
    shenjiAttr: [],
    shenjiNum: 0,
    zhuanshenAttr: [],
    zhuanshenNum: 0,
    jinengAttr: [],
    jinengNum: 0,
    totalAttr: [0, 0, 0, 0, 0],
    player: {
      中文名: "",
      partner: {
        中文名: "",
        卡片图片: ""
      }
    },
    labels: [
      "初始属性值-带球/门线技术",
      "初始属性值-传球/球路判断",
      "初始属性值-射门/防线指挥",
      "初始属性值-抢断/心理素质",
      "初始属性值-拦截/发起进攻"
    ],
    jinengList: [],
    huaxueList: [],
    loadover: false
  },
  watch: {
    hasJinengA: function() {
      this.getPlayAttr();
    },
    hasJinengB: function() {
      this.getPlayAttr();
    },
    level: function(val) {
      var that = this;
      if (val < 4) {
        that.zhuanshenLevel = 0;
      } else {
        var num = 0;
        switch (val) {
          case 4:
            num = 2;
            break;
          case 5:
            num = 3;
            break;
          case 6:
            num = 4;
            break;
          case 7:
            num = 5;
            break;
          default:
        }
        that.zhuanshenLevelArr = [];
        that.zhuanshenLevel = 0;
        that.zhuanshenLevelArr.push(0);
        for (var i = 0; i < num; i++) {
          that.zhuanshenLevelArr.push(i + 1);
        }
      }
      if (val < 2) {
        this.hasJinengA = false;
        this.hasJinengB = false;
      }
      this.getPlayAttr();
    },
    zhuanshenLevel: function() {
      this.getPlayAttr();
    }
  },
  created: function() {
    this.initData();
  },
  methods: {
    initData: function() {
      var that = this;
      this.playerid = this.getUrlParam("id");
      playerCommon.getHuaxues(function(huaxues) {
        that.huaxues = huaxues;
        playerCommon.getJinengs(function(jinengs) {
          that.jinengs = jinengs;
          playerCommon.getPlayers(function(players) {
            that.players = players;
            that.goGetById();
          });
        });
      });
    },
    getPlayAttr: function() {
      var that = this;
      that.chujiAttr = playerChange.getChushiAttr(that.player);
      that.shenjiAttr = playerChange.getShengjiAttr(that.player, that.level);
      that.zhuanshenAttr = playerChange.getZhuanshenAttr(
        that.player,
        that.zhuanshenLevel
      );
      that.jinengAttr = playerChange.getJinengAttr(
        that.player,
        that.level,
        that.hasJinengA,
        that.hasJinengB
      );
      that.jinengNum = 0;
      _.forEach(that.jinengAttr, function(num) {
        that.jinengNum += num;
      });
      that.totalAttr.forEach(function(val, index) {
        that.totalAttr[index] =
          that.chujiAttr[index] +
          that.shenjiAttr[index] +
          that.zhuanshenAttr[index] +
          that.jinengAttr[index];
      });
      if (!that.loadover) {
        setTimeout(function() {
          updateChart(that.labels, that.totalAttr);
          that.loadover = true;
        }, 1000);
      } else {
        updateChart(that.labels, that.totalAttr);
      }
    },
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    getJinengList: function(item) {
      var that = this;
      _.forEach(item.jineng, function(o) {
        var jineng = playerCommon.getJinengById(that.jinengs, o);
        if (jineng) {
          that.jinengList.push(jineng);
        }
      });
    },
    getHuaxueList: function(item) {
      var that = this;
      _.forEach(item.huaxue, function(o) {
        var huaxue = playerCommon.getHuaxueById(that.huaxues, o);
        if (huaxue) {
          huaxue.players = that.joinHuaxue(huaxue);
          that.huaxueList.push(huaxue);
        }
      });
    },
    joinHuaxue: function(huaxue) {
      var that = this;
      var bo = true;
      var n = 1;
      var xmList = [];
      while (bo) {
        var temp = huaxue["球员-" + n];
        if (!temp) {
          bo = false;
          break;
        }
        var player = playerCommon.getPlayerById(that.players, temp);
        if (player) {
          xmList.push(player);
        }
        n++;
      }
      return xmList;
    },
    getHuaxueXmList: function(item, i) {
      var that = this;
      var bo = true;
      var n = 1;
      var xmList = [];
      while (bo) {
        var name = item["化学-" + i + "-" + n + "-球员名称"];
        var img = item["化学-" + i + "-" + n + "-球员图片"];
        if (!name || !img) {
          bo = false;
          break;
        }
        var huaxue = {};
        huaxue.name = name;
        huaxue.img = img;
        xmList.push(huaxue);
        n++;
      }
      return xmList;
    },
    goGetById: function() {
      var that = this;
      var id = that.playerid;
      that.player = playerCommon.getPlayerById(that.players, id);
      if (that.player == null) {
        alert("错误的球员id");
        return;
      }
      var lweizhi = that.player["场上位置"];
      if (lweizhi === "门将") {
        that.labels = ["门线技术", "球路判断", "防线指挥", "心理素质", "发起进攻"];
      } else {
        that.labels = ["带球", "传球", "射门", "抢断", "拦截"];
      }
      that.player.partner = playerCommon.getPlayerById(
        that.players,
        that.player["最佳拍档-球员id"]
      );
      if (that.player.partner == null) {
        that.player.partner = {
          中文名: "",
          卡片图片: ""
        };
      }
      // // 格式化获取技能列表
      that.getJinengList(that.player);
      // // 格式化获取化学列表
      that.getHuaxueList(that.player);
      var pingzhi = that.player["球员品质"];
      that.pingzhi = pingzhi;
      var num = that.playerLevelNum[pingzhi];
      that.levelArr = [];
      if (num > 0) {
        that.level = 0;
        that.levelArr.push(0);
        for (var i = 0; i < num; i++) {
          that.levelArr.push(i + 1);
        }
      }
      that.getPlayAttr();
    }
  }
});
