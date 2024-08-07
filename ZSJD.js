//Wed Aug 07 2024 02:21:41 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
/**
 * cron "10,30 9 * * *" ZSJD.js
 * export ZSJD="accountId&token accountId&token"
 * export OCR_SERVER="ocr服务"
 */
const $ = new Env("掌上金东");
const notify = $.isNode() ? require("../sendNotify") : "";
(() => {
  function b(S) {
    b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (V) {
      return typeof V;
    } : function (V) {
      return V && "function" == typeof Symbol && V.constructor === Symbol && V !== Symbol.prototype ? "symbol" : typeof V;
    };
    return b(S);
  }
  function c(S, T) {
    var V = "undefined" != typeof Symbol && S[Symbol.iterator] || S["@@iterator"];
    if (!V) {
      if (Array.isArray(S) || (V = g(S)) || T && S && "number" == typeof S.length) {
        V && (S = V);
        var W = 0,
          X = function () {};
        return {
          s: X,
          n: function () {
            var a2 = {
              done: !0
            };
            return W >= S.length ? a2 : {
              done: !1,
              value: S[W++]
            };
          },
          e: function (a2) {
            throw a2;
          },
          f: X
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var Y,
      Z = !0,
      a0 = !1;
    return {
      s: function () {
        V = V.call(S);
      },
      n: function () {
        var a3 = V.next();
        Z = a3.done;
        return a3;
      },
      e: function (a3) {
        a0 = !0;
        Y = a3;
      },
      f: function () {
        try {
          Z || null == V.return || V.return();
        } finally {
          if (a0) {
            throw Y;
          }
        }
      }
    };
  }
  function d(S, T) {
    return j(S) || i(S, T) || g(S, T) || f();
  }
  function f() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function g(S, T) {
    if (S) {
      if ("string" == typeof S) {
        return h(S, T);
      }
      var V = {}.toString.call(S).slice(8, -1);
      "Object" === V && S.constructor && (V = S.constructor.name);
      return "Map" === V || "Set" === V ? Array.from(S) : "Arguments" === V || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(V) ? h(S, T) : void 0;
    }
  }
  function h(S, T) {
    (null == T || T > S.length) && (T = S.length);
    for (var V = 0, W = Array(T); V < T; V++) {
      W[V] = S[V];
    }
    return W;
  }
  function i(S, T) {
    var V = null == S ? null : "undefined" != typeof Symbol && S[Symbol.iterator] || S["@@iterator"];
    if (null != V) {
      var W,
        X,
        Y,
        Z,
        a0 = [],
        a1 = !0,
        a2 = !1;
      try {
        if (Y = (V = V.call(S)).next, 0 === T) {
          if (Object(V) !== V) {
            return;
          }
          a1 = !1;
        } else {
          for (; !(a1 = (W = Y.call(V)).done) && (a0.push(W.value), a0.length !== T); a1 = !0) {}
        }
      } catch (a6) {
        a2 = !0;
        X = a6;
      } finally {
        try {
          if (!a1 && null != V.return && (Z = V.return(), Object(Z) !== Z)) {
            return;
          }
        } finally {
          if (a2) {
            throw X;
          }
        }
      }
      return a0;
    }
  }
  function j(S) {
    if (Array.isArray(S)) {
      return S;
    }
  }
  function k() {
    'use strict';

    k = function () {
      return V;
    };
    var U,
      V = {},
      W = Object.prototype,
      X = W.hasOwnProperty,
      Y = Object.defineProperty || function (aq, ar, as) {
        aq[ar] = as.value;
      },
      Z = "function" == typeof Symbol ? Symbol : {},
      a0 = Z.iterator || "@@iterator",
      a1 = Z.asyncIterator || "@@asyncIterator",
      a2 = Z.toStringTag || "@@toStringTag";
    function a3(aq, ar, as) {
      var at = {
        value: as,
        enumerable: !0,
        configurable: !0,
        writable: !0
      };
      Object.defineProperty(aq, ar, at);
      return aq[ar];
    }
    try {
      a3({}, "");
    } catch (ar) {
      a3 = function (as, at, au) {
        return as[at] = au;
      };
    }
    function a4(at, au, av, aw) {
      var ax = au && au.prototype instanceof ab ? au : ab,
        ay = Object.create(ax.prototype),
        az = new ao(aw || []);
      Y(ay, "_invoke", {
        value: ak(at, av, az)
      });
      return ay;
    }
    function a5(at, au, av) {
      try {
        return {
          type: "normal",
          arg: at.call(au, av)
        };
      } catch (az) {
        var ax = {
          type: "throw",
          arg: az
        };
        return ax;
      }
    }
    V.wrap = a4;
    var a6 = "suspendedStart",
      a7 = "suspendedYield",
      a8 = "executing",
      a9 = "completed",
      aa = {};
    function ab() {}
    function ac() {}
    function ad() {}
    var ae = {};
    a3(ae, a0, function () {
      return this;
    });
    var af = Object.getPrototypeOf,
      ag = af && af(af(ap([])));
    ag && ag !== W && X.call(ag, a0) && (ae = ag);
    ad.prototype = ab.prototype = Object.create(ae);
    var ah = ad.prototype;
    function ai(at) {
      ["next", "throw", "return"].forEach(function (aw) {
        a3(at, aw, function (ay) {
          return this._invoke(aw, ay);
        });
      });
    }
    function aj(at, au) {
      function ax(ay, az, aA, aB) {
        var aD = a5(at[ay], at, az);
        if ("throw" !== aD.type) {
          var aE = aD.arg,
            aF = aE.value;
          return aF && "object" == b(aF) && X.call(aF, "__await") ? au.resolve(aF.__await).then(function (aG) {
            ax("next", aG, aA, aB);
          }, function (aG) {
            ax("throw", aG, aA, aB);
          }) : au.resolve(aF).then(function (aG) {
            aE.value = aG;
            aA(aE);
          }, function (aG) {
            return ax("throw", aG, aA, aB);
          });
        }
        aB(aD.arg);
      }
      var aw;
      Y(this, "_invoke", {
        value: function (ay, az) {
          function aB() {
            return new au(function (aE, aF) {
              ax(ay, az, aE, aF);
            });
          }
          return aw = aw ? aw.then(aB, aB) : aB();
        }
      });
    }
    function ak(at, au, av) {
      var ax = a6;
      return function (az, aA) {
        if (ax === a8) {
          throw Error("Generator is already running");
        }
        if (ax === a9) {
          if ("throw" === az) {
            throw aA;
          }
          var aC = {
            value: U,
            done: !0
          };
          return aC;
        }
        for (av.method = az, av.arg = aA;;) {
          var aD = av.delegate;
          if (aD) {
            var aE = al(aD, av);
            if (aE) {
              if (aE === aa) {
                continue;
              }
              return aE;
            }
          }
          if ("next" === av.method) {
            av.sent = av._sent = av.arg;
          } else {
            if ("throw" === av.method) {
              if (ax === a6) {
                throw ax = a9, av.arg;
              }
              av.dispatchException(av.arg);
            } else {
              "return" === av.method && av.abrupt("return", av.arg);
            }
          }
          ax = a8;
          var aF = a5(at, au, av);
          if ("normal" === aF.type) {
            if (ax = av.done ? a9 : a7, aF.arg === aa) {
              continue;
            }
            var aG = {};
            aG.value = aF.arg;
            aG.done = av.done;
            return aG;
          }
          "throw" === aF.type && (ax = a9, av.method = "throw", av.arg = aF.arg);
        }
      };
    }
    function al(at, au) {
      var ay = au.method,
        az = at.iterator[ay];
      if (az === U) {
        au.delegate = null;
        "throw" === ay && at.iterator.return && (au.method = "return", au.arg = U, al(at, au), "throw" === au.method) || "return" !== ay && (au.method = "throw", au.arg = new TypeError("The iterator does not provide a '" + ay + "' method"));
        return aa;
      }
      var aA = a5(az, at.iterator, au.arg);
      if ("throw" === aA.type) {
        au.method = "throw";
        au.arg = aA.arg;
        au.delegate = null;
        return aa;
      }
      var ax = aA.arg;
      return ax ? ax.done ? (au[at.resultName] = ax.value, au.next = at.nextLoc, "return" !== au.method && (au.method = "next", au.arg = U), au.delegate = null, aa) : ax : (au.method = "throw", au.arg = new TypeError("iterator result is not an object"), au.delegate = null, aa);
    }
    function am(at) {
      var au = {
        tryLoc: at[0]
      };
      var av = au;
      1 in at && (av.catchLoc = at[1]);
      2 in at && (av.finallyLoc = at[2], av.afterLoc = at[3]);
      this.tryEntries.push(av);
    }
    function an(at) {
      var av = at.completion || {};
      av.type = "normal";
      delete av.arg;
      at.completion = av;
    }
    function ao(at) {
      var au = {
        tryLoc: "root"
      };
      this.tryEntries = [au];
      at.forEach(am, this);
      this.reset(!0);
    }
    function ap(at) {
      if (at || "" === at) {
        var av = at[a0];
        if (av) {
          return av.call(at);
        }
        if ("function" == typeof at.next) {
          return at;
        }
        if (!isNaN(at.length)) {
          var aw = -1,
            ax = function az() {
              for (; ++aw < at.length;) {
                if (X.call(at, aw)) {
                  az.value = at[aw];
                  az.done = !1;
                  return az;
                }
              }
              az.value = U;
              az.done = !0;
              return az;
            };
          return ax.next = ax;
        }
      }
      throw new TypeError(b(at) + " is not iterable");
    }
    ac.prototype = ad;
    Y(ah, "constructor", {
      value: ad,
      configurable: !0
    });
    Y(ad, "constructor", {
      value: ac,
      configurable: !0
    });
    ac.displayName = a3(ad, a2, "GeneratorFunction");
    V.isGeneratorFunction = function (at) {
      var av = "function" == typeof at && at.constructor;
      return !!av && (av === ac || "GeneratorFunction" === (av.displayName || av.name));
    };
    V.mark = function (at) {
      Object.setPrototypeOf ? Object.setPrototypeOf(at, ad) : (at.__proto__ = ad, a3(at, a2, "GeneratorFunction"));
      at.prototype = Object.create(ah);
      return at;
    };
    V.awrap = function (at) {
      var av = {
        __await: at
      };
      return av;
    };
    ai(aj.prototype);
    a3(aj.prototype, a1, function () {
      return this;
    });
    V.AsyncIterator = aj;
    V.async = function (at, au, av, aw, ax) {
      void 0 === ax && (ax = Promise);
      var az = new aj(a4(at, au, av, aw), ax);
      return V.isGeneratorFunction(au) ? az : az.next().then(function (aA) {
        return aA.done ? aA.value : az.next();
      });
    };
    ai(ah);
    a3(ah, a2, "Generator");
    a3(ah, a0, function () {
      return this;
    });
    a3(ah, "toString", function () {
      return "[object Generator]";
    });
    V.keys = function (at) {
      var av = Object(at),
        aw = [];
      for (var ax in av) aw.push(ax);
      aw.reverse();
      return function az() {
        for (; aw.length;) {
          var aB = aw.pop();
          if (aB in av) {
            az.value = aB;
            az.done = !1;
            return az;
          }
        }
        az.done = !0;
        return az;
      };
    };
    V.values = ap;
    ao.prototype = {
      constructor: ao,
      reset: function (at) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = U, this.done = !1, this.delegate = null, this.method = "next", this.arg = U, this.tryEntries.forEach(an), !at) {
          for (var au in this) "t" === au.charAt(0) && X.call(this, au) && !isNaN(+au.slice(1)) && (this[au] = U);
        }
      },
      stop: function () {
        this.done = !0;
        var at = this.tryEntries[0].completion;
        if ("throw" === at.type) {
          throw at.arg;
        }
        return this.rval;
      },
      dispatchException: function (at) {
        if (this.done) {
          throw at;
        }
        var av = this;
        function aC(aD, aE) {
          ay.type = "throw";
          ay.arg = at;
          av.next = aD;
          aE && (av.method = "next", av.arg = U);
          return !!aE;
        }
        for (var aw = this.tryEntries.length - 1; aw >= 0; --aw) {
          var ax = this.tryEntries[aw],
            ay = ax.completion;
          if ("root" === ax.tryLoc) {
            return aC("end");
          }
          if (ax.tryLoc <= this.prev) {
            var az = X.call(ax, "catchLoc"),
              aA = X.call(ax, "finallyLoc");
            if (az && aA) {
              if (this.prev < ax.catchLoc) {
                return aC(ax.catchLoc, !0);
              }
              if (this.prev < ax.finallyLoc) {
                return aC(ax.finallyLoc);
              }
            } else {
              if (az) {
                if (this.prev < ax.catchLoc) {
                  return aC(ax.catchLoc, !0);
                }
              } else {
                if (!aA) {
                  throw Error("try statement without catch or finally");
                }
                if (this.prev < ax.finallyLoc) {
                  return aC(ax.finallyLoc);
                }
              }
            }
          }
        }
      },
      abrupt: function (at, au) {
        for (var ax = this.tryEntries.length - 1; ax >= 0; --ax) {
          var ay = this.tryEntries[ax];
          if (ay.tryLoc <= this.prev && X.call(ay, "finallyLoc") && this.prev < ay.finallyLoc) {
            var az = ay;
            break;
          }
        }
        az && ("break" === at || "continue" === at) && az.tryLoc <= au && au <= az.finallyLoc && (az = null);
        var aA = az ? az.completion : {};
        aA.type = at;
        aA.arg = au;
        return az ? (this.method = "next", this.next = az.finallyLoc, aa) : this.complete(aA);
      },
      complete: function (at, au) {
        if ("throw" === at.type) {
          throw at.arg;
        }
        "break" === at.type || "continue" === at.type ? this.next = at.arg : "return" === at.type ? (this.rval = this.arg = at.arg, this.method = "return", this.next = "end") : "normal" === at.type && au && (this.next = au);
        return aa;
      },
      finish: function (at) {
        for (var aw = this.tryEntries.length - 1; aw >= 0; --aw) {
          var ax = this.tryEntries[aw];
          if (ax.finallyLoc === at) {
            this.complete(ax.completion, ax.afterLoc);
            an(ax);
            return aa;
          }
        }
      },
      catch: function (at) {
        for (var aw = this.tryEntries.length - 1; aw >= 0; --aw) {
          var ax = this.tryEntries[aw];
          if (ax.tryLoc === at) {
            var ay = ax.completion;
            if ("throw" === ay.type) {
              var az = ay.arg;
              an(ax);
            }
            return az;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function (at, au, av) {
        this.delegate = {
          iterator: ap(at),
          resultName: au,
          nextLoc: av
        };
        "next" === this.method && (this.arg = U);
        return aa;
      }
    };
    return V;
  }
  function l(S, T, U, V, W, X, Y) {
    try {
      var a0 = S[X](Y),
        a1 = a0.value;
    } catch (a4) {
      return void U(a4);
    }
    a0.done ? T(a1) : Promise.resolve(a1).then(V, W);
  }
  function m(S) {
    return function () {
      var U = this,
        V = arguments;
      return new Promise(function (W, X) {
        var Y = S.apply(U, V);
        function Z(a1) {
          l(Y, W, X, Z, a0, "next", a1);
        }
        function a0(a1) {
          l(Y, W, X, Z, a0, "throw", a1);
        }
        Z(void 0);
      });
    };
  }
  var n = ($.isNode() ? process.env.ZSJD : $.getdata("ZSJD")) || "",
    o = ($.isNode() ? process.env.OCR_SERVER : $.getdata("OCR_SERVER")) || "https://ddddocr.xzxxn7.live",
    p = void 0,
    q = "",
    r = "",
    s = "",
    t = "",
    u = "",
    v = "",
    w = "",
    x = "k9o5fc7l6hy2l213",
    y = "35c782a2";
  function z() {
    return A.apply(this, arguments);
  }
  function A() {
    A = m(k().mark(function T() {
      var W, X, Y, Z, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, an, ao, ap, aq, ar, as, at, au, av, aw;
      return k().wrap(function (ax) {
        for (;;) {
          switch (ax.prev = ax.next) {
            case 0:
              if (console.log("作者：@xzxxn777\n频道：https://t.me/xzxxn777\n群组：https://t.me/xzxxn7777\n自用机场推荐：https://xn--diqv0fut7b.com\n"), n) {
                ax.next = 6;
                break;
              }
              console.log("先去boxjs填写账号密码");
              ax.next = 5;
              return Q("先去boxjs填写账号密码");
            case 5:
              return ax.abrupt("return");
            case 6:
              ax.next = 8;
              return O();
            case 8:
              p = ax.sent;
              W = n.split(" ");
              X = c(W);
              ax.prev = 11;
              X.s();
            case 13:
              if ((Y = X.n()).done) {
                ax.next = 154;
                break;
              }
              if (Z = Y.value, console.log("随机生成device"), a0 = M(), t = a0.deviceId, u = a0.model, console.log(t), console.log(u), s = Z.split("&")[0], r = Z.split("&")[1], console.log("用户：".concat(s, "开始任务")), console.log("————————————"), console.log("阅读抽奖"), console.log("获取id"), v) {
                ax.next = 44;
                break;
              }
              ax.next = 30;
              return B("/api/adv/get_adv_float_v1?timestamp=1722742746854&noncestr=ef47f80b74f14f8192cb9ec9725f6439&sign=0270d451eecc93100986e8ee110a42a5");
            case 30:
              if (a2 = ax.sent, a3 = null === (a1 = a2) || void 0 === a1 || null === (a1 = a1.data[0]) || void 0 === a1 ? void 0 : a1.link, a3) {
                ax.next = 39;
                break;
              }
              ax.next = 35;
              return $.wait(10000);
            case 35:
              ax.next = 37;
              return B("/api/adv/get_adv_float_v1?timestamp=1722742746854&noncestr=ef47f80b74f14f8192cb9ec9725f6439&sign=0270d451eecc93100986e8ee110a42a5");
            case 37:
              a2 = ax.sent;
              a3 = null === (a4 = a2) || void 0 === a4 || null === (a4 = a4.data[0]) || void 0 === a4 ? void 0 : a4.link;
            case 39:
              for (a5 = a3.split("?")[1], a6 = {}, a7 = a5.split("&"), a8 = 0, a9 = a7.length; a8 < a9; a8++) {
                aa = a7[a8].split("=");
                a6[aa[0]] = aa[1];
              }
              v = a6.id;
            case 44:
              var aA = {};
              aA.debug = 0;
              aA.userId = "";
              console.log(v);
              console.log("获取key和token");
              ax.next = 48;
              return D("/api/member/login", aA);
            case 48:
              if (ab = ax.sent, 0 == ab.code) {
                ax.next = 53;
                break;
              }
              console.log(ab.message);
              console.log("\n");
              return ax.abrupt("continue", 152);
            case 53:
              y = ab.data.key;
              w = "Bearer " + ab.data.token;
              console.log(y);
              console.log(w);
              console.log("获取抽奖id");
              ax.next = 60;
              return F("/api/study/detail?id=".concat(v), {
                id: v
              });
            case 60:
              ac = ax.sent;
              ad = ac.data.lottery.lottery_id;
              console.log(ad);
              console.log("开始阅读");
              ae = c(ac.data.levels);
              ax.prev = 65;
              ae.s();
            case 67:
              if ((af = ae.n()).done) {
                ax.next = 98;
                break;
              }
              ag = af.value;
              ax.next = 71;
              return F("/api/study/level?id=".concat(ag.id), {
                id: ag.id
              });
            case 71:
              if (ah = ax.sent, console.log(ah.data.level.name), ah.data.level.task_num != ah.data.completedTasks.length) {
                ax.next = 76;
                break;
              }
              console.log("已完成");
              return ax.abrupt("continue", 96);
            case 76:
              ai = c(ah.data.tasks);
              ax.prev = 77;
              ai.s();
            case 79:
              if ((aj = ai.n()).done) {
                ax.next = 88;
                break;
              }
              ak = aj.value;
              console.log("文章：".concat(ak.name));
              ax.next = 84;
              return D("/api/study/task/complete", {
                id: ak.id
              });
            case 84:
              al = ax.sent;
              console.log("完成任务：".concat(al.message));
            case 86:
              ax.next = 79;
              break;
            case 88:
              ax.next = 93;
              break;
            case 90:
              ax.prev = 90;
              ax.t0 = ax.catch(77);
              ai.e(ax.t0);
            case 93:
              ax.prev = 93;
              ai.f();
              return ax.finish(93);
            case 96:
              ax.next = 67;
              break;
            case 98:
              ax.next = 103;
              break;
            case 100:
              ax.prev = 100;
              ax.t1 = ax.catch(65);
              ae.e(ax.t1);
            case 103:
              ax.prev = 103;
              ae.f();
              return ax.finish(103);
            case 106:
              ax.next = 108;
              return D("/api/lotterybigwheel/_ac_lottery_count", {
                id: ad,
                module: "study"
              });
            case 108:
              am = ax.sent;
              console.log("拥有".concat(am.data.count, "次抽奖"));
              an = 0;
            case 111:
              if (!(an < am.data.count)) {
                ax.next = 152;
                break;
              }
              var aB = {};
              aB.id = ad;
              aB.app_id = x;
              aB.module = "study";
              aB.optionHash = "";
              ax.next = 114;
              return D("/api/lotterybigwheel/_ac_lottery", aB);
            case 114:
              if (ao = ax.sent, 10000 != ao.code) {
                ax.next = 148;
                break;
              }
              console.log(ao.message);
              ax.next = 119;
              return D("/api/captcha/get", {
                activity_id: ad,
                module: "bigWheel"
              });
            case 119:
              ap = ax.sent;
              aq = ap.data.jigsawImageUrl;
              ar = ap.data.originalImageUrl;
              console.log("滑块：".concat(aq));
              console.log("背景：".concat(ar));
              as = ap.data.token;
              at = ap.data.secretKey;
              console.log("秘钥：".concat(at));
              ax.next = 129;
              return H({
                slidingImage: aq,
                backImage: ar
              });
            case 129:
              if (au = ax.sent, au) {
                ax.next = 135;
                break;
              }
              console.log("ddddocr服务异常");
              ax.next = 134;
              return Q("ddddocr服务异常");
            case 134:
              return ax.abrupt("continue", 149);
            case 135:
              console.log(au);
              av = J(JSON.stringify({
                x: au.result,
                y: 5
              }), at);
              ax.next = 139;
              return D("/api/captcha/check", {
                activity_id: ad,
                module: "bigWheel",
                cap_token: as,
                point: av
              });
            case 139:
              if (aw = ax.sent, console.log("验证滑块：" + aw.message), "操作成功" != aw.message) {
                ax.next = 146;
                break;
              }
              ax.next = 144;
              return D("/api/lotterybigwheel/_ac_lottery", {
                id: ad,
                app_id: x,
                module: "study",
                optionHash: ""
              });
            case 144:
              ao = ax.sent;
              ao.data.code ? (console.log("抽奖获得：".concat(ao.data.title)), q += "用户：".concat(s, " 抽奖获得：").concat(ao.data.title, "\n")) : (console.log("抽奖获得：".concat(ao.data.tip_title)), q += "用户：".concat(s, " 抽奖获得：").concat(ao.data.tip_title, "\n"));
            case 146:
              ax.next = 149;
              break;
            case 148:
              ao.data.code ? (console.log("抽奖获得：".concat(ao.data.title)), q += "用户：".concat(s, " 抽奖获得：").concat(ao.data.title, "\n")) : (console.log("抽奖获得：".concat(ao.data.tip_title)), q += "用户：".concat(s, " 抽奖获得：").concat(ao.data.tip_title, "\n"));
            case 149:
              an++;
              ax.next = 111;
              break;
            case 152:
              ax.next = 13;
              break;
            case 154:
              ax.next = 159;
              break;
            case 156:
              ax.prev = 156;
              ax.t2 = ax.catch(11);
              X.e(ax.t2);
            case 159:
              ax.prev = 159;
              X.f();
              return ax.finish(159);
            case 162:
              if (!q) {
                ax.next = 165;
                break;
              }
              ax.next = 165;
              return Q(q);
            case 165:
            case "end":
              return ax.stop();
          }
        }
      }, T, null, [[11, 156, 159, 162], [65, 100, 103, 106], [77, 90, 93, 96]]);
    }));
    return A.apply(this, arguments);
  }
  function B(S) {
    return C.apply(this, arguments);
  }
  function C() {
    C = m(k().mark(function T(U) {
      return k().wrap(function (V) {
        for (;;) {
          switch (V.prev = V.next) {
            case 0:
              return V.abrupt("return", new Promise(function (X) {
                var Y = {
                  "x-version": "4.0.5",
                  appid: "puCJwN2uie5THu6c",
                  "x-driver-id": t,
                  "x-phone-models": u,
                  "x-token": r,
                  "x-driver-type": "Android 11",
                  "Accept-Encoding": "gzip",
                  "user-agent": "Dart/2.18 (dart:io)"
                };
                var Z = {
                  url: "https://mapi.cloud.jinhua.com.cn".concat(U),
                  headers: Y
                };
                $.get(Z, function () {
                  var a1 = m(k().mark(function a2(a3, a4, a5) {
                    return k().wrap(function (a7) {
                      for (;;) {
                        switch (a7.prev = a7.next) {
                          case 0:
                            if (a7.prev = 0, !a3) {
                              a7.next = 6;
                              break;
                            }
                            console.log("".concat(JSON.stringify(a3)));
                            console.log("".concat($.name, " API请求失败，请检查网路重试"));
                            a7.next = 9;
                            break;
                          case 6:
                            a7.next = 8;
                            return $.wait(2000);
                          case 8:
                            X(JSON.parse(a5));
                          case 9:
                            a7.next = 14;
                            break;
                          case 11:
                            a7.prev = 11;
                            a7.t0 = a7.catch(0);
                            $.logErr(a7.t0, a4);
                          case 14:
                            a7.prev = 14;
                            X();
                            return a7.finish(14);
                          case 17:
                          case "end":
                            return a7.stop();
                        }
                      }
                    }, a2, null, [[0, 11, 14, 17]]);
                  }));
                  return function (a3, a4, a5) {
                    return a1.apply(this, arguments);
                  };
                }());
              }));
            case 1:
            case "end":
              return V.stop();
          }
        }
      }, T);
    }));
    return C.apply(this, arguments);
  }
  function D(S, T) {
    return E.apply(this, arguments);
  }
  function E() {
    E = m(k().mark(function T(U, V) {
      var W;
      return k().wrap(function (X) {
        for (;;) {
          switch (X.prev = X.next) {
            case 0:
              W = K(V);
              return X.abrupt("return", new Promise(function (Z) {
                var a0 = {
                  "access-type": "app",
                  "access-module": "study",
                  "access-device-id": t,
                  "access-auth-id": s,
                  "access-api-signature": W.signature,
                  "access-nonce-str": W.uuid,
                  authorization: w,
                  "access-app-id": x,
                  "access-timestamp": W.time,
                  "access-api-token": r,
                  accept: "application/json, text/plain, */*",
                  "user-agent": "Mozilla/5.0 (Linux; Android 11; 21091116AC Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.85 Mobile Safari/537.36 JinHua_ZSJD jcy_version:B",
                  "content-type": "application/json; charset=UTF-8",
                  origin: "https://op-h5.cloud.jinhua.com.cn",
                  "x-requested-with": "com.zjonline.zhuji",
                  "sec-fetch-site": "same-site",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-dest": "empty",
                  referer: "https://op-h5.cloud.jinhua.com.cn/",
                  "accept-encoding": "gzip, deflate",
                  "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
                };
                var a1 = {
                  url: "https://op-api.cloud.jinhua.com.cn".concat(U),
                  headers: a0,
                  body: JSON.stringify(V)
                };
                $.post(a1, function () {
                  var a3 = m(k().mark(function a4(a5, a6, a7) {
                    return k().wrap(function (a9) {
                      for (;;) {
                        switch (a9.prev = a9.next) {
                          case 0:
                            if (a9.prev = 0, !a5) {
                              a9.next = 6;
                              break;
                            }
                            console.log("".concat(JSON.stringify(a5)));
                            console.log("".concat($.name, " API请求失败，请检查网路重试"));
                            a9.next = 9;
                            break;
                          case 6:
                            a9.next = 8;
                            return $.wait(2000);
                          case 8:
                            Z(JSON.parse(a7));
                          case 9:
                            a9.next = 14;
                            break;
                          case 11:
                            a9.prev = 11;
                            a9.t0 = a9.catch(0);
                            $.logErr(a9.t0, a6);
                          case 14:
                            a9.prev = 14;
                            Z();
                            return a9.finish(14);
                          case 17:
                          case "end":
                            return a9.stop();
                        }
                      }
                    }, a4, null, [[0, 11, 14, 17]]);
                  }));
                  return function (a5, a6, a7) {
                    return a3.apply(this, arguments);
                  };
                }());
              }));
            case 2:
            case "end":
              return X.stop();
          }
        }
      }, T);
    }));
    return E.apply(this, arguments);
  }
  function F(S, T) {
    return G.apply(this, arguments);
  }
  function G() {
    G = m(k().mark(function T(U, V) {
      var W;
      return k().wrap(function (X) {
        for (;;) {
          switch (X.prev = X.next) {
            case 0:
              W = K(V);
              return X.abrupt("return", new Promise(function (Z) {
                var a1 = {
                  url: "https://op-api.cloud.jinhua.com.cn".concat(U),
                  headers: {
                    "access-type": "app",
                    "access-module": "study",
                    "access-device-id": t,
                    "access-auth-id": s,
                    "access-api-signature": W.signature,
                    "access-nonce-str": W.uuid,
                    authorization: w,
                    "access-app-id": x,
                    "access-timestamp": W.time,
                    "access-api-token": r,
                    accept: "application/json, text/plain, */*",
                    "user-agent": "Mozilla/5.0 (Linux; Android 11; 21091116AC Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.85 Mobile Safari/537.36 JinHua_ZSJD jcy_version:B",
                    origin: "https://op-h5.cloud.jinhua.com.cn",
                    "x-requested-with": "com.zjonline.zhuji",
                    "sec-fetch-site": "same-site",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-dest": "empty",
                    referer: "https://op-h5.cloud.jinhua.com.cn/",
                    "accept-encoding": "gzip, deflate",
                    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
                  }
                };
                $.get(a1, function () {
                  var a2 = m(k().mark(function a3(a4, a5, a6) {
                    return k().wrap(function (a8) {
                      for (;;) {
                        switch (a8.prev = a8.next) {
                          case 0:
                            if (a8.prev = 0, !a4) {
                              a8.next = 6;
                              break;
                            }
                            console.log("".concat(JSON.stringify(a4)));
                            console.log("".concat($.name, " API请求失败，请检查网路重试"));
                            a8.next = 9;
                            break;
                          case 6:
                            a8.next = 8;
                            return $.wait(2000);
                          case 8:
                            Z(JSON.parse(a6));
                          case 9:
                            a8.next = 14;
                            break;
                          case 11:
                            a8.prev = 11;
                            a8.t0 = a8.catch(0);
                            $.logErr(a8.t0, a5);
                          case 14:
                            a8.prev = 14;
                            Z();
                            return a8.finish(14);
                          case 17:
                          case "end":
                            return a8.stop();
                        }
                      }
                    }, a3, null, [[0, 11, 14, 17]]);
                  }));
                  return function (a4, a5, a6) {
                    return a2.apply(this, arguments);
                  };
                }());
              }));
            case 2:
            case "end":
              return X.stop();
          }
        }
      }, T);
    }));
    return G.apply(this, arguments);
  }
  function H(S) {
    return I.apply(this, arguments);
  }
  function I() {
    I = m(k().mark(function T(U) {
      return k().wrap(function (W) {
        for (;;) {
          switch (W.prev = W.next) {
            case 0:
              return W.abrupt("return", new Promise(function (X) {
                var Z = {
                  "Content-Type": "application/json"
                };
                var a0 = {
                  url: "".concat(o, "/capcode"),
                  headers: Z,
                  body: JSON.stringify(U)
                };
                $.post(a0, function (a1, a2, a3) {
                  try {
                    a1 ? (console.log("".concat(JSON.stringify(a1))), console.log("".concat($.name, " API请求失败，请检查网路重试"))) : X(JSON.parse(a3));
                  } catch (a4) {
                    $.logErr(a4, a2);
                  } finally {
                    X();
                  }
                });
              }));
            case 1:
            case "end":
              return W.stop();
          }
        }
      }, T);
    }));
    return I.apply(this, arguments);
  }
  function J(S, T) {
    CryptoJS = p.createCryptoJS();
    var U = CryptoJS.enc.Utf8.parse(T),
      V = CryptoJS.enc.Utf8.parse(S),
      W = CryptoJS.AES.encrypt(V, U, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    return W.toString();
  }
  function K(S) {
    var V = L(),
      W = Date.now(),
      X = {
        app_id: x,
        device_id: t,
        nonce_str: V,
        source_type: "app",
        timestamp: W,
        auth_id: s,
        token: r
      };
    Object.entries(S).forEach(function (a2) {
      var a3 = d(a2, 2),
        a4 = a3[0],
        a5 = a3[1];
      X[a4] = a5;
    });
    var a0 = Object.keys(X).sort(),
      a1 = a0.map(function (a2) {
        return "".concat(a2, "=").concat(X[a2]);
      }).join("&&");
    a1 = a1 + "&&" + y;
    CryptoJS = p.createCryptoJS();
    var Y = CryptoJS.SHA256(a1).toString();
    var Z = {};
    Z.uuid = V;
    Z.time = W;
    Z.signature = Y;
    return Z;
  }
  function L() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (S) {
      var T = 16 * Math.random() | 0,
        U = "x" === S ? T : 3 & T | 8;
      return U.toString(16);
    });
  }
  function M() {
    var S = L(),
      T = "Xiaomi " + N(["M1903F2A", "M2001J2E", "M2001J2C", "M2001J1E", "M2001J1C", "M2002J9E", "M2011K2C", "M2102K1C", "M2101K9C", "2107119DC", "2201123C", "2112123AC", "2201122C", "2211133C", "2210132C", "2304FPN6DC", "23127PN0CC", "24031PN0DC", "23090RA98C", "2312DRA50C", "2312CRAD3C", "2312DRAABC", "22101316UCP", "22101316C"]),
      U = {
        model: T,
        deviceId: S
      };
    return U;
  }
  function N(S) {
    return S[Math.floor(Math.random() * S.length)];
  }
  function O() {
    return P.apply(this, arguments);
  }
  function P() {
    P = m(k().mark(function T() {
      var U;
      return k().wrap(function V(W) {
        for (;;) {
          switch (W.prev = W.next) {
            case 0:
              if (U = $.getdata("Utils_Code") || "", !U || !Object.keys(U).length) {
                W.next = 5;
                break;
              }
              console.log("✅ ".concat($.name, ": 缓存中存在Utils代码, 跳过下载"));
              eval(U);
              return W.abrupt("return", creatUtils());
            case 5:
              console.log("🚀 ".concat($.name, ": 开始下载Utils代码"));
              return W.abrupt("return", new Promise(function () {
                var Z = m(k().mark(function a0(a1) {
                  return k().wrap(function a3(a4) {
                    for (;;) {
                      switch (a4.prev = a4.next) {
                        case 0:
                          $.getScript("https://mirror.ghproxy.com/https://raw.githubusercontent.com/xzxxn777/Surge/main/Utils/Utils.js").then(function (a5) {
                            $.setdata(a5, "Utils_Code");
                            eval(a5);
                            console.log("✅ Utils加载成功, 请继续");
                            a1(creatUtils());
                          });
                        case 1:
                        case "end":
                          return a4.stop();
                      }
                    }
                  }, a0);
                }));
                return function (a1) {
                  return Z.apply(this, arguments);
                };
              }()));
            case 7:
            case "end":
              return W.stop();
          }
        }
      }, T);
    }));
    return P.apply(this, arguments);
  }
  function Q(S) {
    return R.apply(this, arguments);
  }
  function R() {
    R = m(k().mark(function U(V) {
      return k().wrap(function (Y) {
        for (;;) {
          switch (Y.prev = Y.next) {
            case 0:
              if (!$.isNode()) {
                Y.next = 5;
                break;
              }
              Y.next = 3;
              return notify.sendNotify($.name, V);
            case 3:
              Y.next = 6;
              break;
            case 5:
              $.msg($.name, "", V);
            case 6:
            case "end":
              return Y.stop();
          }
        }
      }, U);
    }));
    return R.apply(this, arguments);
  }
  m(k().mark(function S() {
    return k().wrap(function (T) {
      for (;;) {
        switch (T.prev = T.next) {
          case 0:
            T.next = 2;
            return z();
          case 2:
          case "end":
            return T.stop();
        }
      }
    }, S);
  }))().catch(function (T) {
    $.log(T);
  }).finally(function () {
    $.done({});
  });
})();
async function sendMsg(a, e) {
  a && ($.isNode() ? await notify.sendNotify($.name, a) : $.msg($.name, $.title || "", a, e));
}
function DoubleLog(o) {
  o && ($.log(`${o}`), $.notifyMsg.push(`${o}`));
}
async function checkEnv() {
  try {
    if (!userCookie?.length) {
      throw new Error("no available accounts found");
    }
    $.log(`\n[INFO] 检测到 ${userCookie?.length ?? 0} 个账号\n`);
    $.userList.push(...userCookie.map(o => new UserInfo(o)).filter(Boolean));
  } catch (o) {
    throw o;
  }
}
function debug(g, e = "debug") {
  "true" === $.is_debug && ($.log(`\n-----------${e}------------\n`), $.log("string" == typeof g ? g : $.toStr(g) || `debug error => t=${g}`), $.log(`\n-----------${e}------------\n`));
}
function ObjectKeys2LowerCase(obj) {
  return !obj ? {} : Object.fromEntries(Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v]));
}
async function Request(t) {
  "string" == typeof t && (t = {
    url: t
  });
  try {
    if (!t?.url) {
      throw new Error("[URL][ERROR] 缺少 url 参数");
    }
    let {
      url: o,
      type: e,
      headers: r = {},
      body: s,
      params: a,
      dataType: n = "form",
      resultType: u = "data"
    } = t;
    const p = e ? e?.toLowerCase() : "body" in t ? "post" : "get",
      c = o.concat("post" === p ? "?" + $.queryStr(a) : ""),
      i = t.timeout ? $.isSurge() ? t.timeout / 1000 : t.timeout : 10000;
    "json" === n && (r["Content-Type"] = "application/json;charset=UTF-8");
    const y = "string" == typeof s ? s : s && "form" == n ? $.queryStr(s) : $.toStr(s),
      l = {
        ...t,
        ...(t?.opts ? t.opts : {}),
        url: c,
        headers: r,
        ...("post" === p && {
          body: y
        }),
        ...("get" === p && a && {
          params: a
        }),
        timeout: i
      },
      m = $.http[p.toLowerCase()](l).then(t => "data" == u ? $.toObj(t.body) || t.body : $.toObj(t) || t).catch(t => $.log(`[${p.toUpperCase()}][ERROR] ${t}\n`));
    return Promise.race([new Promise((t, o) => setTimeout(() => o("当前请求已超时"), i)), m]);
  } catch (t) {
    console.log(`[${p.toUpperCase()}][ERROR] ${t}\n`);
  }
}
function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      const i = new Promise((e, i) => {
        s.call(this, t, (t, s, o) => {
          t ? i(t) : e(s);
        });
      });
      return t.timeout ? ((t, e = 1000) => Promise.race([t, new Promise((t, s) => {
        setTimeout(() => {
          s(new Error("请求超时"));
        }, e);
      })]))(i, t.timeout) : i;
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.logLevels = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
      };
      this.logLevelPrefixs = {
        debug: "[DEBUG] ",
        info: "[INFO] ",
        warn: "[WARN] ",
        error: "[ERROR] "
      };
      this.logLevel = "info";
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    getEnv() {
      return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0;
    }
    isNode() {
      return "Node.js" === this.getEnv();
    }
    isQuanX() {
      return "Quantumult X" === this.getEnv();
    }
    isSurge() {
      return "Surge" === this.getEnv();
    }
    isLoon() {
      return "Loon" === this.getEnv();
    }
    isShadowrocket() {
      return "Shadowrocket" === this.getEnv();
    }
    isStash() {
      return "Stash" === this.getEnv();
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null, ...s) {
      try {
        return JSON.stringify(t, ...s);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      if (this.getdata(t)) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let o = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        o = o ? 1 * o : 20;
        o = e && e.timeout ? e.timeout : o;
        const [r, a] = i.split("@"),
          n = {
            url: `http://${a}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: o
            },
            headers: {
              "X-Key": r,
              Accept: "*/*"
            },
            policy: "DIRECT",
            timeout: o
          };
        this.post(n, (t, e, i) => s(i));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) {
          return {};
        }
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          o = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, o) : i ? this.fs.writeFileSync(e, o) : this.fs.writeFileSync(t, o);
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let o = t;
      for (const t of i) if (o = Object(o)[t], void 0 === o) {
        return s;
      }
      return o;
    }
    lodash_set(t, e, s) {
      Object(t) !== t || (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s);
      return t;
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          o = s ? this.getval(s) : "";
        if (o) {
          try {
            const t = JSON.parse(o);
            e = t ? this.lodash_get(t, i, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, o] = /^@(.*?)\.(.*?)$/.exec(e),
          r = this.getval(i),
          a = i ? "null" === r ? null : r || "{}" : "{}";
        try {
          const e = JSON.parse(a);
          this.lodash_set(e, o, t);
          s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const r = {};
          this.lodash_set(r, o, t);
          s = this.setval(JSON.stringify(r), i);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.read(t);
        case "Quantumult X":
          return $prefs.valueForKey(t);
        case "Node.js":
          this.data = this.loaddata();
          return this.data[t];
        default:
          return this.data && this.data[t] || null;
      }
    }
    setval(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.write(t, e);
        case "Quantumult X":
          return $prefs.setValueForKey(t, e);
        case "Node.js":
          this.data = this.loaddata();
          this.data[e] = t;
          this.writedata();
          return !0;
        default:
          return this.data && this.data[e] || null;
      }
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.cookie && void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)));
    }
    get(t, e = () => {}) {
      switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient.get(t, (t, s, i) => {
            !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode);
            e(t, s, i);
          });
          break;
        case "Quantumult X":
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: i,
              headers: o,
              body: r,
              bodyBytes: a
            } = t;
            e(null, {
              status: s,
              statusCode: i,
              headers: o,
              body: r,
              bodyBytes: a
            }, r, a);
          }, t => e(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          let s = require("iconv-lite");
          this.initGotEnv(t);
          this.got(t).on("redirect", (t, e) => {
            try {
              if (t.headers["set-cookie"]) {
                const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                s && this.ckjar.setCookieSync(s, null);
                e.cookieJar = this.ckjar;
              }
            } catch (t) {
              this.logErr(t);
            }
          }).then(t => {
            const {
                statusCode: i,
                statusCode: o,
                headers: r,
                rawBody: a
              } = t,
              n = s.decode(a, this.encoding);
            e(null, {
              status: i,
              statusCode: o,
              headers: r,
              rawBody: a,
              body: n
            }, n);
          }, t => {
            const {
              message: i,
              response: o
            } = t;
            e(i, o, o && s.decode(o.rawBody, this.encoding));
          });
          break;
      }
    }
    post(t, e = () => {}) {
      const s = t.method ? t.method.toLocaleLowerCase() : "post";
      switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient[s](t, (t, s, i) => {
            !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode);
            e(t, s, i);
          });
          break;
        case "Quantumult X":
          t.method = s;
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: i,
              headers: o,
              body: r,
              bodyBytes: a
            } = t;
            e(null, {
              status: s,
              statusCode: i,
              headers: o,
              body: r,
              bodyBytes: a
            }, r, a);
          }, t => e(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          let i = require("iconv-lite");
          this.initGotEnv(t);
          const {
            url: o,
            ...r
          } = t;
          this.got[s](o, r).then(t => {
            const {
                statusCode: s,
                statusCode: o,
                headers: r,
                rawBody: a
              } = t,
              n = i.decode(a, this.encoding);
            e(null, {
              status: s,
              statusCode: o,
              headers: r,
              rawBody: a,
              body: n
            }, n);
          }, t => {
            const {
              message: s,
              response: o
            } = t;
            e(s, o, o && i.decode(o.rawBody, this.encoding));
          });
          break;
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t;
    }
    queryStr(t) {
      let e = "";
      for (const s in t) {
        let i = t[s];
        null != i && "" !== i && ("object" == typeof i && (i = JSON.stringify(i)), e += `${s}=${i}&`);
      }
      e = e.substring(0, e.length - 1);
      return e;
    }
    msg(e = t, s = "", i = "", o = {}) {
      const r = t => {
        const {
          $open: e,
          $copy: s,
          $media: i,
          $mediaMime: o
        } = t;
        switch (typeof t) {
          case void 0:
            return t;
          case "string":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              default:
                return {
                  url: t
                };
              case "Loon":
              case "Shadowrocket":
                return t;
              case "Quantumult X":
                return {
                  "open-url": t
                };
              case "Node.js":
                return;
            }
          case "object":
            switch (this.getEnv()) {
              case "Surge":
              case "Stash":
              case "Shadowrocket":
              default:
                {
                  const r = {};
                  let a = t.openUrl || t.url || t["open-url"] || e;
                  a && Object.assign(r, {
                    action: "open-url",
                    url: a
                  });
                  let n = t["update-pasteboard"] || t.updatePasteboard || s;
                  if (n && Object.assign(r, {
                    action: "clipboard",
                    text: n
                  }), i) {
                    let t, e, s;
                    if (i.startsWith("http")) {
                      t = i;
                    } else {
                      if (i.startsWith("data:")) {
                        const [t] = i.split(";"),
                          [, o] = i.split(",");
                        e = o;
                        s = t.replace("data:", "");
                      } else {
                        e = i;
                        s = (t => {
                          const e = {
                            JVBERi0: "application/pdf",
                            R0lGODdh: "image/gif",
                            R0lGODlh: "image/gif",
                            iVBORw0KGgo: "image/png",
                            "/9j/": "image/jpg"
                          };
                          for (var s in e) if (0 === t.indexOf(s)) {
                            return e[s];
                          }
                          return null;
                        })(i);
                      }
                    }
                    Object.assign(r, {
                      "media-url": t,
                      "media-base64": e,
                      "media-base64-mime": o ?? s
                    });
                  }
                  Object.assign(r, {
                    "auto-dismiss": t["auto-dismiss"],
                    sound: t.sound
                  });
                  return r;
                }
              case "Loon":
                {
                  const s = {};
                  let o = t.openUrl || t.url || t["open-url"] || e;
                  o && Object.assign(s, {
                    openUrl: o
                  });
                  let r = t.mediaUrl || t["media-url"];
                  i?.startsWith("http") && (r = i);
                  r && Object.assign(s, {
                    mediaUrl: r
                  });
                  console.log(JSON.stringify(s));
                  return s;
                }
              case "Quantumult X":
                {
                  const o = {};
                  let r = t["open-url"] || t.url || t.openUrl || e;
                  r && Object.assign(o, {
                    "open-url": r
                  });
                  let a = t["media-url"] || t.mediaUrl;
                  i?.startsWith("http") && (a = i);
                  a && Object.assign(o, {
                    "media-url": a
                  });
                  let n = t["update-pasteboard"] || t.updatePasteboard || s;
                  n && Object.assign(o, {
                    "update-pasteboard": n
                  });
                  console.log(JSON.stringify(o));
                  return o;
                }
              case "Node.js":
                return;
            }
          default:
            return;
        }
      };
      if (!this.isMute) {
        switch (this.getEnv()) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Shadowrocket":
          default:
            $notification.post(e, s, i, r(o));
            break;
          case "Quantumult X":
            $notify(e, s, i, r(o));
            break;
          case "Node.js":
            break;
        }
      }
      if (!this.isMuteLog) {
        let t = ["", "==============📣系统通知📣=============="];
        t.push(e);
        s && t.push(s);
        i && t.push(i);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    debug(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.debug && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.debug}${t.map(t => t ?? String(t)).join(this.logSeparator)}`));
    }
    info(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.info && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.info}${t.map(t => t ?? String(t)).join(this.logSeparator)}`));
    }
    warn(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.warn && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.warn}${t.map(t => t ?? String(t)).join(this.logSeparator)}`));
    }
    error(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.error && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.error}${t.map(t => t ?? String(t)).join(this.logSeparator)}`));
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.map(t => t ?? String(t)).join(this.logSeparator));
    }
    logErr(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          this.log("", `❗️${this.name}, 错误!`, e, t);
          break;
        case "Node.js":
          this.log("", `❗️${this.name}, 错误!`, e, void 0 !== t.message ? t.message : t, t.stack);
          break;
      }
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = (new Date().getTime() - this.startTime) / 1000;
      switch (this.log("", `🔔${this.name}, 结束! 🕛 ${e} 秒`), this.log(), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          $done(t);
          break;
        case "Node.js":
          process.exit(1);
      }
    }
  }(t, e);
}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise(((e,i)=>{s.call(this,t,((t,s,o)=>{t?i(t):e(s)}))}))}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.logLevels={debug:0,info:1,warn:2,error:3},this.logLevelPrefixs={debug:"[DEBUG] ",info:"[INFO] ",warn:"[WARN] ",error:"[ERROR] "},this.logLevel="info",this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null,...s){try{return JSON.stringify(t,...s)}catch{return e}}getjson(t,e){let s=e;if(this.getdata(t))try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise((e=>{this.get({url:t},((t,s,i)=>e(i)))}))}runScript(t,e){return new Promise((s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=e&&e.timeout?e.timeout:o;const[r,a]=i.split("@"),n={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"},timeout:o};this.post(n,((t,e,i)=>s(i)))})).catch((t=>this.logErr(t)))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),o=JSON.stringify(this.data);s?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(e,o):this.fs.writeFileSync(t,o)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return s;return o}lodash_set(t,e,s){return Object(t)!==t||(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce(((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{}),t)[e[e.length-1]]=s),t}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),o=s?this.getval(s):"";if(o)try{const t=JSON.parse(o);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(e),r=this.getval(i),a=i?"null"===r?null:r||"{}":"{}";try{const e=JSON.parse(a);this.lodash_set(e,o,t),s=this.setval(JSON.stringify(e),i)}catch(e){const r={};this.lodash_set(r,o,t),s=this.setval(JSON.stringify(r),i)}}else s=this.setval(t,e);return s}getval(t){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.cookie&&void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar)))}get(t,e=(()=>{})){switch(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),t.params&&(t.url+="?"+this.queryStr(t.params)),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,((t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)}));break;case"Quantumult X":this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then((t=>{const{statusCode:s,statusCode:i,headers:o,body:r,bodyBytes:a}=t;e(null,{status:s,statusCode:i,headers:o,body:r,bodyBytes:a},r,a)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",((t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}})).then((t=>{const{statusCode:i,statusCode:o,headers:r,rawBody:a}=t,n=s.decode(a,this.encoding);e(null,{status:i,statusCode:o,headers:r,rawBody:a,body:n},n)}),(t=>{const{message:i,response:o}=t;e(i,o,o&&s.decode(o.rawBody,this.encoding))}));break}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),void 0===t.followRedirect||t.followRedirect||((this.isSurge()||this.isLoon())&&(t["auto-redirect"]=!1),this.isQuanX()&&(t.opts?t.opts.redirection=!1:t.opts={redirection:!1})),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,((t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)}));break;case"Quantumult X":t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then((t=>{const{statusCode:s,statusCode:i,headers:o,body:r,bodyBytes:a}=t;e(null,{status:s,statusCode:i,headers:o,body:r,bodyBytes:a},r,a)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let i=require("iconv-lite");this.initGotEnv(t);const{url:o,...r}=t;this.got[s](o,r).then((t=>{const{statusCode:s,statusCode:o,headers:r,rawBody:a}=t,n=i.decode(a,this.encoding);e(null,{status:s,statusCode:o,headers:r,rawBody:a,body:n},n)}),(t=>{const{message:s,response:o}=t;e(s,o,o&&i.decode(o.rawBody,this.encoding))}));break}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}queryStr(t){let e="";for(const s in t){let i=t[s];null!=i&&""!==i&&("object"==typeof i&&(i=JSON.stringify(i)),e+=`${s}=${i}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",i="",o={}){const r=t=>{const{$open:e,$copy:s,$media:i,$mediaMime:o}=t;switch(typeof t){case void 0:return t;case"string":switch(this.getEnv()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.getEnv()){case"Surge":case"Stash":case"Shadowrocket":default:{const r={};let a=t.openUrl||t.url||t["open-url"]||e;a&&Object.assign(r,{action:"open-url",url:a});let n=t["update-pasteboard"]||t.updatePasteboard||s;if(n&&Object.assign(r,{action:"clipboard",text:n}),i){let t,e,s;if(i.startsWith("http"))t=i;else if(i.startsWith("data:")){const[t]=i.split(";"),[,o]=i.split(",");e=o,s=t.replace("data:","")}else{e=i,s=(t=>{const e={JVBERi0:"application/pdf",R0lGODdh:"image/gif",R0lGODlh:"image/gif",iVBORw0KGgo:"image/png","/9j/":"image/jpg"};for(var s in e)if(0===t.indexOf(s))return e[s];return null})(i)}Object.assign(r,{"media-url":t,"media-base64":e,"media-base64-mime":o??s})}return Object.assign(r,{"auto-dismiss":t["auto-dismiss"],sound:t.sound}),r}case"Loon":{const s={};let o=t.openUrl||t.url||t["open-url"]||e;o&&Object.assign(s,{openUrl:o});let r=t.mediaUrl||t["media-url"];return i?.startsWith("http")&&(r=i),r&&Object.assign(s,{mediaUrl:r}),console.log(JSON.stringify(s)),s}case"Quantumult X":{const o={};let r=t["open-url"]||t.url||t.openUrl||e;r&&Object.assign(o,{"open-url":r});let a=t["media-url"]||t.mediaUrl;i?.startsWith("http")&&(a=i),a&&Object.assign(o,{"media-url":a});let n=t["update-pasteboard"]||t.updatePasteboard||s;return n&&Object.assign(o,{"update-pasteboard":n}),console.log(JSON.stringify(o)),o}case"Node.js":return}default:return}};if(!this.isMute)switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,s,i,r(o));break;case"Quantumult X":$notify(e,s,i,r(o));break;case"Node.js":break}if(!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}debug(...t){this.logLevels[this.logLevel]<=this.logLevels.debug&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.debug}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}info(...t){this.logLevels[this.logLevel]<=this.logLevels.info&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.info}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}warn(...t){this.logLevels[this.logLevel]<=this.logLevels.warn&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.warn}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}error(...t){this.logLevels[this.logLevel]<=this.logLevels.error&&(t.length>0&&(this.logs=[...this.logs,...t]),console.log(`${this.logLevelPrefixs.error}${t.map((t=>t??String(t))).join(this.logSeparator)}`))}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.map((t=>t??String(t))).join(this.logSeparator))}logErr(t,e){switch(this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,e,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,e,void 0!==t.message?t.message:t,t.stack);break}}wait(t){return new Promise((e=>setTimeout(e,t)))}done(t={}){const e=((new Date).getTime()-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${e} 秒`),this.log(),this.getEnv()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}}(t,e)}
