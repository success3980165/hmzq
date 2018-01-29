var playerCommon = {
  hoolaiCmsAPI: new hoolaiCmsAPI(13, false),
  cache: false,
  huaxues: [],
  jinengs: [],
  pinzhiOrder: {
    金: 0,
    红: 1,
    橙: 2,
    紫: 3,
    蓝: 4,
    绿: 5,
    白: 6
  },
  setCache: function(key, data) {
    var cache = {
      data: data,
      cacheTime: new Date().getTime()
    };
    localStorage[key] = JSON.stringify(cache);
  },
  getCache: function(key) {
    if (!this.cache) {
      return null;
    }
    var cache = localStorage[key];
    if (!cache) {
      return null;
    }
    cache = JSON.parse(cache);
    if (cache.cacheTime + 60 * 1000 * 30 > new Date().getTime()) {
      return cache.data;
    }
    return null;
  },
  getPlayers: function(callback) {
    var that = this;
    var key = "players";
    var cache = that.getCache(key);
    if (cache) {
      callback(cache);
      return;
    }
    var params = {};
    params.categoryName = "球员";
    params.rows = 1000;
    that.hoolaiCmsAPI.getList(params, function(result) {
      var list = [];
      _.forEach(result.rows, function(item, key) {
        item.fields.id = item.id;
        item.fields.pinzhiOrder = that.pinzhiOrder[item.fields["球员品质"]];
        item.fields.jineng = that.joinJineng(item.fields);
        item.fields.huaxue = that.joinHuaxue(item.fields);
        var huaxueList = [];
        _.forEach(that.huaxues, function(huaxue) {
          if (that.getPlayerHuaxue(huaxue, item.id)) {
            huaxueList.push(huaxue.id);
          }
        });
        item.fields.huaxueList = huaxueList;
        list.push(item.fields);
      });
      list = _.orderBy(list, ["pinzhiOrder"], ["asc"]);
      that.setCache(key, list);
      callback(list);
    });
  },
  getPlayerHuaxue: function(huaxue, playerId) {
    var that = this;
    var bo = true;
    var n = 1;
    while (bo) {
      var object = huaxue["球员-" + n];
      if (!object) {
        return false;
      }
      if (playerId + "" === object) {
        return true;
      }
      n++;
    }
    return false;
  },
  getJinengs: function(callback) {
    var that = this;
    var key = "jineng";
    var cache = that.getCache(key);
    if (cache) {
      callback(cache);
      return;
    }
    var params = {};
    params.categoryName = "技能";
    params.rows = 1000;
    that.hoolaiCmsAPI.getList(params, function(result) {
      var list = [];
      _.forEach(result.rows, function(item, key) {
        item.fields.id = item.id;
        list.push(item.fields);
      });
      that.setCache(key, list);
      callback(list);
    });
  },
  getHuaxues: function(callback) {
    var that = this;
    var key = "huaxue";
    var cache = that.getCache(key);
    if (cache) {
      callback(cache);
      that.huaxues = cache;
      return;
    }
    var params = {};
    params.categoryName = "化学";
    params.rows = 1000;
    that.hoolaiCmsAPI.getList(params, function(result) {
      var list = [];
      _.forEach(result.rows, function(item, key) {
        item.fields.id = item.id;
        list.push(item.fields);
      });
      that.setCache(key, list);
      that.huaxues = list;
      callback(list);
    });
  },
  joinJineng: function(item) {
    var that = this;
    var bo = true;
    var n = 1;
    var jineng = [];
    while (bo) {
      var object = item["技能id-" + n];
      if (!object) {
        bo = false;
        break;
      }
      jineng.push(object);
      n++;
    }
    return jineng;
  },
  joinHuaxue: function(item) {
    var that = this;
    var bo = true;
    var n = 1;
    var huaxue = [];
    while (bo) {
      var object = item["化学-" + n];
      if (!object) {
        bo = false;
        break;
      }
      huaxue.push(object);
      n++;
    }
    return huaxue;
  },
  getPlayerById: function(players, id) {
    var list = _.filter(players, function(o) {
      return o.id + "" === id;
    });
    if (list.length > 0) {
      return list[0];
    }
    return null;
  },
  getJinengById: function(jinengs, id) {
    var list = _.filter(jinengs, function(o) {
      return o.id + "" === id;
    });
    if (list.length > 0) {
      return list[0];
    }
    return null;
  },
  getHuaxueById: function(huaxues, id) {
    var list = _.filter(huaxues, function(o) {
      return o.id + "" === id;
    });
    if (list.length > 0) {
      return list[0];
    }
    return null;
  }
};
