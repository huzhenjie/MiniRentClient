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
  onLoad: function(options) {
    const barginId = options.bargin_id;
    const {
      userId,
      tokenId
    } = app.globalData.user;
    const that = this;
    api.bargin(userId, tokenId, barginId, res => {
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

  showCallDialog: function(landlord) {
    wx.showModal({
      title: '联系房东',
      content: `给房东 ${landlord.name} 拨打电话，此操作将会产生资费`,
      confirmText: "立即拨打",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: landlord.phone
          })
        }
      }
    });
  },

  connectLandlord: function() {
    const that = this;
    if (!this.data.info.landlord || this.data.info.landlord.length == 0) {
      wx.showModal({
        content: '抱歉，没有找到相关的联系方式',
        showCancel: false
      });
      return
    }

    if (this.data.info.landlord.length == 1) {
      this.showCallDialog(this.data.info.landlord[0]);
      return
    }

    const itemList = [];
    this.data.info.landlord.map(landlord => {
      itemList.push(landlord.phone)
    });

    wx.showActionSheet({
      itemList,
      success: function(res) {
        if (!res.cancel) {
          that.showCallDialog(that.data.info.landlord[res.tapIndex])
        }
      }
    })
  },

  showExtraHitory: function(event) {
    const extraId = event.currentTarget.dataset.extraid;
    const extraName = event.currentTarget.dataset.extraname;
    wx.navigateTo({
      url: `/pages/deposit_extra_history/deposit_extra_history?extra_id=${extraId}&extra_name=${extraName}`,
    })
  }
})