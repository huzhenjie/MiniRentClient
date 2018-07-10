// pages/room_info/room_info.js
const app = getApp()
const api = require('../../core/api.js')
const util = require('../../core/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const roomId = options.room_id;
    const { userId, tokenId } = app.globalData.user;
    const that = this;
    api.bargin(userId, tokenId, roomId, res => {
      const bargin = res.data.data.bargin;
      bargin.leaveDate = util.tsToDateStr(bargin.leaveTs, 'yyyy年M月d日');
      bargin.liveDate = util.tsToDateStr(bargin.liveTs, 'yyyy年M月d日');
      that.setData({
        info: res.data.data
      });
      wx.setNavigationBarTitle({
        title: res.data.data.roomNo
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

  connectLandlord: function () {
    const that = this;
    if (!this.data.info.landlord || this.data.info.landlord.length == 0) {
      wx.showModal({
        content: '抱歉，没有找到相关的联系方式',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      return
    }

    wx.showModal({
      title: '联系房东',
      content: `给房东 ${this.data.info.landlord[0].name} 拨打电话，此操作将会产生资费`,
      confirmText: "立即拨打",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: that.data.info.landlord[0].phone,
            success: function () {
              console.log("拨打电话成功！")
            },
            fail: function () {
              console.log("拨打电话失败！")
            }
          })
        }
      }
    });
  }
})