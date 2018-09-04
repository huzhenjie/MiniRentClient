module.exports = {
  tsToDateStr: function (ts, fmt) {
    let date;
    if (!ts) {
      date = new Date()
    } else {
      if (ts <= 9999999999) {
        ts *= 1000
      }
      date = new Date(ts)
    }
    if (!fmt) {
      fmt = 'yyyy-MM-dd hh:mm:ss'
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
      }
    }
    return fmt
  }
}