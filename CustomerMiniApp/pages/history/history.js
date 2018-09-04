// pages/history/history.js
const app = getApp()
const api = require('../../core/api.js')
const util = require('../../core/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      userId,
      tokenId
    } = app.globalData.user;
    const that = this;
    api.historyLive(userId, tokenId, res => {
      const historyList = res.data.data;
      historyList.map(item => {
        item.liveDate = util.tsToDateStr(item.liveTs, 'yyyy-MM-dd hh:mm:ss');
        item.leaveDate = util.tsToDateStr(item.leaveTs, 'yyyy-MM-dd hh:mm:ss');
      });
      that.setData({
        historyList
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