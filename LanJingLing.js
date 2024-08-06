//Tue Aug 06 2024 14:53:30 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("兰精灵");
const notify = $.isNode() ? require("../sendNotify") : "";
(() => {
  function b(Z) {
    b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (a2) {
      return typeof a2;
    } : function (a2) {
      return a2 && "function" == typeof Symbol && a2.constructor === Symbol && a2 !== Symbol.prototype ? "symbol" : typeof a2;
    };
    return b(Z);
  }
  function c(Z, a0) {
    var a2 = "undefined" != typeof Symbol && Z[Symbol.iterator] || Z["@@iterator"];
    if (!a2) {
      if (Array.isArray(Z) || (a2 = d(Z)) || a0 && Z && "number" == typeof Z.length) {
        a2 && (Z = a2);
        var a3 = 0,
          a4 = function () {};
        return {
          s: a4,
          n: function () {
            var aa = {
              done: !0
            };
            return a3 >= Z.length ? aa : {
              done: !1,
              value: Z[a3++]
            };
          },
          e: function (aa) {
            throw aa;
          },
          f: a4
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var a5,
      a6 = !0,
      a7 = !1;
    return {
      s: function () {
        a2 = a2.call(Z);
      },
      n: function () {
        var ab = a2.next();
        a6 = ab.done;
        return ab;
      },
      e: function (ab) {
        a7 = !0;
        a5 = ab;
      },
      f: function () {
        try {
          a6 || null == a2.return || a2.return();
        } finally {
          if (a7) {
            throw a5;
          }
        }
      }
    };
  }
  function d(Z, a0) {
    if (Z) {
      if ("string" == typeof Z) {
        return f(Z, a0);
      }
      var a2 = {}.toString.call(Z).slice(8, -1);
      "Object" === a2 && Z.constructor && (a2 = Z.constructor.name);
      return "Map" === a2 || "Set" === a2 ? Array.from(Z) : "Arguments" === a2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a2) ? f(Z, a0) : void 0;
    }
  }
  function f(Z, a0) {
    (null == a0 || a0 > Z.length) && (a0 = Z.length);
    for (var a3 = 0, a4 = Array(a0); a3 < a0; a3++) {
      a4[a3] = Z[a3];
    }
    return a4;
  }
  function g() {
    'use strict';

    g = function () {
      return a1;
    };
    var a0,
      a1 = {},
      a2 = Object.prototype,
      a3 = a2.hasOwnProperty,
      a4 = Object.defineProperty || function (aw, ax, ay) {
        aw[ax] = ay.value;
      },
      a5 = "function" == typeof Symbol ? Symbol : {},
      a6 = a5.iterator || "@@iterator",
      a7 = a5.asyncIterator || "@@asyncIterator",
      a8 = a5.toStringTag || "@@toStringTag";
    function a9(aw, ax, ay) {
      var az = {
        value: ay,
        enumerable: !0,
        configurable: !0,
        writable: !0
      };
      Object.defineProperty(aw, ax, az);
      return aw[ax];
    }
    try {
      a9({}, "");
    } catch (ax) {
      a9 = function (ay, az, aA) {
        return ay[az] = aA;
      };
    }
    function aa(az, aA, aB, aC) {
      var aF = aA && aA.prototype instanceof ah ? aA : ah,
        aG = Object.create(aF.prototype),
        aH = new au(aC || []);
      a4(aG, "_invoke", {
        value: aq(az, aB, aH)
      });
      return aG;
    }
    function ab(az, aA, aB) {
      try {
        return {
          type: "normal",
          arg: az.call(aA, aB)
        };
      } catch (aF) {
        var aD = {
          type: "throw",
          arg: aF
        };
        return aD;
      }
    }
    a1.wrap = aa;
    var ac = "suspendedStart",
      ad = "suspendedYield",
      ae = "executing",
      af = "completed",
      ag = {};
    function ah() {}
    function ai() {}
    function aj() {}
    var ak = {};
    a9(ak, a6, function () {
      return this;
    });
    var al = Object.getPrototypeOf,
      am = al && al(al(av([])));
    am && am !== a2 && a3.call(am, a6) && (ak = am);
    aj.prototype = ah.prototype = Object.create(ak);
    var an = aj.prototype;
    function ao(az) {
      ["next", "throw", "return"].forEach(function (aA) {
        a9(az, aA, function (aE) {
          return this._invoke(aA, aE);
        });
      });
    }
    function ap(az, aA) {
      function aD(aE, aF, aG, aH) {
        var aJ = ab(az[aE], az, aF);
        if ("throw" !== aJ.type) {
          var aK = aJ.arg,
            aL = aK.value;
          return aL && "object" == b(aL) && a3.call(aL, "__await") ? aA.resolve(aL.__await).then(function (aN) {
            aD("next", aN, aG, aH);
          }, function (aN) {
            aD("throw", aN, aG, aH);
          }) : aA.resolve(aL).then(function (aN) {
            aK.value = aN;
            aG(aK);
          }, function (aN) {
            return aD("throw", aN, aG, aH);
          });
        }
        aH(aJ.arg);
      }
      var aC;
      a4(this, "_invoke", {
        value: function (aE, aF) {
          function aI() {
            return new aA(function (aK, aL) {
              aD(aE, aF, aK, aL);
            });
          }
          return aC = aC ? aC.then(aI, aI) : aI();
        }
      });
    }
    function aq(az, aA, aB) {
      var aD = ac;
      return function (aF, aG) {
        if (aD === ae) {
          throw Error("Generator is already running");
        }
        if (aD === af) {
          if ("throw" === aF) {
            throw aG;
          }
          var aI = {
            value: a0,
            done: !0
          };
          return aI;
        }
        for (aB.method = aF, aB.arg = aG;;) {
          var aJ = aB.delegate;
          if (aJ) {
            var aK = ar(aJ, aB);
            if (aK) {
              if (aK === ag) {
                continue;
              }
              return aK;
            }
          }
          if ("next" === aB.method) {
            aB.sent = aB._sent = aB.arg;
          } else {
            if ("throw" === aB.method) {
              if (aD === ac) {
                throw aD = af, aB.arg;
              }
              aB.dispatchException(aB.arg);
            } else {
              "return" === aB.method && aB.abrupt("return", aB.arg);
            }
          }
          aD = ae;
          var aL = ab(az, aA, aB);
          if ("normal" === aL.type) {
            if (aD = aB.done ? af : ad, aL.arg === ag) {
              continue;
            }
            var aM = {};
            aM.value = aL.arg;
            aM.done = aB.done;
            return aM;
          }
          "throw" === aL.type && (aD = af, aB.method = "throw", aB.arg = aL.arg);
        }
      };
    }
    function ar(az, aA) {
      var aC = aA.method,
        aD = az.iterator[aC];
      if (aD === a0) {
        aA.delegate = null;
        "throw" === aC && az.iterator.return && (aA.method = "return", aA.arg = a0, ar(az, aA), "throw" === aA.method) || "return" !== aC && (aA.method = "throw", aA.arg = new TypeError("The iterator does not provide a '" + aC + "' method"));
        return ag;
      }
      var aE = ab(aD, az.iterator, aA.arg);
      if ("throw" === aE.type) {
        aA.method = "throw";
        aA.arg = aE.arg;
        aA.delegate = null;
        return ag;
      }
      var aF = aE.arg;
      return aF ? aF.done ? (aA[az.resultName] = aF.value, aA.next = az.nextLoc, "return" !== aA.method && (aA.method = "next", aA.arg = a0), aA.delegate = null, ag) : aF : (aA.method = "throw", aA.arg = new TypeError("iterator result is not an object"), aA.delegate = null, ag);
    }
    function as(az) {
      var aB = {
        tryLoc: az[0]
      };
      var aC = aB;
      1 in az && (aC.catchLoc = az[1]);
      2 in az && (aC.finallyLoc = az[2], aC.afterLoc = az[3]);
      this.tryEntries.push(aC);
    }
    function at(az) {
      var aA = az.completion || {};
      aA.type = "normal";
      delete aA.arg;
      az.completion = aA;
    }
    function au(az) {
      var aB = {
        tryLoc: "root"
      };
      this.tryEntries = [aB];
      az.forEach(as, this);
      this.reset(!0);
    }
    function av(az) {
      if (az || "" === az) {
        var aB = az[a6];
        if (aB) {
          return aB.call(az);
        }
        if ("function" == typeof az.next) {
          return az;
        }
        if (!isNaN(az.length)) {
          var aC = -1,
            aD = function aF() {
              for (; ++aC < az.length;) {
                if (a3.call(az, aC)) {
                  aF.value = az[aC];
                  aF.done = !1;
                  return aF;
                }
              }
              aF.value = a0;
              aF.done = !0;
              return aF;
            };
          return aD.next = aD;
        }
      }
      throw new TypeError(b(az) + " is not iterable");
    }
    ai.prototype = aj;
    a4(an, "constructor", {
      value: aj,
      configurable: !0
    });
    a4(aj, "constructor", {
      value: ai,
      configurable: !0
    });
    ai.displayName = a9(aj, a8, "GeneratorFunction");
    a1.isGeneratorFunction = function (az) {
      var aA = "function" == typeof az && az.constructor;
      return !!aA && (aA === ai || "GeneratorFunction" === (aA.displayName || aA.name));
    };
    a1.mark = function (az) {
      Object.setPrototypeOf ? Object.setPrototypeOf(az, aj) : (az.__proto__ = aj, a9(az, a8, "GeneratorFunction"));
      az.prototype = Object.create(an);
      return az;
    };
    a1.awrap = function (az) {
      var aA = {
        __await: az
      };
      return aA;
    };
    ao(ap.prototype);
    a9(ap.prototype, a7, function () {
      return this;
    });
    a1.AsyncIterator = ap;
    a1.async = function (az, aA, aB, aC, aD) {
      void 0 === aD && (aD = Promise);
      var aF = new ap(aa(az, aA, aB, aC), aD);
      return a1.isGeneratorFunction(aA) ? aF : aF.next().then(function (aH) {
        return aH.done ? aH.value : aF.next();
      });
    };
    ao(an);
    a9(an, a8, "Generator");
    a9(an, a6, function () {
      return this;
    });
    a9(an, "toString", function () {
      return "[object Generator]";
    });
    a1.keys = function (az) {
      var aB = Object(az),
        aC = [];
      for (var aD in aB) aC.push(aD);
      aC.reverse();
      return function aE() {
        for (; aC.length;) {
          var aG = aC.pop();
          if (aG in aB) {
            aE.value = aG;
            aE.done = !1;
            return aE;
          }
        }
        aE.done = !0;
        return aE;
      };
    };
    a1.values = av;
    au.prototype = {
      constructor: au,
      reset: function (az) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = a0, this.done = !1, this.delegate = null, this.method = "next", this.arg = a0, this.tryEntries.forEach(at), !az) {
          for (var aA in this) "t" === aA.charAt(0) && a3.call(this, aA) && !isNaN(+aA.slice(1)) && (this[aA] = a0);
        }
      },
      stop: function () {
        this.done = !0;
        var az = this.tryEntries[0].completion;
        if ("throw" === az.type) {
          throw az.arg;
        }
        return this.rval;
      },
      dispatchException: function (az) {
        if (this.done) {
          throw az;
        }
        var aB = this;
        function aI(aJ, aK) {
          aE.type = "throw";
          aE.arg = az;
          aB.next = aJ;
          aK && (aB.method = "next", aB.arg = a0);
          return !!aK;
        }
        for (var aC = this.tryEntries.length - 1; aC >= 0; --aC) {
          var aD = this.tryEntries[aC],
            aE = aD.completion;
          if ("root" === aD.tryLoc) {
            return aI("end");
          }
          if (aD.tryLoc <= this.prev) {
            var aF = a3.call(aD, "catchLoc"),
              aG = a3.call(aD, "finallyLoc");
            if (aF && aG) {
              if (this.prev < aD.catchLoc) {
                return aI(aD.catchLoc, !0);
              }
              if (this.prev < aD.finallyLoc) {
                return aI(aD.finallyLoc);
              }
            } else {
              if (aF) {
                if (this.prev < aD.catchLoc) {
                  return aI(aD.catchLoc, !0);
                }
              } else {
                if (!aG) {
                  throw Error("try statement without catch or finally");
                }
                if (this.prev < aD.finallyLoc) {
                  return aI(aD.finallyLoc);
                }
              }
            }
          }
        }
      },
      abrupt: function (az, aA) {
        for (var aB = this.tryEntries.length - 1; aB >= 0; --aB) {
          var aC = this.tryEntries[aB];
          if (aC.tryLoc <= this.prev && a3.call(aC, "finallyLoc") && this.prev < aC.finallyLoc) {
            var aD = aC;
            break;
          }
        }
        aD && ("break" === az || "continue" === az) && aD.tryLoc <= aA && aA <= aD.finallyLoc && (aD = null);
        var aE = aD ? aD.completion : {};
        aE.type = az;
        aE.arg = aA;
        return aD ? (this.method = "next", this.next = aD.finallyLoc, ag) : this.complete(aE);
      },
      complete: function (az, aA) {
        if ("throw" === az.type) {
          throw az.arg;
        }
        "break" === az.type || "continue" === az.type ? this.next = az.arg : "return" === az.type ? (this.rval = this.arg = az.arg, this.method = "return", this.next = "end") : "normal" === az.type && aA && (this.next = aA);
        return ag;
      },
      finish: function (az) {
        for (var aC = this.tryEntries.length - 1; aC >= 0; --aC) {
          var aD = this.tryEntries[aC];
          if (aD.finallyLoc === az) {
            this.complete(aD.completion, aD.afterLoc);
            at(aD);
            return ag;
          }
        }
      },
      catch: function (az) {
        for (var aB = this.tryEntries.length - 1; aB >= 0; --aB) {
          var aC = this.tryEntries[aB];
          if (aC.tryLoc === az) {
            var aD = aC.completion;
            if ("throw" === aD.type) {
              var aE = aD.arg;
              at(aC);
            }
            return aE;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function (az, aA, aB) {
        this.delegate = {
          iterator: av(az),
          resultName: aA,
          nextLoc: aB
        };
        "next" === this.method && (this.arg = a0);
        return ag;
      }
    };
    return a1;
  }
  function h(Z, a0, a1, a2, a3, a4, a5) {
    try {
      var a7 = Z[a4](a5),
        a8 = a7.value;
    } catch (aa) {
      return void a1(aa);
    }
    a7.done ? a0(a8) : Promise.resolve(a8).then(a2, a3);
  }
  function i(Z) {
    return function () {
      var a2 = this,
        a3 = arguments;
      return new Promise(function (a4, a5) {
        var a7 = Z.apply(a2, a3);
        function a8(aa) {
          h(a7, a4, a5, a8, a9, "next", aa);
        }
        function a9(aa) {
          h(a7, a4, a5, a8, a9, "throw", aa);
        }
        a8(void 0);
      });
    };
  }
  var j = ($.isNode() ? process.env.LanJingLing : $.getdata("LanJingLing")) || "",
    k = void 0,
    l = "",
    m = "",
    n = "",
    o = "72",
    p = "",
    q = "10026",
    r = "",
    s = "",
    t = "",
    u = "",
    v = "",
    w = "",
    x = "",
    y = "",
    z = "",
    A = "FR*r!isE5W";
  function B() {
    return C.apply(this, arguments);
  }
  function C() {
    C = i(g().mark(function a0() {
      var a2, a3, a4, a5, a6, a7, a8, a9, aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, an, ao, ap, aq, ar, as, at, au, av, aw, ax, ay, az, aA;
      return g().wrap(function (aC) {
        for (;;) {
          switch (aC.prev = aC.next) {
            case 0:
              if (console.log("作者：@xzxxn777\n频道：https://t.me/xzxxn777\n群组：https://t.me/xzxxn7777\n自用机场推荐：https://xn--diqv0fut7b.com\n"), j) {
                aC.next = 6;
                break;
              }
              console.log("先去boxjs填写账号密码");
              aC.next = 5;
              return X("先去boxjs填写账号密码");
            case 5:
              return aC.abrupt("return");
            case 6:
              aC.next = 8;
              return V();
            case 8:
              k = aC.sent;
              a2 = j.split(" ");
              a3 = c(a2);
              aC.prev = 11;
              a3.s();
            case 13:
              if ((a4 = a3.n()).done) {
                aC.next = 177;
                break;
              }
              a5 = a4.value;
              console.log("随机生成UA");
              a6 = U();
              v = a6.ua;
              w = a6.commonUa;
              x = a6.uuid;
              console.log(v);
              console.log(w);
              r = a5.split("&")[0];
              s = a5.split("&")[1];
              t = a5.split("&")[2];
              u = a5.split("&")[3] || r;
              console.log("用户：".concat(r, "开始任务"));
              console.log("获取sessionId");
              aC.next = 30;
              return H("/api/account/init");
            case 30:
              a7 = aC.sent;
              n = a7.data.session.id;
              console.log(n);
              console.log("获取signature_key");
              aC.next = 36;
              return D("/web/init?client_id=".concat(q));
            case 36:
              a8 = aC.sent;
              l = a8.data.client.signature_key;
              console.log(l);
              console.log("获取code");
              aC.next = 42;
              return F("/web/oauth/credential_auth");
            case 42:
              if (a9 = aC.sent, a9.data) {
                aC.next = 46;
                break;
              }
              console.log(a9.message);
              return aC.abrupt("continue", 175);
            case 46:
              aa = a9.data.authorization_code.code;
              console.log(aa);
              console.log("登录");
              aC.next = 51;
              return H("/api/zbtxz/login", "check_token=&code=".concat(aa, "&token=&type=-1&union_id="));
            case 51:
              ab = aC.sent;
              console.log("登录成功");
              p = ab.data.session.account_id;
              n = ab.data.session.id;
              console.log("————————————");
              console.log("阅读抽奖");
              console.log("获取token");
              aC.next = 60;
              return L("/auth/userinfo_with_account?accountId=".concat(p, "&sessionId=").concat(n));
            case 60:
              if (ac = aC.sent, y = "Bearer " + ac.result.userinfo.token, console.log(y), console.log("获取id"), z) {
                aC.next = 70;
                break;
              }
              aC.next = 67;
              return L("/tasks");
            case 67:
              ad = aC.sent;
              ae = R();
              z = ad.result[ae.month][ae.day].id;
            case 70:
              console.log(z);
              console.log("开始阅读");
              aC.next = 74;
              return L("/news?task_id=".concat(z, "&account_id=").concat(p, "&session_id=").concat(n, "&device=").concat(x));
            case 74:
              af = aC.sent;
              ag = c(af.result);
              aC.prev = 76;
              ag.s();
            case 78:
              if ((ah = ag.n()).done) {
                aC.next = 122;
                break;
              }
              if (ai = ah.value, console.log(ai.name), !ai.is_fin) {
                aC.next = 84;
                break;
              }
              console.log("已完成");
              return aC.abrupt("continue", 120);
            case 84:
              aj = c(ai.news);
              aC.prev = 85;
              aj.s();
            case 87:
              if ((ak = aj.n()).done) {
                aC.next = 112;
                break;
              }
              an = ak.value;
              console.log("文章：".concat(an.title));
              ao = String(Date.parse(new Date()) / 1000);
              aC.next = 93;
              return N({
                time: ao
              });
            case 93:
              if (ap = aC.sent, null !== (al = ap) && void 0 !== al && al.sign) {
                aC.next = 98;
                break;
              }
              var aE = {};
              aE.time = ao;
              aC.next = 97;
              return N(aE);
            case 97:
              ap = aC.sent;
            case 98:
              aC.next = 100;
              return L("/news/record?t=am&news_id=".concat(an.id, "&timestamp=").concat(ao, "&sign=").concat(null === (am = ap) || void 0 === am ? void 0 : am.sign, "&session_id=").concat(n, "&device=").concat(x, ")"));
            case 100:
              aq = aC.sent;
              console.log("阅读：".concat(aq.msg));
              aC.next = 104;
              return H("/api/favorite/like", "action=true&id=".concat(an.news_id));
            case 104:
              ar = aC.sent;
              console.log("点赞：".concat(ar.message));
              aC.next = 108;
              return H("/api/user_mumber/doTask", "memberType=3&member_type=3&target_id=".concat(an.news_id));
            case 108:
              as = aC.sent;
              console.log("分享：".concat(as.message));
            case 110:
              aC.next = 87;
              break;
            case 112:
              aC.next = 117;
              break;
            case 114:
              aC.prev = 114;
              aC.t0 = aC.catch(85);
              aj.e(aC.t0);
            case 117:
              aC.prev = 117;
              aj.f();
              return aC.finish(117);
            case 120:
              aC.next = 78;
              break;
            case 122:
              aC.next = 127;
              break;
            case 124:
              aC.prev = 124;
              aC.t1 = aC.catch(76);
              ag.e(aC.t1);
            case 127:
              aC.prev = 127;
              ag.f();
              return aC.finish(127);
            case 130:
              aC.next = 132;
              return L("/draw/code");
            case 132:
              at = aC.sent;
              aC.next = 135;
              return L("/draw/code");
            case 135:
              at = aC.sent;
              console.log("拥有".concat(at.result.length, "次抽奖"));
              au = c(at.result);
              aC.prev = 138;
              au.s();
            case 140:
              if ((av = au.n()).done) {
                aC.next = 148;
                break;
              }
              aw = av.value;
              aC.next = 144;
              return J("/draw/lottery", {
                code: aw.code
              });
            case 144:
              ax = aC.sent;
              0 == ax.result ? console.log("抽奖获得红包") : console.log("谢谢参与");
            case 146:
              aC.next = 140;
              break;
            case 148:
              aC.next = 153;
              break;
            case 150:
              aC.prev = 150;
              aC.t2 = aC.catch(138);
              au.e(aC.t2);
            case 153:
              aC.prev = 153;
              au.f();
              return aC.finish(153);
            case 156:
              if (console.log("开始提现"), u && t) {
                aC.next = 160;
                break;
              }
              console.log("请填写支付宝信息");
              return aC.abrupt("continue", 175);
            case 160:
              aC.next = 162;
              return L("/order/profile");
            case 162:
              if (ay = aC.sent, ay.result.alipay_account) {
                aC.next = 168;
                break;
              }
              var aF = {};
              aF.order_id = 0;
              aF.alipay_account = u;
              aF.username = t;
              aC.next = 166;
              return J("/order/bind", aF);
            case 166:
              az = aC.sent;
              console.log("绑定支付宝：".concat(az.result));
            case 168:
              if (console.log("余额：".concat(ay.result.unreceived)), !(ay.result.unreceived > 0)) {
                aC.next = 175;
                break;
              }
              var aG = {};
              aG.order_id = 0;
              aG.alipay_account = u;
              aG.username = t;
              aC.next = 172;
              return J("/order/receive", aG);
            case 172:
              aA = aC.sent;
              console.log("提现：".concat(aA.result));
              aA.msg && (m += "用户".concat(r, " 提现成功：").concat(ay.result.unreceived, "元\n"));
            case 175:
              aC.next = 13;
              break;
            case 177:
              aC.next = 182;
              break;
            case 179:
              aC.prev = 179;
              aC.t3 = aC.catch(11);
              a3.e(aC.t3);
            case 182:
              aC.prev = 182;
              a3.f();
              return aC.finish(182);
            case 185:
              if (!m) {
                aC.next = 188;
                break;
              }
              aC.next = 188;
              return X(m);
            case 188:
            case "end":
              return aC.stop();
          }
        }
      }, a0, null, [[11, 179, 182, 185], [76, 124, 127, 130], [85, 114, 117, 120], [138, 150, 153, 156]]);
    }));
    return C.apply(this, arguments);
  }
  function D(Z) {
    return E.apply(this, arguments);
  }
  function E() {
    E = i(g().mark(function a0(a1) {
      return g().wrap(function (a3) {
        for (;;) {
          switch (a3.prev = a3.next) {
            case 0:
              return a3.abrupt("return", new Promise(function (a5) {
                var a7 = {
                  url: "https://passport.tmuyun.com".concat(a1),
                  headers: {
                    Connection: "Keep-Alive",
                    "Cache-Control": "no-cache",
                    "X-REQUEST-ID": S(),
                    "Accept-Encoding": "gzip",
                    "user-agent": v
                  }
                };
                $.get(a7, function () {
                  var a9 = i(g().mark(function aa(ab, ac, ad) {
                    return g().wrap(function (ag) {
                      for (;;) {
                        switch (ag.prev = ag.next) {
                          case 0:
                            try {
                              ab ? (console.log("".concat(JSON.stringify(ab))), console.log("".concat($.name, " API请求失败，请检查网路重试"))) : a5(JSON.parse(ad));
                            } catch (ak) {
                              $.logErr(ak, ac);
                            } finally {
                              a5();
                            }
                          case 1:
                          case "end":
                            return ag.stop();
                        }
                      }
                    }, aa);
                  }));
                  return function (ab, ac, ad) {
                    return a9.apply(this, arguments);
                  };
                }());
              }));
            case 1:
            case "end":
              return a3.stop();
          }
        }
      }, a0);
    }));
    return E.apply(this, arguments);
  }
  function F(Z) {
    return G.apply(this, arguments);
  }
  function G() {
    G = i(g().mark(function a0(a1) {
      var a3;
      return g().wrap(function (a4) {
        for (;;) {
          switch (a4.prev = a4.next) {
            case 0:
              a3 = P();
              return a4.abrupt("return", new Promise(function (a5) {
                var a7 = {
                  url: "https://passport.tmuyun.com".concat(a1),
                  headers: {
                    Connection: "Keep-Alive",
                    "X-REQUEST-ID": a3.uuid,
                    "X-SIGNATURE": a3.signature,
                    "Cache-Control": "no-cache",
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "Accept-Encoding": "gzip",
                    "user-agent": v
                  },
                  body: a3.body
                };
                $.post(a7, function () {
                  var a9 = i(g().mark(function aa(ab, ac, ad) {
                    return g().wrap(function (ae) {
                      for (;;) {
                        switch (ae.prev = ae.next) {
                          case 0:
                            try {
                              ab ? (console.log("".concat(JSON.stringify(ab))), console.log("".concat($.name, " API请求失败，请检查网路重试"))) : a5(JSON.parse(ad));
                            } catch (af) {
                              $.logErr(af, ac);
                            } finally {
                              a5();
                            }
                          case 1:
                          case "end":
                            return ae.stop();
                        }
                      }
                    }, aa);
                  }));
                  return function (ab, ac, ad) {
                    return a9.apply(this, arguments);
                  };
                }());
              }));
            case 2:
            case "end":
              return a4.stop();
          }
        }
      }, a0);
    }));
    return G.apply(this, arguments);
  }
  function H(Z, a0) {
    return I.apply(this, arguments);
  }
  function I() {
    I = i(g().mark(function a0(a1, a2) {
      var a4;
      return g().wrap(function (a5) {
        for (;;) {
          switch (a5.prev = a5.next) {
            case 0:
              a4 = Q(a1);
              return a5.abrupt("return", new Promise(function (a7) {
                var a9 = {
                  url: "https://vapp.tmuyun.com".concat(a1),
                  headers: {
                    Connection: "Keep-Alive",
                    "X-TIMESTAMP": a4.time,
                    "X-SESSION-ID": n,
                    "X-REQUEST-ID": a4.uuid,
                    "X-SIGNATURE": a4.signature,
                    "X-TENANT-ID": o,
                    "X-ACCOUNT-ID": p,
                    "Cache-Control": "no-cache",
                    "Accept-Encoding": "gzip",
                    "user-agent": w
                  },
                  body: a2
                };
                $.post(a9, function () {
                  var ab = i(g().mark(function ac(ad, ae, af) {
                    return g().wrap(function (ag) {
                      for (;;) {
                        switch (ag.prev = ag.next) {
                          case 0:
                            if (ag.prev = 0, !ad) {
                              ag.next = 6;
                              break;
                            }
                            console.log("".concat(JSON.stringify(ad)));
                            console.log("".concat($.name, " API请求失败，请检查网路重试"));
                            ag.next = 9;
                            break;
                          case 6:
                            ag.next = 8;
                            return $.wait(2000);
                          case 8:
                            a7(JSON.parse(af));
                          case 9:
                            ag.next = 14;
                            break;
                          case 11:
                            ag.prev = 11;
                            ag.t0 = ag.catch(0);
                            $.logErr(ag.t0, ae);
                          case 14:
                            ag.prev = 14;
                            a7();
                            return ag.finish(14);
                          case 17:
                          case "end":
                            return ag.stop();
                        }
                      }
                    }, ac, null, [[0, 11, 14, 17]]);
                  }));
                  return function (ad, ae, af) {
                    return ab.apply(this, arguments);
                  };
                }());
              }));
            case 2:
            case "end":
              return a5.stop();
          }
        }
      }, a0);
    }));
    return I.apply(this, arguments);
  }
  function J(Z, a0) {
    return K.apply(this, arguments);
  }
  function K() {
    K = i(g().mark(function a0(a1, a2) {
      return g().wrap(function (a5) {
        for (;;) {
          switch (a5.prev = a5.next) {
            case 0:
              return a5.abrupt("return", new Promise(function (a7) {
                var a8 = {
                  url: "https://yuedulanxi.lxnews.cn/api".concat(a1),
                  headers: {
                    Connection: "keep-alive",
                    Authorization: y,
                    accept: "*/*",
                    "content-type": "application/json",
                    "user-agent": "Mozilla/5.0 (Linux; Android 11; 21091116AC Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.85 Mobile Safari/537.36;xsb_lanjingling;xsb_lanjingling;2.0.9;native_app;6.9.0",
                    "x-requested-with": "com.shixian.lanxi",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-dest": "empty",
                    "accept-encoding": "gzip, deflate",
                    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
                  },
                  body: JSON.stringify(a2)
                };
                $.post(a8, function () {
                  var aa = i(g().mark(function ab(ac, ad, ae) {
                    return g().wrap(function (ag) {
                      for (;;) {
                        switch (ag.prev = ag.next) {
                          case 0:
                            if (ag.prev = 0, !ac) {
                              ag.next = 6;
                              break;
                            }
                            console.log("".concat(JSON.stringify(ac)));
                            console.log("".concat($.name, " API请求失败，请检查网路重试"));
                            ag.next = 9;
                            break;
                          case 6:
                            ag.next = 8;
                            return $.wait(2000);
                          case 8:
                            a7(JSON.parse(ae));
                          case 9:
                            ag.next = 14;
                            break;
                          case 11:
                            ag.prev = 11;
                            ag.t0 = ag.catch(0);
                            $.logErr(ag.t0, ad);
                          case 14:
                            ag.prev = 14;
                            a7();
                            return ag.finish(14);
                          case 17:
                          case "end":
                            return ag.stop();
                        }
                      }
                    }, ab, null, [[0, 11, 14, 17]]);
                  }));
                  return function (ac, ad, ae) {
                    return aa.apply(this, arguments);
                  };
                }());
              }));
            case 1:
            case "end":
              return a5.stop();
          }
        }
      }, a0);
    }));
    return K.apply(this, arguments);
  }
  function L(Z) {
    return M.apply(this, arguments);
  }
  function M() {
    M = i(g().mark(function a0(a1) {
      return g().wrap(function (a3) {
        for (;;) {
          switch (a3.prev = a3.next) {
            case 0:
              return a3.abrupt("return", new Promise(function (a4) {
                var a6 = {
                  url: "https://yuedulanxi.lxnews.cn/api".concat(a1),
                  headers: {
                    Connection: "keep-alive",
                    Authorization: y,
                    accept: "*/*",
                    "content-type": "application/json",
                    "user-agent": "Mozilla/5.0 (Linux; Android 11; 21091116AC Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.85 Mobile Safari/537.36;xsb_lanjingling;xsb_lanjingling;2.0.9;native_app;6.9.0",
                    "x-requested-with": "com.shixian.lanxi",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-dest": "empty",
                    "accept-encoding": "gzip, deflate",
                    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
                  }
                };
                $.get(a6, function () {
                  var a7 = i(g().mark(function a8(a9, aa, ab) {
                    return g().wrap(function (ad) {
                      for (;;) {
                        switch (ad.prev = ad.next) {
                          case 0:
                            if (ad.prev = 0, !a9) {
                              ad.next = 6;
                              break;
                            }
                            console.log("".concat(JSON.stringify(a9)));
                            console.log("".concat($.name, " API请求失败，请检查网路重试"));
                            ad.next = 9;
                            break;
                          case 6:
                            ad.next = 8;
                            return $.wait(2000);
                          case 8:
                            a4(JSON.parse(ab));
                          case 9:
                            ad.next = 14;
                            break;
                          case 11:
                            ad.prev = 11;
                            ad.t0 = ad.catch(0);
                            $.logErr(ad.t0, aa);
                          case 14:
                            ad.prev = 14;
                            a4();
                            return ad.finish(14);
                          case 17:
                          case "end":
                            return ad.stop();
                        }
                      }
                    }, a8, null, [[0, 11, 14, 17]]);
                  }));
                  return function (a9, aa, ab) {
                    return a7.apply(this, arguments);
                  };
                }());
              }));
            case 1:
            case "end":
              return a3.stop();
          }
        }
      }, a0);
    }));
    return M.apply(this, arguments);
  }
  function N(Z) {
    return O.apply(this, arguments);
  }
  function O() {
    O = i(g().mark(function a0(a1) {
      return g().wrap(function (a4) {
        for (;;) {
          switch (a4.prev = a4.next) {
            case 0:
              return a4.abrupt("return", new Promise(function (a6) {
                var a7 = {
                  url: "https://lanjingling.xzxxn7.live/md5",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(a1)
                };
                $.post(a7, function (a8, a9, aa) {
                  try {
                    a8 ? (console.log("".concat(JSON.stringify(a8))), console.log("".concat($.name, " API请求失败，请检查网路重试"))) : a6(JSON.parse(aa));
                  } catch (ab) {
                    $.logErr(ab, a9);
                  } finally {
                    a6();
                  }
                });
              }));
            case 1:
            case "end":
              return a4.stop();
          }
        }
      }, a0);
    }));
    return O.apply(this, arguments);
  }
  function P() {
    var a5 = new (k.loadJSEncrypt())();
    a5.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD6XO7e9YeAOs+cFqwa7ETJ+WXizPqQeXv68i5vqw9pFREsrqiBTRcg7wB0RIp3rJkDpaeVJLsZqYm5TW7FWx/iOiXFc+zCPvaKZric2dXCw27EvlH5rq+zwIPDAJHGAfnn1nmQH7wR3PCatEIb8pz5GFlTHMlluw4ZYmnOwg+thwIDAQAB");
    s = a5.encrypt(s);
    var a2 = S(),
      a3 = "client_id=".concat(q, "&password=").concat(s, "&phone_number=").concat(r),
      a4 = "post%%/web/oauth/credential_auth?".concat(a3, "%%").concat(a2, "%%");
    a3 = "client_id=".concat(q, "&password=").concat(encodeURIComponent(s), "&phone_number=").concat(r);
    CryptoJS = k.createCryptoJS();
    var a6 = CryptoJS.HmacSHA256(a4, l),
      a7 = CryptoJS.enc.Hex.stringify(a6);
    var a1 = {};
    a1.uuid = a2;
    a1.signature = a7;
    a1.body = a3;
    return a1;
  }
  function Q(Z) {
    var a0 = S(),
      a1 = Date.now();
    Z.indexOf("?") > 0 && (Z = Z.substring(0, Z.indexOf("?")));
    CryptoJS = k.createCryptoJS();
    var a2 = CryptoJS.SHA256("".concat(Z, "&&").concat(n, "&&").concat(a0, "&&").concat(a1, "&&").concat(A, "&&").concat(o)).toString(),
      a3 = {
        uuid: a0,
        time: a1,
        signature: a2
      };
    return a3;
  }
  function R() {
    var Z = new Date(),
      a0 = Z.getFullYear(),
      a1 = String(Z.getMonth() + 1).padStart(2, "0"),
      a2 = String(Z.getDate()).padStart(2, "0");
    return {
      month: "".concat(a0, "-").concat(a1),
      day: "".concat(a0, "-").concat(a1, "-").concat(a2)
    };
  }
  function S() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a0) {
      var a1 = 16 * Math.random() | 0,
        a2 = "x" === a0 ? a1 : 3 & a1 | 8;
      return a2.toString(16);
    });
  }
  function T(Z) {
    return Z[Math.floor(Math.random() * Z.length)];
  }
  function U() {
    var Z = "1.1.9",
      a0 = S(),
      a1 = T(["M1903F2A", "M2001J2E", "M2001J2C", "M2001J1E", "M2001J1C", "M2002J9E", "M2011K2C", "M2102K1C", "M2101K9C", "2107119DC", "2201123C", "2112123AC", "2201122C", "2211133C", "2210132C", "2304FPN6DC", "23127PN0CC", "24031PN0DC", "23090RA98C", "2312DRA50C", "2312CRAD3C", "2312DRAABC", "22101316UCP", "22101316C"]),
      a2 = "Xiaomi " + a1,
      a3 = "Android",
      a4 = "".concat(a3.toUpperCase(), ";").concat("11", ";").concat(q, ";").concat(Z, ";1.0;null;").concat(a1),
      a5 = "".concat(Z, ";").concat(a0, ";").concat(a2, ";").concat(a3, ";").concat("11", ";").concat("Release", ";").concat("6.11.0"),
      a6 = {
        ua: a4,
        commonUa: a5,
        uuid: a0
      };
    return a6;
  }
  function V() {
    return W.apply(this, arguments);
  }
  function W() {
    W = i(g().mark(function Z() {
      var a1;
      return g().wrap(function a2(a3) {
        for (;;) {
          switch (a3.prev = a3.next) {
            case 0:
              if (a1 = $.getdata("Utils_Code") || "", !a1 || !Object.keys(a1).length) {
                a3.next = 5;
                break;
              }
              console.log("✅ ".concat($.name, ": 缓存中存在Utils代码, 跳过下载"));
              eval(a1);
              return a3.abrupt("return", creatUtils());
            case 5:
              console.log("🚀 ".concat($.name, ": 开始下载Utils代码"));
              return a3.abrupt("return", new Promise(function () {
                var a5 = i(g().mark(function a6(a7) {
                  return g().wrap(function a8(a9) {
                    for (;;) {
                      switch (a9.prev = a9.next) {
                        case 0:
                          $.getScript("https://mirror.ghproxy.com/https://raw.githubusercontent.com/xzxxn777/Surge/main/Utils/Utils.js").then(function (ab) {
                            $.setdata(ab, "Utils_Code");
                            eval(ab);
                            console.log("✅ Utils加载成功, 请继续");
                            a7(creatUtils());
                          });
                        case 1:
                        case "end":
                          return a9.stop();
                      }
                    }
                  }, a6);
                }));
                return function (a7) {
                  return a5.apply(this, arguments);
                };
              }()));
            case 7:
            case "end":
              return a3.stop();
          }
        }
      }, Z);
    }));
    return W.apply(this, arguments);
  }
  function X(Z) {
    return Y.apply(this, arguments);
  }
  function Y() {
    Y = i(g().mark(function a0(a1) {
      return g().wrap(function (a4) {
        for (;;) {
          switch (a4.prev = a4.next) {
            case 0:
              if (!$.isNode()) {
                a4.next = 5;
                break;
              }
              a4.next = 3;
              return notify.sendNotify($.name, a1);
            case 3:
              a4.next = 6;
              break;
            case 5:
              $.msg($.name, "", a1);
            case 6:
            case "end":
              return a4.stop();
          }
        }
      }, a0);
    }));
    return Y.apply(this, arguments);
  }
  i(g().mark(function Z() {
    return g().wrap(function (a0) {
      for (;;) {
        switch (a0.prev = a0.next) {
          case 0:
            a0.next = 2;
            return B();
          case 2:
          case "end":
            return a0.stop();
        }
      }
    }, Z);
  }))().catch(function (a0) {
    $.log(a0);
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
