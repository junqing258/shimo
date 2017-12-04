export function uuid () {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

export function random (max, min) {
  min = min || 0
  let tmax = Math.max(max, min)
  let tmin = Math.min(max, min)
  return tmin + Math.round(Math.random() * (tmax - tmin))
}

/**
 * 
 * @param {number} value 概率
 */
export function probabilit (value) {
  return Math.random() >= value
}
/**
 * 随机取样
 * @param {Array} arr 
 * @param {number} count 
 */
export function getRandomArrayElems (arr, count) {
  var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(min)
}

/**
 * 押注额档次
 */
export function getBetSpan (value, desc) {
  var st = 1
  if (desc) {
    if (value >= 100 && value <= 1000) {
      st = 100
    } else if (value > 1000 && value <= 10000) {
      st = 1000
    } else if (value > 10000 && value <= 100000) {
      st = 10000
    } else if (value > 100000 && value <= 500000) {
      st = 100000
    } else if (value > 500000) {
      console.warn('最大500000')
      st = 100000
    }
  } else {
    if (value >= 100 && value < 1000) {
      st = 100
    } else if (value >= 1000 && value < 10000) {
      st = 1000
    } else if (value >= 10000 && value < 100000) {
      st = 10000
    } else if (value >= 100000 && value <= 500000) {
      st = 100000
    }
  }
  return st
}

/**
 * 数字千分位格式化
 */
export function toThousands (num) {
  var result = '', counter = 0
  num = (num || 0).toString()
  for (var i = num.length - 1; i >= 0; i--) {
    counter++
    result = num.charAt(i) + result
    if (!(counter % 3) && i != 0) { result = ',' + result; }
  }
  return result
}

export function toWans (num, fixed) {
  var result = ''
  fixed = fixed || 2
  num = Number(num || 0)
  if (num >= 10000) {
    result = num / 10000
    let _st = result.toString(),
      _mt = Math.pow(10, fixed)
    if (_st.indexOf('.') > -1 && _st.split('.')[1].length > fixed) result = Math.round(_mt * result) / _mt
    result += '万'
  } else {
    result = String(num)
  }
  return result
}

export function getCharLength (str) {
  var str_length = 0
  var str_len = 0
  str_len = str.length
  for (var i = 0; i < str_len; i++) {
    var a = str.charAt(i)
    str_length++
    if (escape(a).length > 4) {
      str_length++
    }
  }
  return str_length
}

export function ellipsis (str, len) {
  var str_length = 0
  var str_len = 0
  var str_cut = new String()
  str_len = str.length
  for (var i = 0; i < str_len; i++) {
    var a = str.charAt(i)
    str_length++
    if (escape(a).length > 4) {
      str_length++
    }
    str_cut = str_cut.concat(a)
    if (str_length > len) {
      str_cut = str_cut.concat('...')
      return str_cut
    }
  }
  if (str_length <= len) {
    return str
  }
}

export function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r !== null) {return window.unescape(r[2]);}
  return null
}

let _env = 'product'
if (/^https?:\/\/[a-zA-Z]+\d*(\-wap\.stg\d+\.)[A-Za-z0-9]+(\.com)/.test(location.href)) {
  _env = 'dev'
} else if (/^https?:\/\/\d*\.\d*\.\d*\.\d*/.test(location.href) || /^https?:\/\/localhost.*/.test(location.href) || /^file:\/\//.test(location.href)) {
  _env = 'local'
} else {
  _env = 'product'
}
export const env = _env;

let _Log = {};

if (env!=='product') {
  _Log = {
    info: console.log.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console)
  };
} else {
  _Log = {
    info: function() {},
    warn: function() {},
    error: function() {}
  }
}
// export const Log = _Log;
if (window.Log) console.warn('window.Log is occupied');
else  window.Log = _Log;


export function checkLogin () {
  if (env === 'local') { return true; }
  if (GM && GM.userLogged) {
    return true
  } else {
    return false
  }
}

export function toLogin () {
  if (GM && GM.userLoginUrl) {
    return location.href = GM.userLoginUrl
  }
}

export function appGoback () {
  if (GM && GM.isShowBtnBack_out) {
    return location.href = gamehallAndroidBackUrl
  } else {
    history.go(-1)
  }
}

export function getBetStep (value, desc) {
  var st = 1
  let sts = [10, 100, 1000, 10000, 100000]
  let stps = [100, 1000, 10000, 100000, 1000000]
  let index = -1
  stps.find(v => {
    index++
    if (desc) {
      return v >= value
    } else {
      return v > value
    }
  })
  return sts[index]
}

/**
* @public
* 创建骨骼动画
* @param {String} path 骨骼动画路径
* @param {Number} rate 骨骼动画帧率，引擎默认为30，一般传24
* @param {Number} type 动画类型 0,使用模板缓冲的数据，模板缓冲的数据，不允许修改	（内存开销小，计算开销小，不支持换装） 1,使用动画自己的缓冲区，每个动画都会有自己的缓冲区，相当耗费内存 （内存开销大，计算开销小，支持换装） 2,使用动态方式，去实时去画	（内存开销小，计算开销大，支持换装,不建议使用）
* @return Skeleton骨骼动画
*/
let paths = []
let temps = []
export function createSkeleton (path, rate, type) {
  rate = rate || 24
  type = type || 0
  var png = Laya.loader.getRes(path + '.png')
  var sk = Laya.loader.getRes(path + '.sk')
  if (!png || !sk) {
    console.error('资源没有预加载:' + path)
    return null
  }
  let index = paths.indexOf(path), templet
  if (index === -1) {
    templet = new Laya.Templet()
    let len = paths.length
    paths[len] = path
    temps[len] = templet
    templet.parseData(png, sk, rate)
  } else {
    templet = temps[index]
  }
  return new Laya.Skeleton(templet, type)
}
