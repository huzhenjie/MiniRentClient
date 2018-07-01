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
        const { wxSns, tokenId } = res.data.data;
        const { openid, unionid, userId } = wxSns;
        app.globalData.userInfo = userInfo;
        app.globalData.user = {
          openid,
          unionid,
          userId,
          tokenId
        };
        if (userId == -1) {
          wx.redirectTo({
            url: '/pages/guide/guide'
          });
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
  goToRoomDetail: function (event) {
    const roomId = event.currentTarget.dataset.roomid;
    console.log(roomId);
    wx.navigateTo({
      url: `/pages/room_info/room_info?room_id=${roomId}`
    })
  }
});
