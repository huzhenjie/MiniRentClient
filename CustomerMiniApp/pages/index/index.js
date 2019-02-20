//index.js
//获取应用实例
const app = getApp();
const api = require('../../core/api.js');
const qr = require('../../core/qr.js');

Page({
  data: {
    initSuccess: false,
    roomList: []
  },
  onLoad: function () {
  },
  onShow: function () {
    if (!this.initSuccess) {
      this.initData()
    }
  },
  initData: function () {
    const that = this;
    api.wxLogin((userInfo, rawData, signature, code) => {
      api.login(code, rawData, signature, res => {
        const { wxSns, tokenId, realCheck } = res.data.data;
        const { openid, unionid, userId } = wxSns;
        app.globalData.realCheck = realCheck;
        app.globalData.userInfo = userInfo;
        app.globalData.user = {
          openid,
          unionid,
          userId,
          tokenId
        };
        if (userId == -1) {
          // wx.redirectTo({
          //   url: '/pages/guide/guide'
          // });
          wx.redirectTo({
            url: '/pages/register/register'
          })
          return
        }
        api.roomList(userId, tokenId, res => {
          that.setData({
            initSuccess: true,
            roomList: res.data.data
          })
        })
      })
    })
  },
  scan: function () {
    qr.scan()
  },
  // goToRoomDetail: function (event) {
  //   const barginId = event.currentTarget.dataset.barginid;
  //   console.log(barginId);
  //   wx.navigateTo({
  //     url: `/pages/room_info/room_info?bargin_id=${barginId}`
  //   })
  // },
  gotoFeeList: function (event) {
    const barginId = event.currentTarget.dataset.barginid;
    console.log(barginId);
    wx.navigateTo({
      url: `/pages/fee_list/fee_list?bargin_id=${barginId}`,
    })
  },
  goToHistory: function (event) {
    wx.navigateTo({
      url: `/pages/history/history`,
    })
  },
  onShareAppMessage(res) {
    return {
      title: '欢迎使用「壕租」',
      path: '/pages/index/index'
    }
  }
});
