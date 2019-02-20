const app = getApp();
const api = require('../../core/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    realCheck: 0,
    nickName: '',
    avatarUrl: 'http://placeholder.qiniudn.com/132x132'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { avatarUrl, nickName } = app.globalData.userInfo;
    const realCheck = app.globalData.realCheck;
    if (avatarUrl) {
      this.setData({ avatarUrl, nickName, realCheck });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {
    return {
      title: '欢迎使用「壕租」',
      path: '/pages/index/index'
    }
  }
})