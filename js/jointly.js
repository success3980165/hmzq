new Vue({
  el: '#appp',
  data: {
    postsId: '',
    result: '',
    hoolaiCmsAPI: new hoolaiCmsAPI(10, false),
    listData: [],
    listName: '',
    more_href: '',
    article_title: '',
    article_time: '',
    article_content: '',
    all: 8, //总页数
    cur: 1, //当前页码
    video_play: false,
    cover: false, //蒙层
    hd_bg: false, //高清图
    isChecked: 1,
    listDataTime: '',
    more1: true,
    hq_pic: '',
    line: {
      paddingBottom: '16px',
      borderBottom: '1px dashed #55607a'
    },
    listHm: [],
    line3: {
      color: 'white !important',
      borderRadius: '20px',
      border: '2px solid #fff'
    },
    line2: {
      paddingBottom: '8px',
      borderBottom: '2px solid #55607a',
      fontSize: '24px'
    },
    line4: {
      paddingBottom: '4px',
      borderBottom: '1px dashed #55607a'
    },
    zuixin: false,
    gonglue: false,
    huodong: false,
    gonggao: false,
    gameFeature: false,
    zhinan: false,
    wanfa: false,
    miji: false,
  },
  watch: {
    cur: function(oldValue, newValue) {
      console.log(arguments);
    }
  },
  beforeCreate: function() {
    this.cover = false;
    this.video_play = false;
  },
  created: function() {
    this.cover = false;
    this.video_play = false;
    this.initData();

  },
  computed: {
    indexs: function() {
      var left = 1;
      var right = this.all;
      var ar = [];
      if (this.all >= 5) {
        if (this.cur > 3 && this.cur < this.all - 2) {
          left = this.cur - 2
          right = this.cur + 2
        } else {
          if (this.cur <= 3) {
            left = 1
            right = 5
          } else {
            right = this.all
            left = this.all - 4
          }
        }
      }
      while (left <= right) {
        ar.push(left)
        left++
      }
      return ar
    }
  },
  methods: {
    phoneClick: function() {
      alert("敬请期待!")
    },
    choubei: function() {
      alert("正在筹备中!")
    },
    //视频播放
    videoClick: function() {
      this.video_play = true
      this.cover = true
    },
    //视频关闭
    videoClose: function() {
      this.video_play = false
      this.cover = false
    },
    expect: function() {
      alert("敬请期待～");
    },
    //关闭高清图
    closeHd: function() {
      this.cover = false
      this.hd_bg = false
    },
    btnClick: function(indexVal) { //页码点击事件
      console.log(indexVal);
      if (indexVal != this.cur) {
        this.cur = indexVal
      }
      this.goGetList(this.listName, indexVal);
    },
    // pageClick: function() {
    //   var num = this.cur;
    //   this.goGetList('最新', num);
    //   // console.log('现在在' + this.cur + '页');
    // },
    initData: function() {
      var that = this;


      var params = {};
      params.categoryName = '攻略';
      params.page = 1;
      params.rows = 6;
      that.hoolaiCmsAPI.getList(params, function(result) {
        var listHm = result.rows;
        listHm.forEach(function(item) {
          item.listDataTime = moment(item.updated).format('YYYY-MM-DD');
          item.hrefVal = 'article.html#' + item.id;
        })
        that.listHm = listHm;
      })


      var tag = window.location.hash.substr(1);
      console.log(tag);

      var locationHrefArr = window.location.href.split("#");
      if (locationHrefArr.length == 1) {
        that.goGetList('最新', 1);
      } else {
        if (tag == 422) { // 二级页
          that.goGetList('最新', 1);
          that.zuixin = true;
        } else if (tag == 424) {
          that.goGetList('攻略', 1);
          that.gonglue = true;
        } else if (tag == 425) {
          that.goGetList('公告', 1);
        } else if (tag == 423) {
          that.goGetList('活动', 1);
        } else if (tag == 426) {
          that.goGetList('游戏特色', 1);
          that.gameFeature = true;
        } else if (tag == 427) {
          that.goGetList('新手指南', 1);
          that.zhinan = true;
        } else if (tag == 428) {
          that.goGetList('进阶玩法', 1);
          that.wanfa = true;
        } else if (tag == 429) {
          that.goGetList('游戏秘籍', 1);
          that.miji = true;
        } else { // 文章页
          that.goGetById(tag);
        }
      }

    },
    clean: function() {
      this.result = "";
    },
    enterList: function(str, num, curVal) { //添加下划线的效果
      var that = this;
      that.zuixin = false;
      that.gonglue = false;
      that.huodong = false;
      that.gonggao = false;
      that.gameFeature = false;
      that.zhinan = false;
      that.wanfa = false;
      that.miji = false;
      if (str == '最新') {
        that.zuixin = true;
      } else if (str == '攻略') {
        that.gonglue = true;
      } else if (str == '活动') {
        that.huodong = true;
      } else if (str == '公告') {
        that.gonggao = true;
      } else if (str == '游戏特色') {
        that.gameFeature = true;
      } else if (str == '新手指南') {
        that.zhinan = true;
      } else if (str == '进阶玩法') {
        that.wanfa = true;
      } else if (str == '游戏秘籍') {
        that.miji = true;
      }
      that.goGetList(str, num, curVal);
    },
    goGetList: function(str, num, curVal) {
      if (curVal) {
        this.cur = curVal;
      } //分页的样式固定值
      if (str == '最新') {
        // this.more_href = 'latestActivity.html#' + '422'
        // console.log(this.in)
      } else if (str == '攻略') {
        console.log(str)
          // this.more_href = 'newsInformation.html#' + '441'
      } else if (str == '公告') {
        console.log(str)
          // this.more_href = 'newsInformation.html#' + '440'
      } else if (str == '活动') {
        console.log(str)
          // this.more_href = 'newsInformation.html#' + '443'
      } else if (str == '游戏特色') {
        // this.more_href = 'newsList.html#' + '445'
      } else if (str == '新手指南') {
        // this.more_href = 'newsList.html#' + '444'
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
      params.rows = 6;
      that.listName = str;

      console.log(params)

      that.hoolaiCmsAPI.getList(params, function(result) {
        var listData = result.rows;
        if (listData.length < 6 && num == 1) { //分页显示
          that.more1 = false;
        } else {
          // 总页数
          that.all = Math.ceil(result.total / params.rows);
          that.more1 = true;
        }

        listData.forEach(function(item) {
          item.listDataTime = moment(item.updated).format('YYYY-MM-DD');
          item.hrefVal = 'article.html#' + item.id;
        })

        that.listData = listData;
        console.log(that.listData)



      })
    },
    goGetById: function(articleTag) {
      var that = this;
      that.clean();
      that.hoolaiCmsAPI.getById(articleTag, function(result) {
        console.log(result);
        // console.log(JSON.stringify(result));
        // that.result = JSON.stringify(result);
        that.article_title = result.data.title;
        that.article_time = result.data.updated;
        that.article_content = result.data.content;
      }, 'json')
    },
  }
})