const app = getApp();
const api = require('api.js');

const parseParam = qrStr => {
  if (!qrStr || qrStr == '') {
    console.log('qrStr is empty');
    return {}
  }
  const tmp = qrStr.split('?');
  if (tmp.length < 2) {
    console.log(`param is empty ${qrStr}`);
    return { method: 'main' }
  }
  const res = {};
  const items = tmp[1].split('&');
  for (let item of items) {
    const params = item.split('=');
    let value;
    if (params.length < 2) {
      value = ''
    } else {
      value = params[1]
    }
    res[params[0]] = value
  }
  return res
};

const execute = qrParams => {
  const { method, data } = qrParams;
  switch (method) {
    case 'bindUser':
      const { openid, tokenId, } = app.globalData.user;
      const bindRes = res => {
        if (res.data.code != 1) {
          wx.showModal({
            title: `办理失败`,
            content: res.data.msg,
            confirmText: '重试',
            success: res => {
              if (res.confirm) {
                api.bindUser(openid, data, tokenId, bindRes);
              }
            }
          });
          return
        }
        wx.reLaunch({
          url: '/pages/index/index'
        })
      };
      api.bindUser(openid, data, tokenId, bindRes);
      break
  }
};

module.exports = {
  scan: function () {
    wx.scanCode({
      success: res => {
        console.log(res);
        const { errMsg, result } = res;
        if (errMsg != 'scanCode:ok') {
          return
        }
        const params = parseParam(result);
        execute(params)
      }
    })
  }
};