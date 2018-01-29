new Vue({
  el: "#app",
  data: {
    list: "",
    allList: "",
    total: 0,
    qiuyuanInput: "",
    guojiInput: "",
    weizhiSelected: "请选择...",
    jinengSelected: "请选择...",
    huaxueSelected: "请选择...",
    pinzhiSelected: "请选择...",
    pinzhiArr: ["金", "红", "橙", "紫", "蓝", "绿", "白"],
    pinzhidengjiname: ["SSS", "SS", "S", "A", "B", "C", "D"],
    hoolaiCmsAPI: new hoolaiCmsAPI(13, true),
    jinengList: [],
    huaxueList: [],
    fullist: [],
    page: 0
  },
  created: function() {
    this.initData();
  },
  watch: {
    qiuyuanInput: function() {
      this.filterList();
    },
    guojiInput: function() {
      this.filterList();
    },
    weizhiSelected: function() {
      this.filterList();
    },
    jinengSelected: function() {
      this.filterList();
    },
    huaxueSelected: function() {
      this.filterList();
    },
    pinzhiSelected: function() {
      this.filterList();
    }
  },
  methods: {
    initData: function() {
      var that = this;
      that.getPlayers();
      that.getJinengs();
      that.getHuaxues();
      that.$nextTick(function() {
        $(".player").scroll(function() {
          that.pagePlayers(that.fullist);
        });
      });
    },
    filterList: function() {
      var that = this;
      that.page = 0;
      var fullist = _.filter(that.allList, function(o) {
        var weizhi = true;
        if (that.weizhiSelected != "请选择...") {
          weizhi = o["场上位置"].indexOf(that.weizhiSelected) >= 0;
        }
        var pinzhi = true;
        if (that.pinzhiSelected != "请选择...") {
          pinzhi = o["球员品质"] == that.pinzhiSelected;
        }
        var guoji = true;
        if (that.guojiInput != "") {
          guoji = o["国籍"] == that.guojiInput;
        }
        var jineng = true;
        if (that.jinengSelected != "请选择...") {
          jineng = o["jineng"].indexOf(that.jinengSelected + "") >= 0;
        }
        var huaxue = true;
        if (that.huaxueSelected != "请选择...") {
          huaxue = o["huaxueList"].indexOf(that.huaxueSelected) >= 0;
        }
        var qiuyuan = true;
        if (that.qiuyuanInput != "") {
          qiuyuan = o["中文名"].indexOf(that.qiuyuanInput) >= 0;
        }
        return weizhi & pinzhi & guoji & qiuyuan & jineng & huaxue;
      });
      that.fullist = fullist;
      that.pagePlayers(fullist);
    },
    pagePlayers: function(fullist) {
      var that = this;
      that.page = that.page + 1;
      var rows = that.page * 10;
      var list = [];
      _.forEach(fullist, function(item, key) {
        if (rows > list.length) {
          list.push(item);
        }
      });
      that.list = list;
    },
    reset: function() {
      var that = this;
      that.weizhiSelected = "请选择...";
      that.pinzhiSelected = "请选择...";
      that.jinengSelected = "请选择...";
      that.huaxueSelected = "请选择...";
      that.guojiInput = "";
      that.qiuyuanInput = "";
      that.filterList();
    },
    getPlayers: function() {
      var that = this;
      playerCommon.getPlayers(function(players) {
        that.allList = players;
        that.fullist = players;
        // that.list = players;
        that.pagePlayers(players);
      });
    },
    getJinengs: function() {
      var that = this;
      playerCommon.getJinengs(function(jinengs) {
        that.jinengList = jinengs;
      });
    },
    getHuaxues: function() {
      var that = this;
      playerCommon.getHuaxues(function(huaxues) {
        that.huaxueList = huaxues;
      });
    },
    goDetail: function(id) {
      window.location.href = "details.html?id=" + id;
    }
  }
});
