// pages/deposit_extra_history.js
const app = getApp()
const api = require('../../core/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    extraName: '',
    history_list: []
    // extraId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const extraId = options.extra_id;
    const extraName = options.extra_name;
    wx.setNavigationBarTitle({
      title: `${extraName}历史`
    })
    const that = this;
    const {
      userId,
      tokenId
    } = app.globalData.user;
    api.getExtraHistory(userId, tokenId, extraId, res => {
      console.log(res);
      that.setData({
        extraName:  extraName,
        history_list: res.data.data
      })
    })
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
  onShareAppMessage: function () {

  }
})