/**
 * cron "19 8,19 * * *" Colorful.js
 * export COLORFUL='[{"id": "1", "token": "Authorization","refreshToken:"xxxX-Authorization"},{"id": "2", "token": "Authorization","refreshToken:"xxxX-Authorization"}]'
 * export COLORFUL_RAFFLE='true' //开启抽奖
 */
const $ = new Env('七彩虹商城')

const COLORFUL = ($.isNode() ? (process.env.COLORFUL ? JSON.parse(process.env.COLORFUL) : undefined) : $.getjson("COLORFUL")) || [],
    COLORFUL_RAFFLE  =  ($.isNode() ? process.env.COLORFUL_RAFFLE : $.getjson("COLORFUL_RAFFLE")) || false;
let token = '', refreshToken = ''
let notice = ''
!(async () => {
    if (typeof $request != "undefined") {
        await getCookie();
    } else {
        await main();
    }
})().catch((e) => {
    $.log(e)
}).finally(() => {
    $.done({});
});


async function main() {

    console.log('作者：@xzxxn777\n频道：https://t.me/xzxxn777\n群组：https://t.me/xzxxn7777\n自用机场推荐：https://xn--diqv0fut7b.com\n')
    for (const item of COLORFUL) {
        id = item.id;
        token = item.token;
        refreshToken = item.refreshToken
        let userInfo = await commonGet('/User/GetUserInfo')
        if (userInfo.Code == 401) {
            await sendMsg(`用户：${id}\ntoken已过期，请重新获取`);
            continue
        }
        console.log(`用户：${id}开始任务`)
        let taskPoint = await commonGet('/Sys/GetPointConfig')
        if (taskPoint.Code == 401) {
            await sendMsg(`用户：${id}\ntoken已过期，请重新获取`);
            continue
        }
        for (const point of taskPoint.Data?.DataList) {
            console.log(`${point.Name} ${point.Title} ${point.PerPoint}`)
            if (point.DayMaxPointTotal === point.DayGetPointTotal) {
                continue
            }
            switch (point.Name) {
                case '社区签到':
                    let sign = await commonPost('/User/Sign')
                    console.log(`${sign.Code} ${sign.Message}  ${sign.Data?.Point}`)
                    break;
                case '会员信息完善':
                    let data = await commonPost('/User/DoEditInfo', {
                        "Birthday": getRandomBirthday(),
                        "Nickname": userInfo.Data.Nickname,
                        "Sex": 1
                    })
                    console.log(`${data.Code} ${data.Message} `)
                    break;
                case '购物有礼':
                    break;
                case '社区内容发布':
                    let hitokotoData = await hitokoto();
                    if (hitokotoData?.hitokoto) {
                        let body1 = {
                            "ModuleId": "09539c50-6de2-4a0c-adc8-535e488a419e",
                            "Phone": userInfo.Data.Mobile,
                            "Title": "签到",
                            "Content": hitokotoData.hitokoto,
                            "Pictures": [],
                            "Source": 30
                        };
                        console.log(body1)
                        let data = await commonPost('/Bbs/Posting', body1)
                        console.log(`${data.Code} ${data.Message} `)
                    }

                    break;
                case '社区内容评论':
                    let PostingList =await commonGet('/Bbs/GetPostingList?page=1&size=20&moduleId=09539c50-6de2-4a0c-adc8-535e488a419e&phone=')
                    if (PostingList?.Data?.DataList) {
                        for (let i = 0; i < 3; i++) {
                            let hitokotoData2 = await hitokoto();
                            if (hitokotoData2?.hitokoto) {
                                let body = {
                                    "PostId": PostingList?.Data?.DataList[Math.floor(Math.random() * 20)].Id,
                                    "ReplyId": "",
                                    "ParentReplyId": "",
                                    "Phone": userInfo.Data.Mobile,
                                    "Content": hitokotoData2.hitokoto,
                                    "Pictures": []
                                };
                                console.log(body)
                               let data3= await commonPost('/Bbs/PostReply', body)
                                console.log(data3)
                                await $.wait(Math.floor(Math.random() * 5000 + 10000));
                            }
                        }
                    }
                    break;
                default :
                    console.log('未实现');
                    break;
            }
        }
        console.log(`抽奖 ${COLORFUL_RAFFLE}`)
        if (COLORFUL_RAFFLE){
          let  activityData = await commonGet('/Activity/GetPageList?Page=1&Limit=20')
            for (const activity of activityData.Data.DataList) {
                console.log(`活动：${activity.Name} ${activity.StatusDescription} ${activity.TypeDescription}`)
                if (activity.Type==1 && activity.Status==1){
                    let  luckyDrawInfo = await commonGet(`/LuckyDraw/GetLuckyDraw?Key=${activity.ActivityKey}`)
                    for (let i = 0; i < luckyDrawInfo.Data.ResidueCount; i++) {
                        let luckyDraw = await commonPost(`/LuckyDraw/Do`,{key:activity.ActivityKey})
                        console.log(luckyDraw)
                        await $.wait(2000)
                    }
                }
            }
        }
        console.log("————————————")
        console.log("查询积分")
        userInfo = await commonGet('/User/GetUserInfo')
        console.log(`拥有积分：${userInfo.Data.Point}\n`)
        notice += `用户：${id} 拥有积分: ${userInfo.Data.Point}\n`
        extracted(id, token, refreshToken)
    }
    if (notice) {
        await sendMsg(notice);
    }
}

async function hitokoto() {
    return new Promise(resolve => {
        $.get({
            url: `https://v1.hitokoto.cn/?c=a&c=b&c=c&c=d&c=e&c=f&c=i&c=j&c=k&c=l&min_length=5`,
            timeout: 10000
        }, (err, resp, data) => {
            try {
                if (err) {
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    let dataObj = JSON.parse(data);
                    resolve(dataObj);
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

function getRandomBirthday() {
    const start = new Date(1980, 0, 1).getTime(); // 1980-01-01
    const end = new Date(2005, 11, 31).getTime(); // 2005-12-31
    const randomTime = start + Math.random() * (end - start);
    const randomDate = new Date(randomTime);

    const year = randomDate.getFullYear();
    const month = ('0' + (randomDate.getMonth() + 1)).slice(-2); // Months are zero-indexed
    const day = ('0' + randomDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
}
function extracted(id, token, refreshToken) {
    const newData = {"id": id, "token": token, "refreshToken": refreshToken};
    const index = COLORFUL.findIndex(e => e.id == newData.id);
    if (index !== -1) {
        if (COLORFUL[index].token === newData.token) {
            return
        } else {
            COLORFUL[index] = newData;
            console.log(JSON.stringify(newData))
            $.msg($.name, `🎉用户${newData.id}更新token成功!`, ``);
        }
    } else {
        COLORFUL.push(newData)
        console.log(JSON.stringify(newData))
        $.msg($.name, `🎉新增用户${newData.id}成功!`, ``);
    }
    $.setjson(COLORFUL, "COLORFUL");
}

async function getCookie() {
    const token = $request.headers["Authorization"] || $request.headers["authorization"];
    const refreshToken = $request.headers["X-Authorization"] || $request.headers["x-authorization"];
    if (!token && !refreshToken) {
        return
    }
    const body = $.toObj($response.body);
    if (!body?.Data?.Id) {
        return
    }
    const id = body.Data.Id;
    extracted(id, token, refreshToken);
}

async function commonPost(url, body = {}) {
    return new Promise(resolve => {
        const options = {
            url: `https://shopapi.skycolorful.com/api${url}`,
            headers: {
                'Host': 'shopapi.skycolorful.com',
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090b13)XWEB/9185',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
                'version': '2.0.0',
                'User-from': 'xcx',
                'source': 'Wx',
                'xweb_xhr': 1,
                'UcSource': 30,
                'Referer': 'https://servicewechat.com/wx49018277e65fc3e1/55/page-frame.html',
                'Authorization': `Bearer ${token}`,
                'X-Authorization': `Bearer ${refreshToken}`,
                ...sign()
            },
            body: JSON.stringify(body)
        }
        $.post(options, async (err, resp, data) => {
            try {
                if (err) {
                    if (data) {
                        resolve(JSON.parse(data));
                    } else {
                        console.log(`${JSON.stringify(err)}`)
                        console.log(`${$.name} API请求失败，请检查网路重试`)
                    }
                } else {
                    const token1 = resp.headers["Authorization"] || resp.headers["authorization"];
                    const refreshToken1 = resp.headers["X-Authorization"] || resp.headers["x-authorization"];
                    if (token1 && refreshToken1) {
                        token = token1
                        refreshToken = token1
                    }
                    await $.wait(1000)
                    resolve(JSON.parse(data));
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

async function commonGet(url) {
    return new Promise(resolve => {
        const options = {
            url: `https://shopapi.skycolorful.com/api${url}`,
            headers: {
                'Host': 'shopapi.skycolorful.com',
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090b13)XWEB/9185',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
                'version': '2.0.0',
                'User-from': 'xcx',
                'source': 'Wx',
                'xweb_xhr': 1,
                'UcSource': 30,
                'Referer': 'https://servicewechat.com/wx49018277e65fc3e1/55/page-frame.html',
                'Authorization': `Bearer ${token}`,
                'X-Authorization': `Bearer ${refreshToken}`,
                ...sign()
            }
        }
        $.get(options, async (err, resp, data) => {
            try {
                if (resp.statusCode == 401) {
                    resolve({Code: 401});
                } else {
                    if (err) {
                        if (data) {
                            resolve(JSON.parse(data));
                        } else {
                            console.log(`${JSON.stringify(err)}`)
                            console.log(`${$.name} API请求失败，请检查网路重试`)
                        }
                    } else {
                        const token1 = resp.headers["access-token"] || resp.headers["Access-Token"];
                        const refreshToken1 = resp.headers["x-Access-Token"]|| resp.headers["x-access-token"];
                        if (token1 && refreshToken1) {
                            token = token1
                            refreshToken = token1
                        }
                        await $.wait(1000)
                        resolve(JSON.parse(data));
                    }
                }

            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

async function sendMsg(message) {
    if ($.isNode()) {
        let notify = ''
        try {
            notify = require('./sendNotify');
        } catch (e) {
            notify = require("../sendNotify");
        }
        await notify.sendNotify($.name, message);
    } else {
        $.msg($.name, '', message)
    }
}

function sign() {
    let t = Date.now(), uuid = v4(), appId = '815d8026-9a52-4445-a42c-a5443134232e',
        o = md5([JSON.stringify({AppId: appId}), JSON.stringify({Ticks: t}), JSON.stringify({requestId: uuid}), JSON.stringify({AppSecret: "2b5c01fb-7640-401a-8188-43a13190a626"})].join(""));
    return {
        AppId: appId,
        Ticks: t,
        AppSecret: 'MmI1YzAxZmItNzY0MC00MDFhLTgxODgtNDNhMTMxOTBhNjI2',
        requestId: uuid,
        Sign: o
    }
}

function uuidToString(buffer, offset) {
    var hex = [];
    for (var i = 0; i < 256; ++i) {
        hex[i] = (i + 0x100).toString(16).substr(1);
    }
    var i = offset || 0;
    return [
        hex[buffer[i++]], hex[buffer[i++]], hex[buffer[i++]], hex[buffer[i++]], '-',
        hex[buffer[i++]], hex[buffer[i++]], '-',
        hex[buffer[i++]], hex[buffer[i++]], '-',
        hex[buffer[i++]], hex[buffer[i++]], '-',
        hex[buffer[i++]], hex[buffer[i++]], hex[buffer[i++]], hex[buffer[i++]], hex[buffer[i++]], hex[buffer[i++]]
    ].join('');
}

function v4(options, buf, offset) {
    options = options || {};
    let i = buf && offset || 0;

    if (typeof options === 'string') {
        buf = options === 'binary' ? new Array(16) : null;
        options = null;
    }

    let rnds = new Array(16);
    for (let c = 0, r; c < 16; c++) {
        if ((c & 3) === 0) r = Math.random() * 0x100000000;
        rnds[c] = (r >>> ((c & 3) << 3)) & 0xff;
    }
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    if (buf) {
        for (var ii = 0; ii < 16; ++ii) {
            buf[i + ii] = rnds[ii];
        }
    }

    return buf || uuidToString(rnds);
}


function md5(r) {
    return rstr2hex(rstr_md5(str2rstr_utf8(r)))
}

function b64_md5(r) {
    return rstr2b64(rstr_md5(str2rstr_utf8(r)))
}

function any_md5(r, t) {
    return rstr2any(rstr_md5(str2rstr_utf8(r)), t)
}

function hex_hmac_md5(r, t) {
    return rstr2hex(rstr_hmac_md5(str2rstr_utf8(r), str2rstr_utf8(t)))
}

function b64_hmac_md5(r, t) {
    return rstr2b64(rstr_hmac_md5(str2rstr_utf8(r), str2rstr_utf8(t)))
}

function any_hmac_md5(r, t, d) {
    return rstr2any(rstr_hmac_md5(str2rstr_utf8(r), str2rstr_utf8(t)), d)
}

function md5_vm_test() {
    return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc").toLowerCase()
}

function rstr_md5(r) {
    return binl2rstr(binl_md5(rstr2binl(r), 8 * r.length))
}

function rstr_hmac_md5(r, t) {
    var d = rstr2binl(r);
    d.length > 16 && (d = binl_md5(d, 8 * r.length));
    for (var n = Array(16), _ = Array(16), m = 0; m < 16; m++) n[m] = 909522486 ^ d[m], _[m] = 1549556828 ^ d[m];
    var f = binl_md5(n.concat(rstr2binl(t)), 512 + 8 * t.length);
    return binl2rstr(binl_md5(_.concat(f), 640))
}

function rstr2hex(r) {
    for (var t, d = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", n = "", _ = 0; _ < r.length; _++) t = r.charCodeAt(_), n += d.charAt(t >>> 4 & 15) + d.charAt(15 & t);
    return n
}

function rstr2b64(r) {
    for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", d = "", n = r.length, _ = 0; _ < n; _ += 3) for (var m = r.charCodeAt(_) << 16 | (_ + 1 < n ? r.charCodeAt(_ + 1) << 8 : 0) | (_ + 2 < n ? r.charCodeAt(_ + 2) : 0), f = 0; f < 4; f++) 8 * _ + 6 * f > 8 * r.length ? d += b64pad : d += t.charAt(m >>> 6 * (3 - f) & 63);
    return d
}

function rstr2any(r, t) {
    var d, n, _, m, f, h = t.length, e = Array(Math.ceil(r.length / 2));
    for (d = 0; d < e.length; d++) e[d] = r.charCodeAt(2 * d) << 8 | r.charCodeAt(2 * d + 1);
    var a = Math.ceil(8 * r.length / (Math.log(t.length) / Math.log(2))), i = Array(a);
    for (n = 0; n < a; n++) {
        for (f = Array(), m = 0, d = 0; d < e.length; d++) m = (m << 16) + e[d], _ = Math.floor(m / h), m -= _ * h, (f.length > 0 || _ > 0) && (f[f.length] = _);
        i[n] = m, e = f
    }
    var o = "";
    for (d = i.length - 1; d >= 0; d--) o += t.charAt(i[d]);
    return o
}

function str2rstr_utf8(r) {
    for (var t, d, n = "", _ = -1; ++_ < r.length;) t = r.charCodeAt(_), d = _ + 1 < r.length ? r.charCodeAt(_ + 1) : 0, 55296 <= t && t <= 56319 && 56320 <= d && d <= 57343 && (t = 65536 + ((1023 & t) << 10) + (1023 & d), _++), t <= 127 ? n += String.fromCharCode(t) : t <= 2047 ? n += String.fromCharCode(192 | t >>> 6 & 31, 128 | 63 & t) : t <= 65535 ? n += String.fromCharCode(224 | t >>> 12 & 15, 128 | t >>> 6 & 63, 128 | 63 & t) : t <= 2097151 && (n += String.fromCharCode(240 | t >>> 18 & 7, 128 | t >>> 12 & 63, 128 | t >>> 6 & 63, 128 | 63 & t));
    return n
}

function str2rstr_utf16le(r) {
    for (var t = "", d = 0; d < r.length; d++) t += String.fromCharCode(255 & r.charCodeAt(d), r.charCodeAt(d) >>> 8 & 255);
    return t
}

function str2rstr_utf16be(r) {
    for (var t = "", d = 0; d < r.length; d++) t += String.fromCharCode(r.charCodeAt(d) >>> 8 & 255, 255 & r.charCodeAt(d));
    return t
}

function rstr2binl(r) {
    for (var t = Array(r.length >> 2), d = 0; d < t.length; d++) t[d] = 0;
    for (d = 0; d < 8 * r.length; d += 8) t[d >> 5] |= (255 & r.charCodeAt(d / 8)) << d % 32;
    return t
}

function binl2rstr(r) {
    for (var t = "", d = 0; d < 32 * r.length; d += 8) t += String.fromCharCode(r[d >> 5] >>> d % 32 & 255);
    return t
}

function binl_md5(r, t) {
    r[t >> 5] |= 128 << t % 32, r[14 + (t + 64 >>> 9 << 4)] = t;
    for (var d = 1732584193, n = -271733879, _ = -1732584194, m = 271733878, f = 0; f < r.length; f += 16) {
        var h = d, e = n, a = _, i = m;
        d = md5_ff(d, n, _, m, r[f + 0], 7, -680876936), m = md5_ff(m, d, n, _, r[f + 1], 12, -389564586), _ = md5_ff(_, m, d, n, r[f + 2], 17, 606105819), n = md5_ff(n, _, m, d, r[f + 3], 22, -1044525330), d = md5_ff(d, n, _, m, r[f + 4], 7, -176418897), m = md5_ff(m, d, n, _, r[f + 5], 12, 1200080426), _ = md5_ff(_, m, d, n, r[f + 6], 17, -1473231341), n = md5_ff(n, _, m, d, r[f + 7], 22, -45705983), d = md5_ff(d, n, _, m, r[f + 8], 7, 1770035416), m = md5_ff(m, d, n, _, r[f + 9], 12, -1958414417), _ = md5_ff(_, m, d, n, r[f + 10], 17, -42063), n = md5_ff(n, _, m, d, r[f + 11], 22, -1990404162), d = md5_ff(d, n, _, m, r[f + 12], 7, 1804603682), m = md5_ff(m, d, n, _, r[f + 13], 12, -40341101), _ = md5_ff(_, m, d, n, r[f + 14], 17, -1502002290), n = md5_ff(n, _, m, d, r[f + 15], 22, 1236535329), d = md5_gg(d, n, _, m, r[f + 1], 5, -165796510), m = md5_gg(m, d, n, _, r[f + 6], 9, -1069501632), _ = md5_gg(_, m, d, n, r[f + 11], 14, 643717713), n = md5_gg(n, _, m, d, r[f + 0], 20, -373897302), d = md5_gg(d, n, _, m, r[f + 5], 5, -701558691), m = md5_gg(m, d, n, _, r[f + 10], 9, 38016083), _ = md5_gg(_, m, d, n, r[f + 15], 14, -660478335), n = md5_gg(n, _, m, d, r[f + 4], 20, -405537848), d = md5_gg(d, n, _, m, r[f + 9], 5, 568446438), m = md5_gg(m, d, n, _, r[f + 14], 9, -1019803690), _ = md5_gg(_, m, d, n, r[f + 3], 14, -187363961), n = md5_gg(n, _, m, d, r[f + 8], 20, 1163531501), d = md5_gg(d, n, _, m, r[f + 13], 5, -1444681467), m = md5_gg(m, d, n, _, r[f + 2], 9, -51403784), _ = md5_gg(_, m, d, n, r[f + 7], 14, 1735328473), n = md5_gg(n, _, m, d, r[f + 12], 20, -1926607734), d = md5_hh(d, n, _, m, r[f + 5], 4, -378558), m = md5_hh(m, d, n, _, r[f + 8], 11, -2022574463), _ = md5_hh(_, m, d, n, r[f + 11], 16, 1839030562), n = md5_hh(n, _, m, d, r[f + 14], 23, -35309556), d = md5_hh(d, n, _, m, r[f + 1], 4, -1530992060), m = md5_hh(m, d, n, _, r[f + 4], 11, 1272893353), _ = md5_hh(_, m, d, n, r[f + 7], 16, -155497632), n = md5_hh(n, _, m, d, r[f + 10], 23, -1094730640), d = md5_hh(d, n, _, m, r[f + 13], 4, 681279174), m = md5_hh(m, d, n, _, r[f + 0], 11, -358537222), _ = md5_hh(_, m, d, n, r[f + 3], 16, -722521979), n = md5_hh(n, _, m, d, r[f + 6], 23, 76029189), d = md5_hh(d, n, _, m, r[f + 9], 4, -640364487), m = md5_hh(m, d, n, _, r[f + 12], 11, -421815835), _ = md5_hh(_, m, d, n, r[f + 15], 16, 530742520), n = md5_hh(n, _, m, d, r[f + 2], 23, -995338651), d = md5_ii(d, n, _, m, r[f + 0], 6, -198630844), m = md5_ii(m, d, n, _, r[f + 7], 10, 1126891415), _ = md5_ii(_, m, d, n, r[f + 14], 15, -1416354905), n = md5_ii(n, _, m, d, r[f + 5], 21, -57434055), d = md5_ii(d, n, _, m, r[f + 12], 6, 1700485571), m = md5_ii(m, d, n, _, r[f + 3], 10, -1894986606), _ = md5_ii(_, m, d, n, r[f + 10], 15, -1051523), n = md5_ii(n, _, m, d, r[f + 1], 21, -2054922799), d = md5_ii(d, n, _, m, r[f + 8], 6, 1873313359), m = md5_ii(m, d, n, _, r[f + 15], 10, -30611744), _ = md5_ii(_, m, d, n, r[f + 6], 15, -1560198380), n = md5_ii(n, _, m, d, r[f + 13], 21, 1309151649), d = md5_ii(d, n, _, m, r[f + 4], 6, -145523070), m = md5_ii(m, d, n, _, r[f + 11], 10, -1120210379), _ = md5_ii(_, m, d, n, r[f + 2], 15, 718787259), n = md5_ii(n, _, m, d, r[f + 9], 21, -343485551), d = safe_add(d, h), n = safe_add(n, e), _ = safe_add(_, a), m = safe_add(m, i)
    }
    return Array(d, n, _, m)
}

function md5_cmn(r, t, d, n, _, m) {
    return safe_add(bit_rol(safe_add(safe_add(t, r), safe_add(n, m)), _), d)
}

function md5_ff(r, t, d, n, _, m, f) {
    return md5_cmn(t & d | ~t & n, r, t, _, m, f)
}

function md5_gg(r, t, d, n, _, m, f) {
    return md5_cmn(t & n | d & ~n, r, t, _, m, f)
}

function md5_hh(r, t, d, n, _, m, f) {
    return md5_cmn(t ^ d ^ n, r, t, _, m, f)
}

function md5_ii(r, t, d, n, _, m, f) {
    return md5_cmn(d ^ (t | ~n), r, t, _, m, f)
}

function safe_add(r, t) {
    var d = (65535 & r) + (65535 & t), n = (r >> 16) + (t >> 16) + (d >> 16);
    return n << 16 | 65535 & d
}

function bit_rol(r, t) {
    return r << t | r >>> 32 - t
}

var hexcase = 0, b64pad = "";

// prettier-ignore
function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {url: t} : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise(((e, i) => {
                s.call(this, t, ((t, s, o) => {
                    t ? i(t) : e(s)
                }))
            }))
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.logLevels = {debug: 0, info: 1, warn: 2, error: 3}, this.logLevelPrefixs = {
                debug: "[DEBUG] ",
                info: "[INFO] ",
                warn: "[WARN] ",
                error: "[ERROR] "
            }, this.logLevel = "info", this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        getEnv() {
            return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0
        }

        isNode() {
            return "Node.js" === this.getEnv()
        }

        isQuanX() {
            return "Quantumult X" === this.getEnv()
        }

        isSurge() {
            return "Surge" === this.getEnv()
        }

        isLoon() {
            return "Loon" === this.getEnv()
        }

        isShadowrocket() {
            return "Shadowrocket" === this.getEnv()
        }

        isStash() {
            return "Stash" === this.getEnv()
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null, ...s) {
            try {
                return JSON.stringify(t, ...s)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            if (this.getdata(t)) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise((e => {
                this.get({url: t}, ((t, s, i) => e(i)))
            }))
        }

        runScript(t, e) {
            return new Promise((s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let o = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                o = o ? 1 * o : 20, o = e && e.timeout ? e.timeout : o;
                const [r, a] = i.split("@"), n = {
                    url: `http://${a}/v1/scripting/evaluate`,
                    body: {script_text: t, mock_type: "cron", timeout: o},
                    headers: {"X-Key": r, Accept: "*/*"},
                    timeout: o
                };
                this.post(n, ((t, e, i) => s(i)))
            })).catch((t => this.logErr(t)))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), o = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, o) : i ? this.fs.writeFileSync(e, o) : this.fs.writeFileSync(t, o)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let o = t;
            for (const t of i) if (o = Object(o)[t], void 0 === o) return s;
            return o
        }

        lodash_set(t, e, s) {
            return Object(t) !== t || (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce(((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}), t)[e[e.length - 1]] = s), t
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), o = s ? this.getval(s) : "";
                if (o) try {
                    const t = JSON.parse(o);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, o] = /^@(.*?)\.(.*?)$/.exec(e), r = this.getval(i),
                    a = i ? "null" === r ? null : r || "{}" : "{}";
                try {
                    const e = JSON.parse(a);
                    this.lodash_set(e, o, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const r = {};
                    this.lodash_set(r, o, t), s = this.setval(JSON.stringify(r), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            switch (this.getEnv()) {
                case"Surge":
                case"Loon":
                case"Stash":
                case"Shadowrocket":
                    return $persistentStore.read(t);
                case"Quantumult X":
                    return $prefs.valueForKey(t);
                case"Node.js":
                    return this.data = this.loaddata(), this.data[t];
                default:
                    return this.data && this.data[t] || null
            }
        }

        setval(t, e) {
            switch (this.getEnv()) {
                case"Surge":
                case"Loon":
                case"Stash":
                case"Shadowrocket":
                    return $persistentStore.write(t, e);
                case"Quantumult X":
                    return $prefs.setValueForKey(t, e);
                case"Node.js":
                    return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0;
                default:
                    return this.data && this.data[e] || null
            }
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.cookie && void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)))
        }

        get(t, e = (() => {
        })) {
            switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {redirection: !1})), this.getEnv()) {
                case"Surge":
                case"Loon":
                case"Stash":
                case"Shadowrocket":
                default:
                    this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.get(t, ((t, s, i) => {
                        !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, i)
                    }));
                    break;
                case"Quantumult X":
                    this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then((t => {
                        const {statusCode: s, statusCode: i, headers: o, body: r, bodyBytes: a} = t;
                        e(null, {status: s, statusCode: i, headers: o, body: r, bodyBytes: a}, r, a)
                    }), (t => e(t && t.error || "UndefinedError")));
                    break;
                case"Node.js":
                    let s = require("iconv-lite");
                    this.initGotEnv(t), this.got(t).on("redirect", ((t, e) => {
                        try {
                            if (t.headers["set-cookie"]) {
                                const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                                s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                            }
                        } catch (t) {
                            this.logErr(t)
                        }
                    })).then((t => {
                        const {statusCode: i, statusCode: o, headers: r, rawBody: a} = t,
                            n = s.decode(a, this.encoding);
                        e(null, {status: i, statusCode: o, headers: r, rawBody: a, body: n}, n)
                    }), (t => {
                        const {message: i, response: o} = t;
                        e(i, o, o && s.decode(o.rawBody, this.encoding))
                    }));
                    break
            }
        }

        post(t, e = (() => {
        })) {
            const s = t.method ? t.method.toLocaleLowerCase() : "post";
            switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {redirection: !1})), this.getEnv()) {
                case"Surge":
                case"Loon":
                case"Stash":
                case"Shadowrocket":
                default:
                    this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient[s](t, ((t, s, i) => {
                        !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, i)
                    }));
                    break;
                case"Quantumult X":
                    t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then((t => {
                        const {statusCode: s, statusCode: i, headers: o, body: r, bodyBytes: a} = t;
                        e(null, {status: s, statusCode: i, headers: o, body: r, bodyBytes: a}, r, a)
                    }), (t => e(t && t.error || "UndefinedError")));
                    break;
                case"Node.js":
                    let i = require("iconv-lite");
                    this.initGotEnv(t);
                    const {url: o, ...r} = t;
                    this.got[s](o, r).then((t => {
                        const {statusCode: s, statusCode: o, headers: r, rawBody: a} = t,
                            n = i.decode(a, this.encoding);
                        e(null, {status: s, statusCode: o, headers: r, rawBody: a, body: n}, n)
                    }), (t => {
                        const {message: s, response: o} = t;
                        e(s, o, o && i.decode(o.rawBody, this.encoding))
                    }));
                    break
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
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
            return t
        }

        queryStr(t) {
            let e = "";
            for (const s in t) {
                let i = t[s];
                null != i && "" !== i && ("object" == typeof i && (i = JSON.stringify(i)), e += `${s}=${i}&`)
            }
            return e = e.substring(0, e.length - 1), e
        }

        msg(e = t, s = "", i = "", o = {}) {
            const r = t => {
                const {$open: e, $copy: s, $media: i, $mediaMime: o} = t;
                switch (typeof t) {
                    case void 0:
                        return t;
                    case"string":
                        switch (this.getEnv()) {
                            case"Surge":
                            case"Stash":
                            default:
                                return {url: t};
                            case"Loon":
                            case"Shadowrocket":
                                return t;
                            case"Quantumult X":
                                return {"open-url": t};
                            case"Node.js":
                                return
                        }
                    case"object":
                        switch (this.getEnv()) {
                            case"Surge":
                            case"Stash":
                            case"Shadowrocket":
                            default: {
                                const r = {};
                                let a = t.openUrl || t.url || t["open-url"] || e;
                                a && Object.assign(r, {action: "open-url", url: a});
                                let n = t["update-pasteboard"] || t.updatePasteboard || s;
                                if (n && Object.assign(r, {action: "clipboard", text: n}), i) {
                                    let t, e, s;
                                    if (i.startsWith("http")) t = i; else if (i.startsWith("data:")) {
                                        const [t] = i.split(";"), [, o] = i.split(",");
                                        e = o, s = t.replace("data:", "")
                                    } else {
                                        e = i, s = (t => {
                                            const e = {
                                                JVBERi0: "application/pdf",
                                                R0lGODdh: "image/gif",
                                                R0lGODlh: "image/gif",
                                                iVBORw0KGgo: "image/png",
                                                "/9j/": "image/jpg"
                                            };
                                            for (var s in e) if (0 === t.indexOf(s)) return e[s];
                                            return null
                                        })(i)
                                    }
                                    Object.assign(r, {"media-url": t, "media-base64": e, "media-base64-mime": o ?? s})
                                }
                                return Object.assign(r, {"auto-dismiss": t["auto-dismiss"], sound: t.sound}), r
                            }
                            case"Loon": {
                                const s = {};
                                let o = t.openUrl || t.url || t["open-url"] || e;
                                o && Object.assign(s, {openUrl: o});
                                let r = t.mediaUrl || t["media-url"];
                                return i?.startsWith("http") && (r = i), r && Object.assign(s, {mediaUrl: r}), console.log(JSON.stringify(s)), s
                            }
                            case"Quantumult X": {
                                const o = {};
                                let r = t["open-url"] || t.url || t.openUrl || e;
                                r && Object.assign(o, {"open-url": r});
                                let a = t["media-url"] || t.mediaUrl;
                                i?.startsWith("http") && (a = i), a && Object.assign(o, {"media-url": a});
                                let n = t["update-pasteboard"] || t.updatePasteboard || s;
                                return n && Object.assign(o, {"update-pasteboard": n}), console.log(JSON.stringify(o)), o
                            }
                            case"Node.js":
                                return
                        }
                    default:
                        return
                }
            };
            if (!this.isMute) switch (this.getEnv()) {
                case"Surge":
                case"Loon":
                case"Stash":
                case"Shadowrocket":
                default:
                    $notification.post(e, s, i, r(o));
                    break;
                case"Quantumult X":
                    $notify(e, s, i, r(o));
                    break;
                case"Node.js":
                    break
            }
            if (!this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        debug(...t) {
            this.logLevels[this.logLevel] <= this.logLevels.debug && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.debug}${t.map((t => t ?? String(t))).join(this.logSeparator)}`))
        }

        info(...t) {
            this.logLevels[this.logLevel] <= this.logLevels.info && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.info}${t.map((t => t ?? String(t))).join(this.logSeparator)}`))
        }

        warn(...t) {
            this.logLevels[this.logLevel] <= this.logLevels.warn && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.warn}${t.map((t => t ?? String(t))).join(this.logSeparator)}`))
        }

        error(...t) {
            this.logLevels[this.logLevel] <= this.logLevels.error && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.error}${t.map((t => t ?? String(t))).join(this.logSeparator)}`))
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.map((t => t ?? String(t))).join(this.logSeparator))
        }

        logErr(t, e) {
            switch (this.getEnv()) {
                case"Surge":
                case"Loon":
                case"Stash":
                case"Shadowrocket":
                case"Quantumult X":
                default:
                    this.log("", `❗️${this.name}, 错误!`, e, t);
                    break;
                case"Node.js":
                    this.log("", `❗️${this.name}, 错误!`, e, void 0 !== t.message ? t.message : t, t.stack);
                    break
            }
        }

        wait(t) {
            return new Promise((e => setTimeout(e, t)))
        }

        done(t = {}) {
            const e = ((new Date).getTime() - this.startTime) / 1e3;
            switch (this.log("", `🔔${this.name}, 结束! 🕛 ${e} 秒`), this.log(), this.getEnv()) {
                case"Surge":
                case"Loon":
                case"Stash":
                case"Shadowrocket":
                case"Quantumult X":
                default:
                    $done(t);
                    break;
                case"Node.js":
                    process.exit(1)
            }
        }
    }(t, e)
}




