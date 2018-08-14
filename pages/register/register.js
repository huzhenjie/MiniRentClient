// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    tel: "",
    idcard: "",
    smsCode: "",
    smsBtn: '获取验证码',
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

  onIdcardChange: function(e) {
    this.setData({
      idcard: e.detail.value
    })
  },

  onNameChange: function(e) {
    this.setData({
      name: e.detail.value
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
      })
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
    if (this.data.smsWaitSecond > 0) {
      return;
    }
    this.showSendingSms(this, 60)
  }
})