const app = getApp();
const api = require('../../core/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel: "",
    smsCode: "",
    smsBtn: '获取验证码',
    telError: false,
    smsCodeError: false,
    errorMsg: "",
    smsWaitSecond: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onTelChange: function(e) {
    const tel = e.detail.value;
    this.setData({
      tel
    })
  },

  onSmsCodeChange: function(e) {
    this.setData({
      smsCode: e.detail.value
    })
  },

  showSendingSms: function (that, count) {
    if (count <= 0) {
      that.setData({
        smsBtn: '获取验证码',
        smsWaitSecond: count
      });
      return
    }
    that.setData({
      smsBtn: `稍后(${count})`,
      smsWaitSecond: count
    });
    setTimeout(function () {
      count--;
      that.showSendingSms(that, count)
    }, 1000)
  },

  sendSms: function() {
    if (!this.data.tel || this.data.tel.length < 11) {
      this.setData({
        telError: true,
      });
      return
    }
    if (this.data.smsWaitSecond > 0) {
      return;
    }
    api.sendSmsCode(this.data.tel, res => {

    });
    this.showSendingSms(this, 60)
  },

  register: function() {
    this.setData({
      telError: false,
      smsCodeError: false,
      errorMsg: ""
    });
    if (!this.data.tel || this.data.tel.length < 11) {
      this.setData({
        telError: true,
      });
      return
    }
    if (!this.data.smsCode || this.data.smsCode === '') {
      this.setData({
        smsCodeError: true,
      });
      return
    }
    const openid = app.globalData.user.openid;
    const that = this;
    api.snsRegist(openid, app.globalData.userInfo.nickName, this.data.tel, this.data.smsCode, res => {
      if (res.data.code !== 1) {
        that.setData({
          errorMsg: res.data.message
        });
        return
      }

      const { wxSns, tokenId, realCheck } = res.data.data;
      const { openid, unionid, userId } = wxSns;
      app.globalData.realCheck = realCheck;
      app.globalData.user = {
        openid,
        unionid,
        userId,
        tokenId
      };

      if (userId && userId > 0) {
        wx.switchTab({
          url: '/pages/profile/profile'
        });
      } else {
        that.setData({
          errorMsg: '未知异常'
        });
      }
    })
  }
})