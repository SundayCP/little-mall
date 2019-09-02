const isDebug = true

export function debug(...args) {
  if (isDebug) {
    args.map(item => {
      console.log(item)
    })
  }
}

export function timeFormat(str, symbol='-') {
  let t = new Date(str)
  let y = t.getFullYear();
  let M = t.getMonth() > 8 ? t.getMonth() + 1 : '0' + (t.getMonth() + 1);
  let d = t.getDate() > 9 ? t.getDate() : '0' + t.getDate();
  return y + symbol + M + symbol + d
}

export function time(timeStr) {
  let e,s
  if (/^20[12][0-9](-|\.)(0|1)?[0-9](-|\.)(0|1|2|3)?[0-9]$/.test(timeStr)) {
    timeStr = timeStr.replace(/\./g, '-')
    s = (new Date(timeStr)).getTime()
    e = s + 24 * 60 * 60 * 1000
  } else {
    let now = new Date()
    let today = new Date(timeFormat(now.getTime()))
    if (timeStr === '近7天') {
      s = today.getTime() - 24 * 60 * 60 * 1000 * 6
      e = s +24 * 60 * 60 * 1000 * 7
    } else if (timeStr === '近30天') {
      s = today.getTime() - 24 * 60 * 60 * 1000 * 29
      e = s +24 * 60 * 60 * 1000 * 30
    }
  }
  return [timeFormat(s), timeFormat(e)]
}

// 身份证号码验证
export function checkInfo(val) {
  var reg = /\d{17}[\d|x]|\d{15}/;
  if(!val.match(reg)){
    return false;
  }
  return true;
}

