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
    feeList: [],
    deposit: {},
    landlord: [],
    roomNo: '',
    roomDescription: ''
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
    api.bargin(userId, tokenId, barginId, res => {
      that.setData({
        landlord: res.data.data.landlord, 
        deposit: res.data.data.deposit,
        roomNo: res.data.data.roomNo,
        roomDescription: `${res.data.data.building.address} - ${res.data.data.building.name}`
      })
    });
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

  payRent: function (event) {
    const rentId = event.currentTarget.dataset.rentid;
    console.log(rentId);
    const {
      userId,
      tokenId
    } = app.globalData.user;
    const that = this;
    api.createRentPaymentOrder(userId, tokenId, rentId, res => {
      const { code, data } = res.data;
      if (code !== 1) {
        return;
      }
      that.dealWithPayment(data);
    });
  },

  payDeposit: function () {
    const {
      userId,
      tokenId
    } = app.globalData.user;
    const that = this;
    api.createDepositPaymentOrder(userId, tokenId, this.data.deposit.depositId, res => {
      const { code, data } = res.data;
      if (code !== 1) {
        return;
      }
      that.dealWithPayment(data);
    })
  }, 
  dealWithPayment: function (data) {
    const that = this;
    const { appId, nonceStr, packageValue, paySign, signType, timeStamp } = data;
    wx.requestPayment({
      timeStamp,
      nonceStr,
      'package': packageValue,
      signType,
      paySign,
      success: res => {
        console.log('成功', res);
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        });
        that.onLoad({ bargin_id: that.data.barginId });
      },
      fail: err => {
        console.log('失败', err);
      }
    })
  },
  showCallDialog: function () {
    if (this.data.landlord.length == 0) {
      return;
    }
    const that = this;
    wx.showModal({
      title: '联系房东',
      content: `给房东 ${this.data.landlord[0].name} 拨打电话，此操作将会产生资费`,
      confirmText: "立即拨打",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: that.data.landlord[0].phone
          })
        }
      }
    });
  }
})