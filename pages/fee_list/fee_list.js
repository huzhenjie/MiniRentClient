// pages/fee_list/fee_list.js

const app = getApp();
const api = require('../../core/api.js');
const util = require('../../core/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    barginId: 0,
    feeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const barginId = options.bargin_id;
    this.setData({
      barginId
    });
    const {
      userId,
      tokenId
    } = app.globalData.user;
    const that = this;
    api.getFeeList(barginId, userId, tokenId, 1, 30, res => {
      const feeList = res.data.data.list;
      feeList.map(item => {
        item.payDate = util.tsToDateStr(item.payTs, 'yyyy-MM-dd hh:mm:ss');
      });
      that.setData({
        feeList
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

  },

  goToRentDetail: function (event) {
    const rentId = event.currentTarget.dataset.rentid;
    console.log(rentId);
    wx.navigateTo({
      url: `/pages/rent_detail/rent_detail?rent_id=${rentId}`
    })
  },
})