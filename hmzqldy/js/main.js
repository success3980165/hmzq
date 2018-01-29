'use strict';

/* variables define */
// eslint-disable-next-line no-unused-vars

// var digger = require('js/vendor/digger.min.js');

var _hmt;

/* client device & os detect */
function isAndroid() {
  return $.ua.os.name === 'Android';
}

function isiOS() {
  return $.ua.os.name === 'iOS';
}

function isWechat() {
  return $.ua.browser.name === 'WeChat';
}

function isWeibo() {
  return /weibo/i.test($.ua.ua);
}

/* parse params */
var searchParams = new URLSearchParams(window.location.search.slice(1));
console.log(searchParams)

/* get channel info */
axios.get('./data/test.json')
  .then(function(response) {
    return response.data;
    console.log('axios:')
    console.log(response.data)
  }).then(function(data) {
    var json = eval('(' + data + ')');
    // var json = JSON.parse(JSON.stringify(data))
    return json.channels;
  }).then(function(channels) {
    var downloadUrl;
    var channelId = searchParams.get('channel');
    var len = channels.length;
    for (var i = 0; i < len; i++) {
      if (channels[i].channelId == channelId) {
        var channel = channels[i];

        /*-------------这里取得是安卓下载地址，如果是ios 请取值为channel.content.download.iosUrl------------------*/
        downloadUrl = channel.content.download.iosUrl;

        console.log('downloadurl: ')
        console.log(channel.content.download.androidUrl)
      }
    }

    // eslint-disable-next-line no-unused-vars
    var app = new Vue({
      el: '.wrap',
      data: {
        channel: channel,
        show: false,
        iosUrl: 'javascript:;',
        androidUrl: 'javascript:;',
        bgObject: {},
        object1: {
          animated: true,
          fadeIn: false,
        },
        object2: {
          animated: true,
          fadeIn: false,
        },
        isBg1: true,
        isBg_p: true,
        isBg_f: false,
        play_show: false
      },
      created: function() {
        var that = this;
        //百度统计 start
        _hmt = _hmt || [];
        var hm = document.createElement('script');
        hm.src = 'https://hm.baidu.com/hm.js?' + channel.content.baiduAnalytic;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(hm, s);
        //百度统计 end
        that.bgObject = {
          background: '#fff url(' + channel.content.bgImg + ') no-repeat'
        };
      },
      methods: {
        androidClick: function() {
          if (isWechat() || isWeibo()) {
            this.show = true;
          } else {
            // this.androidUrl = channel.content.download.androidUrl;
            window.location.replace(channel.content.download.androidUrl);
          }
          window._hmt.push(['_trackEvent', 'software', 'androidClick', 'ttplayer']);
        },
        iosClick: function() {
          if (isWechat() || isWeibo()) {
            this.show = true;
          } else {
            window.location.replace(channel.content.download.iosUrl);
            // this.iosUrl = channel.content.download.iosUrl;
          }
          window._hmt.push(['_trackEvent', 'software', 'iosClick', 'ttplayer']);
        },
        closeTip: function() {
          this.show = false;
        },
        puzzleSolve: function() {
          this.isBg1 = true,
            this.object1.fadeIn = true,
            this.isBg_p = true,
            this.isBg_f = false
        },
        findClue: function() {
          this.isBg1 = false,
            this.object2.fadeIn = true,
            this.isBg_p = false,
            this.isBg_f = true
        },
        playVideo: function() {
          this.play_show = true
        },
        closeVideo: function() {
          this.play_show = false
        }
      }
    });

    return downloadUrl;
  })
  .then(function(downloadUrl) {
    var _digger_ = {
      disablePageViewTrack: false,
      trackerUrlMap: {
        pageView: ['//bicollect.hulai.com:8182/api'],
        click: ['//bicollect.hulai.com:8182/api']
      },
      cookieDomain: '',
      strictMode: {
        paramOrder: {
          '//bicollect.hulai.com:8182/api': ['cookie', 'url', 'referer', 'metric', 'snid', 'gameid', 'downloadUrl', 'act']
        },
        disableDefaultParams: true
      },
      extendParams: {
        metric: 'Landing',
        snid: window.snid,
        gameid: window.gameid,
        referer: document.referrer ? document.referrer : '',
        act: 'visit',
        downloadUrl: ''
      },
      trackCookieKeys: {
        cookie: 'cookie_id'
      },
      trackLocalStorageKeys: {
        latitude: 'location.latitude',
        longitude: 'location.longitude'
      },
      eventConfigArr: [{
        eventType: 'click',
        selectors: ["a[id='android']"],
        extendParams: {
          event_flag: 'downloadClick',
          act: 'click',
          downloadUrl: downloadUrl
        }
      }]
    };
    return _digger_;
  }).then(function(_digger_) {
    // digger(_digger_);
  }).catch(function() {
    // var el = document.getElementsByClassName('message');
    // el.parentNode.replaceChild('<>')
    // var model = $('[data-remodal-id=modal]').remodal();
    // model.open(); 1700
  });

function digger(e) {
  function r(e) {
    return unescape(R(e))
  }

  function t(e) {
    var r = typeof e;
    return "undefined" !== r
  }

  function n(e) {
    return "function" == typeof e
  }

  function i(e) {
    return "object" == typeof e
  }

  function a(e) {
    return "string" == typeof e || e instanceof String
  }

  function o(e, r) {
    return null === e || void 0 === e || !r && "" === e || te(e) && 0 === e.length
  }

  function u(e, r) {
    if (e && r && "object" == typeof r) {
      var t;
      for (t in r) e[t] = r[t]
    }
    return e
  }

  function s(e, r, t, n, i, a) {
    var o;
    t && (o = new Date, o.setTime(o.getTime() + t)), I.cookie = e + "=" + R(r) + (t ? ";expires=" + o.toGMTString() : "") + ";path=" + (n || "/") + (i ? ";domain=" + i : "") + (a ? ";secure" : "")
  }

  function f(e) {
    var r = new RegExp("(^|;)[ ]*" + e + "=([^;]*)"),
      t = r.exec(I.cookie);
    return t ? _(t[2]) : null
  }

  function c() {
    if (!t(F.cookieEnabled)) {
      var e = getCookieName("testcookie");
      return s(e, "1"), "1" === f(e) ? "1" : "0"
    }
    return F.cookieEnabled ? "1" : "0"
  }

  function l() {
    var e, r, i = {
        pdf: "application/pdf",
        qt: "video/quicktime",
        realp: "audio/x-pn-realaudio-plugin",
        wma: "application/x-mplayer2",
        dir: "application/x-director",
        fla: "application/x-shockwave-flash",
        java: "application/x-java-vm",
        gears: "application/x-googlegears",
        ag: "application/x-silverlight"
      },
      a = L.devicePixelRatio || 1;
    if (!new RegExp("MSIE").test(F.userAgent)) {
      if (F.mimeTypes && F.mimeTypes.length)
        for (e in i) Object.prototype.hasOwnProperty.call(i, e) && (r = F.mimeTypes[i[e]], O[e] = r && r.enabledPlugin ? "1" : "0");
      "unknown" != typeof navigator.javaEnabled && t(F.javaEnabled) && F.javaEnabled() && (O.java = "1"), n(L.GearsFactory) && (O.gears = "1"), O.cookie = c()
    }
    var o = parseInt(U.width, 10) * a,
      u = parseInt(U.height, 10) * a;
    O.res = parseInt(o, 10) + "x" + parseInt(u, 10)
  }

  function d() {
    return B((F.userAgent || "") + (F.platform || "") + JSON.stringify(O) + (new Date).getTime() + Math.random()).slice(0, 16)
  }

  function g(e) {
    var r = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"),
      t = r.exec(e);
    return t ? t[1] : e
  }

  function h(e) {
    var t, n, i, a, o, u, s, f, c, l, d = function(e, r) {
        return e << r | e >>> 32 - r
      },
      g = function(e) {
        var r, t, n = "";
        for (r = 7; r >= 0; r--) t = e >>> 4 * r & 15, n += t.toString(16);
        return n
      },
      h = [],
      v = 1732584193,
      m = 4023233417,
      p = 2562383102,
      A = 271733878,
      y = 3285377520,
      b = [];
    for (e = r(e), l = e.length, n = 0; n < l - 3; n += 4) i = e.charCodeAt(n) << 24 | e.charCodeAt(n + 1) << 16 | e.charCodeAt(n + 2) << 8 | e.charCodeAt(n + 3), b.push(i);
    switch (3 & l) {
      case 0:
        n = 2147483648;
        break;
      case 1:
        n = e.charCodeAt(l - 1) << 24 | 8388608;
        break;
      case 2:
        n = e.charCodeAt(l - 2) << 24 | e.charCodeAt(l - 1) << 16 | 32768;
        break;
      case 3:
        n = e.charCodeAt(l - 3) << 24 | e.charCodeAt(l - 2) << 16 | e.charCodeAt(l - 1) << 8 | 128
    }
    for (b.push(n); 14 !== (15 & b.length);) b.push(0);
    for (b.push(l >>> 29), b.push(l << 3 & 4294967295), t = 0; t < b.length; t += 16) {
      for (n = 0; n < 16; n++) h[n] = b[t + n];
      for (n = 16; n <= 79; n++) h[n] = d(h[n - 3] ^ h[n - 8] ^ h[n - 14] ^ h[n - 16], 1);
      for (a = v, o = m, u = p, s = A, f = y, n = 0; n <= 19; n++) c = d(a, 5) + (o & u | ~o & s) + f + h[n] + 1518500249 & 4294967295, f = s, s = u, u = d(o, 30), o = a, a = c;
      for (n = 20; n <= 39; n++) c = d(a, 5) + (o ^ u ^ s) + f + h[n] + 1859775393 & 4294967295, f = s, s = u, u = d(o, 30), o = a, a = c;
      for (n = 40; n <= 59; n++) c = d(a, 5) + (o & u | o & s | u & s) + f + h[n] + 2400959708 & 4294967295, f = s, s = u, u = d(o, 30), o = a, a = c;
      for (n = 60; n <= 79; n++) c = d(a, 5) + (o ^ u ^ s) + f + h[n] + 3395469782 & 4294967295, f = s, s = u, u = d(o, 30), o = a, a = c;
      v = v + a & 4294967295, m = m + o & 4294967295, p = p + u & 4294967295, A = A + s & 4294967295, y = y + f & 4294967295
    }
    return c = g(v) + g(m) + g(p) + g(A) + g(y), c.toLowerCase()
  }

  function v(e, r, t, n) {
    return e.addEventListener ? (e.addEventListener(r, t, n), !0) : e.attachEvent ? e.attachEvent("on" + r, t) : void(e["on" + r] = t)
  }

  function m(e) {
    switch (e.type) {
      case "click":
        E(e)
    }
  }

  function p() {
    var e = "";
    try {
      e = L.top.document.referrer
    } catch (r) {
      if (L.parent) try {
        e = L.parent.document.referrer
      } catch (r) {
        e = ""
      }
    }
    return "" === e && (e = I.referrer), e
  }

  function A() {
    var e = {};
    for (var r in Q) e[r] = R(f(Q[r]));
    return e
  }

  function y() {
    var e = {};
    for (var r in X) e[r] = R(M.getItem(X[r]));
    return e
  }

  function w(e) {
    if (!e) return "";
    var r = "";
    for (var t in e) r += t + "=" + R(e[t]) + "&";
    return r.length > 0 ? r.substring(0, r.length - 1) : r
  }

  function k(e, r, t) {
    var n = new Image(1, 1);
    n.onload = function() {
      S = 0, "function" == typeof t && t()
    }, n.src = e + (e.indexOf("?") < 0 ? "?" : "") + r
  }

  function C(e) {
    if (!window.DmallAnalysis.digger.config.overrideParams || !i(window.DmallAnalysis.digger.config.overrideParams)) return e;
    for (var r in window.DmallAnalysis.digger.config.overrideParams) void 0 !== e[r] && (e[r] = window.DmallAnalysis.digger.config.overrideParams[r]);
    return e
  }

  function N() {
    var e = {},
      r = f(q + "uuid"),
      t = 24 * z * 60 * 60,
      n = f("cookie_id");
    return e = u(e, A()), e = u(e, Y), M && (e = u(e, y())), o(r) && (s(q + "uuid", d(), t, J, G || g(L.location.href)), r = f(q + "uuid")), o(n) && (n = Date.now() + String(r).substr(0, 5), s("cookie_id", n, t, J, G || g(L.location.href))), e[q + "uuid"] = f(q + "uuid"), e.cookie_id = n, e.url = I.URL, e.refer_url = p(), e.pageTitle = $, e
  }

  function x(e, r) {
    if (!re) return C(e);
    var t = {},
      n = re.paramOrder[r];
    if (!n) return C(e);
    for (var i = 0; i < n.length; i++) t[n[i]] = e[n[i]];
    if (re && re.disableDefaultParams) return C(t);
    for (var a in e) void 0 === t[a] && (t[a] = e[a]);
    return C(t)
  }

  function D() {
    window.DmallAnalysis || (window.DmallAnalysis = {}), window.DmallAnalysis.digger || (window.DmallAnalysis.digger = {}), window.DmallAnalysis.digger.config || (window.DmallAnalysis.digger.config = {})
  }

  function T(e) {
    D(), window.DmallAnalysis.digger.config.overrideParams = e
  }

  function P() {
    D();
    var e = N(),
      r = {};
    e.action = j.pageVie;
    for (var t in Z)
      if ("pageView" === t)
        if (te(Z[t]))
          for (var n in Z[t]) r = x(e, Z[t][n]), k(Z[t][n], w(r));
        else a(Z[t]) && (r = x(e, Z[t]), k(Z[t], w(r)))
  }

  function E(e) {
    for (var r = (e.currentTarget || e.target, {}), t = N(), n = {}, i = 0; i < ee.length; i++)
      if ("click" === e.type) {
        r = ee[i];
        break
      }
    if (r)
      if (r.extendParams && (t = u(t, r.extendParams)), t.action = j.click, n = x(t, Z.click), te(Z.click))
        for (var o in Z.click) k(Z.click[o], w(n));
      else a(Z[b]) && k(Z.click, w(n))
  }

  function V() {
    if (ee && !(ee.length < 1))
      for (var e = 0; e < ee.length; e++) {
        var r = ee[e].eventType,
          t = ee[e].selectors,
          n = [];
        if (!t) break;
        if (a(t) && (n = n.concat(ne.find(t))), te(t))
          for (var i = 0; i < t.length; i++) n = n.concat(ne.find(t[i]));
        ee[e].currentTargets = n;
        for (var o = 0; o < n.length; o++) v(n[o], r, m, !1)
      }
  }
  var S, j = {
      pageView: "0",
      download: "1",
      click: "2",
      link: "3"
    },
    O = {},
    H = {},
    I = document,
    F = navigator,
    U = screen,
    L = window,
    M = localStorage,
    R = (L.performance || L.mozPerformance || L.msPerformance || L.webkitPerformance, L.encodeURIComponent),
    _ = L.decodeURIComponent,
    q = (unescape, "_digger_"),
    B = h,
    K = (e && e.disableUUID, e && e.disablePageViewTrack),
    W = e && e.disableAutoReport,
    G = e && e.cookieDomain ? e.cookieDomain : "",
    z = e && e.expireDay ? e.expireDay : 365,
    J = e && e.cookiePath ? e.cookiePath : "/",
    Q = e && e.trackCookieKeys ? e.trackCookieKeys : {},
    X = e && e.trackLocalStorageKeys ? e.trackLocalStorageKeys : {},
    Y = e && e.extendParams ? e.extendParams : {},
    Z = e && e.trackerUrlMap ? u(H, e.trackerUrlMap) : H,
    $ = e && e.trackerTitle ? e.trackerTitle : I.title,
    ee = e && e.eventConfigArr ? e.eventConfigArr : [],
    re = !(!e || !e.strictMode) && e.strictMode,
    te = "isArray" in Array ? Array.isArray : function(e) {
      return "[object Array]" === toString.call(e)
    },
    ne = {
      htmlCollectionToArray: function(e) {
        var r, t = [];
        if (!e || !e.length) return t;
        for (r = 0; r < e.length; r++) t.push(e[r]);
        return t
      },
      find: function(e) {
        if (!document.querySelectorAll || !e) return [];
        var r = document.querySelectorAll(e);
        return this.htmlCollectionToArray(r)
      },
      findMultiple: function(e) {
        if (!e || !e.length) return [];
        var r, t, n = [];
        for (r = 0; r < e.length; r++) t = this.find(e[r]), n = n.concat(t);
        return n = this.makeNodesUnique(n)
      },
      findNodesByTagName: function(e, r) {
        if (!e || !r || !e.getElementsByTagName) return [];
        var t = e.getElementsByTagName(r);
        return this.htmlCollectionToArray(t)
      },
      makeNodesUnique: function(e) {
        var r = [].concat(e);
        if (e.sort(function(e, t) {
            if (e === t) return 0;
            var n = indexOfArray(r, e),
              i = indexOfArray(r, t);
            return n === i ? 0 : n > i ? -1 : 1
          }), e.length <= 1) return e;
        var t, n = 0,
          i = 0,
          a = [];
        for (t = e[n++]; t;) t === e[n] && (i = a.push(n)), t = e[n++] || null;
        for (; i--;) e.splice(a[i], 1);
        return e
      },
      getAttributeValueFromNode: function(e, r) {
        if (this.hasNodeAttribute(e, r)) {
          if (e && e.getAttribute) return e.getAttribute(r);
          if (e && e.attributes) {
            var t = typeof e.attributes[r];
            if ("undefined" !== t) {
              if (e.attributes[r].value) return e.attributes[r].value;
              if (e.attributes[r].nodeValue) return e.attributes[r].nodeValue;
              var n, i = e.attributes;
              if (i) {
                for (n = 0; n < i.length; n++)
                  if (i[n].nodeName === r) return i[n].nodeValue;
                return null
              }
            }
          }
        }
      },
      hasNodeAttributeWithValue: function(e, r) {
        var t = this.getAttributeValueFromNode(e, r);
        return !!t
      },
      hasNodeAttribute: function(e, r) {
        if (e && e.hasAttribute) return e.hasAttribute(r);
        if (e && e.attributes) {
          var t = typeof e.attributes[r];
          return "undefined" !== t
        }
        return !1
      },
      hasNodeCssClass: function(e, r) {
        if (e && r && e.className) {
          var t = "string" == typeof e.className ? e.className.split(" ") : [];
          if (-1 !== indexOfArray(t, r)) return !0
        }
        return !1
      },
      findNodesHavingAttribute: function(e, r, t) {
        if (t || (t = []), !e || !r) return t;
        var n = getChildrenFromNode(e);
        if (!n || !n.length) return t;
        var i, a;
        for (i = 0; i < n.length; i++) a = n[i], this.hasNodeAttribute(a, r) && t.push(a), t = this.findNodesHavingAttribute(a, r, t);
        return t
      },
      findFirstNodeHavingAttribute: function(e, r) {
        if (e && r) {
          if (this.hasNodeAttribute(e, r)) return e;
          var t = this.findNodesHavingAttribute(e, r);
          return t && t.length ? t[0] : void 0
        }
      },
      findFirstNodeHavingAttributeWithValue: function(e, r) {
        if (e && r) {
          if (this.hasNodeAttributeWithValue(e, r)) return e;
          var t = this.findNodesHavingAttribute(e, r);
          if (t && t.length) {
            var n;
            for (n = 0; n < t.length; n++)
              if (this.getAttributeValueFromNode(t[n], r)) return t[n]
          }
        }
      },
      findNodesHavingCssClass: function(e, r, t) {
        if (t || (t = []), !e || !r) return t;
        if (e.getElementsByClassName) {
          var n = e.getElementsByClassName(r);
          return this.htmlCollectionToArray(n)
        }
        var i = getChildrenFromNode(e);
        if (!i || !i.length) return [];
        var a, o;
        for (a = 0; a < i.length; a++) o = i[a], this.hasNodeCssClass(o, r) && t.push(o), t = this.findNodesHavingCssClass(o, r, t);
        return t
      },
      findFirstNodeHavingClass: function(e, r) {
        if (e && r) {
          if (this.hasNodeCssClass(e, r)) return e;
          var t = this.findNodesHavingCssClass(e, r);
          return t && t.length ? t[0] : void 0
        }
      },
      isLinkElement: function(e) {
        if (!e) return !1;
        var r = String(e.nodeName).toLowerCase(),
          t = ["a", "area"],
          n = indexOfArray(t, r);
        return n !== -1
      },
      setAnyAttribute: function(e, r, t) {
        e && r && (e.setAttribute ? e.setAttribute(r, t) : e[r] = t)
      }
    };
  return D(), l(), V(), K || W || P(), window.DmallAnalysis.digger = Object.assign(window.DmallAnalysis.digger, {
    sendPageViewTracker: P,
    setOverrideParams: T
  }), window.DmallAnalysis
}
