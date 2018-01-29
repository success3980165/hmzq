var playerChange = {
  changeNum: function(ob) {
    if (ob) {
      return Number(ob);
    }
    return 0;
  },
  getChushiAttr: function(player) {
    var arryKey = ['初始属性值-带球/门线技术', '初始属性值-传球/球路判断', '初始属性值-射门/防线指挥', '初始属性值-抢断/心理素质', '初始属性值-拦截/发起进攻']
    var attr = [];
    var that = this;
    arryKey.forEach(function(key) {
      attr.push(that.changeNum(player[key]));
    })
    return attr;
  },
  /**
   * 获取升级后的属性(player: 球员, level: 0-7)
   **/
  getShengjiAttr: function(player, level) {
    var attr = {};
    var chushiAttr = [0, 0, 0, 0, 0]
    if (level <= 0) {
      return chushiAttr;
    }
    var ltype = player['成长类型'];
    var lweizhi = player['场上位置'];
    if (lweizhi == '门将') {
      chushiAttr.forEach(function(num, index) {
        chushiAttr[index] = num + 10 * level;
      })
    } else {
      if (ltype == 'A') {
        // 带球+20
        chushiAttr[0] = chushiAttr[0] + 20 * level;
        // 传球+10
        chushiAttr[1] = chushiAttr[1] + 10 * level;
        // 射门+20
        chushiAttr[2] = chushiAttr[2] + 20 * level;
      } else {
        // 传球+10
        chushiAttr[1] = chushiAttr[1] + 10 * level;
        // 抢断+20
        chushiAttr[3] = chushiAttr[3] + 20 * level;
        // 拦截+20
        chushiAttr[4] = chushiAttr[4] + 20 * level;
      }
    }
    return chushiAttr;
  },
  /**
   * 获取球员转身的属性(player: 球员, 品质: 紫2次,橙3次,红4次,金5次 , level: 1-5)
   **/
  getZhuanshenAttr: function(player, zhuanshenLevel) {
    var pinzhi = player['球员品质'];
    var pingzhiObNum = {
      '紫': 2,
      '橙': 3,
      '红': 4,
      '金': 5
    }
    var pingzhiObAttr = {
      '紫': 65,
      '橙': 110,
      '红': 175,
      '金': 260
    }
    var chushiAttr = [0, 0, 0, 0, 0]
    if (!pingzhiObNum[pinzhi]) {
      return chushiAttr;
    }
    var attr = pingzhiObAttr[pinzhi];
    chushiAttr.forEach(function(num, index) {
      chushiAttr[index] = num + attr * zhuanshenLevel;
    })
    return chushiAttr;
  },
  /**
   * 获取球员技能的属性(player: 球员, level: 1-7, hasJinengA: true\false 【全神贯注】,hasJinengB: true\false 【有搭档】)
   **/
  getJinengAttr: function(player, level, hasJinengA, hasJinengB) {
    var pinzhi = player['球员品质'];
    var attrArr = [0, 30, 50, 70, 90, 120, 150]
    var chushiAttr = [0, 0, 0, 0, 0]
    if (level <= 0) {
      return chushiAttr;
    }
    if (hasJinengA) {
      chushiAttr.forEach(function(num, index) {
        chushiAttr[index] = num + attrArr[level - 1];
      })
    }
    if (hasJinengB) {
      chushiAttr.forEach(function(num, index) {
        chushiAttr[index] = num + attrArr[level - 1];
      })
    }
    return chushiAttr;
  }
}
