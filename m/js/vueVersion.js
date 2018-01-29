new Vue({
  el: '#app',
  data: {
    result: '',
    hoolaiCmsAPI: new hoolaiCmsAPI(10, false),
    listData: [],
    listName: '',
    more_href: '',
    listDataGL: [],
    article_title: '',
    article_time: '',
    article_content: '',
    coverShow: false,
    popShow: false,
    popImg: '',
    dialog1Show: false,
    dialog2Show: false,
    dialog3Show: false,
    sg2ActivityAPI: new hoolaiActivityAPI(22, true),
    telephone: '',
    code: '',
    countdown: 60,
    isGrayBg: false,
    smsCodeVal: '获取验证码',
    isDisabled: false,
    libaoma: '',
    yxts: false,
    xszn: false,
    jjwf: false,
    yxmj: false,
    zuixin: false,
    gonglue: false,
    huodong: false,
    gonggao: false
  },
  watch: {},
  beforeCreate: function() {

  },
  created: function() {
    this.initData();
  },
  computed: {

  },
  methods: {
    // 顶部游戏下载
    downLoad: function() {
      window.location.href = "../download.html";
      console.log("tiaozhuan")
    },
    // 礼包弹出1
    libao: function() {
      this.coverShow = true;
      this.dialog1Show = true;
    },
    // 礼包弹出2
    showd2: function() {
      this.dialog1Show = false;
      this.dialog2Show = true;
    },
    // 关闭弹框
    closeDialog: function() {
      this.coverShow = false;
      this.dialog1Show = false;
      this.dialog2Show = false;
      this.dialog3Show = false;
    },
    // 关闭错误提示
    closeErr: function() {
      this.popShow = false;
    },
    // 发送验证码
    sendSms: function() {
      var self = this;
      console.log(this.telephone);
      var mobile = this.telephone;
      var data = {};
      data.mobile = mobile;
      this.sg2ActivityAPI.sendMobileCode(data, function(result) {
        if (result.ret != 1) {
          if (result.code == 19) {
            // 错误的手机号
            self.popImg = 'url("./img/pop1.png")';
            self.popShow = true;
            return;
          }
          if (result.code == 4) {
            // 重复领取
            self.popImg = 'url("./img/pop3.png")';
            self.popShow = true;
            return;
          }
          // alert(result.msg);
        } else {
          self.isGrayBg = true;
          self.countdown = 60;
          self.setTime();
        }
      })
    },
    // 60s倒计时
    setTime: function() {
      var self = this;
      if (self.countdown == 0) {
        self.isGrayBg = false;
        self.smsCodeVal = "获取验证码";
        self.isDisabled = false;
        return;
      } else {
        self.isDisabled = true;
        self.isGrayBg = true;
        self.smsCodeVal = '重新发送' + self.countdown + 's';
        self.countdown--;
      }
      console.log(self.countdown)
      setTimeout(this.setTime, 1000)
    },
    // 领取礼包，获取礼包码
    saveRecord: function() {
      var mobile = this.telephone;
      var mobilecode = this.code;
      var data = {};
      data.mobile = mobile;
      data.verifyCode = mobilecode;
      console.log(data);
      var self = this;
      this.sg2ActivityAPI.saveRecord(data, function(result) {
        console.log(result)
        if (result.ret != 1) {
          if (result.code == 7) {
            // 错误的验证码
            self.popImg = 'url("./img/pop2.png")';
            self.popShow = true;
            return;
          }
          if (result.code == 19) {
            // 错误的手机号
            self.popImg = 'url("./img/pop1.png")';
            self.popShow = true;
            return;
          }
          if (result.code == 5) {
            // 重复领取
            self.popImg = 'url("./img/pop3.png")';
            self.popShow = true;
            return;
          }
          alert(result.msg);
        } else {
          // 领取成功dialog3，并显示礼包码
          this.dialog3Show = true;
          this.dialog2Show = false;
          this.libaoma = result.gifts;
        }
      })
    },
    initData: function() {
      var that = this;
      var tag = window.location.hash.substr(1);
      console.log(tag);

      var locationHrefArr = window.location.href.split("#");
      if (locationHrefArr.length == 1) { //首页
        that.goGetList('最新', 1);
        // 攻略
        var params = {};
        params.categoryName = '攻略';
        params.page = 1;
        params.rows = 5;
        that.hoolaiCmsAPI.getList(params, function(result) {
          var listDataGL = result.rows;
          that.listDataGL = result.rows;
          listDataGL.forEach(function(item) {
            item.hrefVal = 'article.html#' + item.id;
          })
        })
      } else { // 二级页
        if (tag == 422) {
          that.goGetList('最新', 1, 'all');
          that.zuixin = true;
        } else if (tag == 424) {
          that.goGetList('攻略', 1, 'all');
          that.gonglue = true;
        } else if (tag == 423) {
          that.goGetList('活动', 1, 'all');
          that.huodong = true;
        } else if (tag == 425) {
          that.goGetList('公告', 1, 'all');
          that.gonggao = true;
        } else if (tag == 426) {
          that.goGetList('游戏特色', 1, 'all');
          that.yxts = true;
        } else if (tag == 427) {
          that.goGetList('新手指南', 1, 'all');
          that.xszn = true;
        } else if (tag == 428) {
          that.goGetList('进阶玩法', 1, 'all');
          that.jjwf = true;
        } else if (tag == 429) {
          that.goGetList('游戏秘籍', 1, 'all');
          that.yxmj = true;
        } else { // 文章页
          that.goGetById(tag);
        }
      }

    },
    clean: function() {
      this.result = "";
    },
    goGetList: function(str, num, rows) {
      this.listName = str;
      if (str == '最新') {
        this.more_href = 'list.html#' + '422'
      } else if (str == '攻略') {
        this.more_href = 'list.html#' + '424'
      } else if (str == '活动') {
        this.more_href = 'list.html#' + '423'
      } else if (str == '公告') {
        this.more_href = 'list.html#' + '425'
      }

      var that = this;
      that.clean();
      var params = {};
      // 1: 获取推荐的文章
      // params.isRecommend = 1;
      // 2: 获取某个类型的所有文章
      params.categoryName = str;
      // 3: 分页 page 默认显示第1页
      // params.page = 1;
      params.page = num;
      // 4: 每页显示多少个 默认10个
      if (rows) {
        console.log("加载所有数据");
        params.rows = 100;
      } else {
        console.log("加载5条数据");
        params.rows = 5;
      }



      that.hoolaiCmsAPI.getList(params, function(result) {
        var listData = result.rows;
        console.log(result.rows);

        listData.forEach(function(item) {
          item.updated = item.updated.substr(0, 10);
          item.hrefVal = 'article.html#' + item.id;
        })
        that.listData = listData;
      })
    },
    goGetById: function(articleTag) {
      var that = this;
      that.clean();
      that.hoolaiCmsAPI.getById(articleTag, function(result) {
        console.log(result);
        that.article_title = result.data.title;
        that.article_time = result.data.updated;
        that.article_content = result.data.content;
        console.log(that.article_content)
      }, 'json')
    },
  }
});
