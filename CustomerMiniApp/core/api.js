const host = 'https://scrats.cn/rent';

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
      url: `${host}/api/renter/snsLogin`,
      data: {
        body: {
          code,
          signature,
          rawData
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
  snsRegist: function (openid, name, phone, idCard, code, success) {
    wx.request({
      method: 'POST',
      url: `${host}/api/renter/snsRegist`,
      data: {
        openid,
        body: {
          name,
          phone,
          idCard,
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
  }
};