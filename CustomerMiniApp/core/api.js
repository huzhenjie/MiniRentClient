const host = 'https://scrats.cn/rent';
const qiniuUploader = require('./qiniuUploader.js');

module.exports = {
  wxLogin: function (success) {
    wx.getSetting({
      success: res => {
        console.log(res);
        if (!res.authSetting['scope.userInfo']) {
          console.log('没有授权？');
          wx.redirectTo({
            url: '/pages/auth/auth'
          });
          return
        }
        wx.login({
          success: res => {
            console.log(res);
            const code = res.code;
            wx.getUserInfo({
              success: res => {
                console.log(res);
                const {
                  userInfo,
                  rawData,
                  signature
                } = res;
                success && success(userInfo, rawData, signature, code)
              }
            })
          }
        })
      }
    })
  },
  login: function (code, rawData, signature, success) {
    wx.request({
      method: 'POST',
      url: `${host}/api/renter/snsLogin?ts=${new Date().getTime()}`, // ignore cache
      data: {
        body: {
          code,
          signature,
          rawData,
        }
      },
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  },
  bindRoom: function (userId, roomId, tokenId, success) {
    wx.request({
      method: 'GET',
      url: `${host}/api/renter/bindRoom/${roomId}`,
      header: {
        userId,
        tokenId
      },
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  },
  roomList: function (userId, tokenId, success) {
    wx.request({
      method: 'GET',
      url: `${host}/api/renter/roomList`,
      header: {
        userId,
        tokenId
      },
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  },
  bargin: function (userId, tokenId, barginId, success) {
    wx.request({
      method: 'GET',
      url: `${host}/api/renter/bargin/${barginId}`,
      header: {
        userId,
        tokenId
      },
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  },
  unpay: function (userId, tokenId, success) {
    wx.request({
      method: 'GET',
      url: `${host}/api/renter/unpay`,
      header: {
        userId,
        tokenId
      },
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  },
  extraHistory: function (userId, tokenId, barginExtraId, success) {
    wx.request({
      method: 'GET',
      url: `${host}/api/renter/extraHistory/${barginExtraId}`,
      header: {
        userId,
        tokenId
      },
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  },
  getFeeList: function (barginId, userId, tokenId, page, rows, success) {
    if (!page) {
      page = 1
    }
    if (!rows) {
      rows = 10
    }
    wx.request({
      method: 'POST',
      url: `${host}/api/renter/rent/${barginId}`,
      data: {
        page,
        rows
      },
      header: {
        userId,
        tokenId
      },
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  },
  rentDetail: function (userId, tokenId, rentId, success) {
    wx.request({
      method: 'GET',
      url: `${host}/api/renter/rentDetail/${rentId}`,
      header: {
        userId,
        tokenId
      },
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  },
  snsRegist: function (openid, name, phone, code, success) {
    wx.request({
      method: 'POST',
      url: `${host}/api/renter/snsRegist`,
      data: {
        openid,
        body: {
          name,
          phone,
          code
        }
      },
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  },
  sendSmsCode: function (phone, success) {
    wx.request({
      method: 'GET',
      url: `${host}/api/sms/send/${phone}`,
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  },
  historyLive: function (userId, tokenId, success) {
    wx.request({
      method: 'GET',
      url: `${host}/api/renter/historyLive`,
      header: { userId, tokenId },
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  },
  createRentPaymentOrder: function (userId, tokenId, rentId, success) {
    wx.request({
      method: 'GET',
      url: `${host}/api/pay/wxMinPay/1/${rentId}`,
      header: { userId, tokenId },
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  },
  createDepositPaymentOrder: function (userId, tokenId, depositId, success) {
    wx.request({
      method: 'GET',
      url: `${host}/api/pay/wxMinPay/0/${depositId}`,
      header: { userId, tokenId },
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  },
  getExtraHistory: function (userId, tokenId, extraId, success) {
    wx.request({
      method: 'GET',
      url: `${host}/api/renter/extraHistory/${extraId}`,
      header: { userId, tokenId },
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  },
  uploadImg: function (imgPath, success, fail) {
    console.log(imgPath);
    wx.request({
      method: 'GET',
      url: `${host}/api/upload/uploadToken`,
      success: res => {
        const { domain, token } = res.data.data;
        console.log(domain);
        console.log(token);

        qiniuUploader.upload(imgPath, (res) => {
          console.log(res);
          success && success(res.imageURL);
        }, (error) => {
          console.log('error: ' + error);
          fail && fail()
        }, {
            uploadURL: 'https://up-z2.qiniup.com',
            domain: 'rcdn.scrats.cn',
            uptoken: token
          });
      }
    })
  },
  realCertification: function (userId, tokenId, name, idCard, idCardPic, idCardPicBack, success) {
    wx.request({
      method: 'POST',
      url: `${host}/api/user/realCertification`,
      header: { userId, tokenId },
      data: {
        body: {
          name,
          idCard,
          idCardPic,
          idCardPicBack
        }
      },
      success: res => {
        console.log(res);
        success && success(res)
      }
    })
  }
};