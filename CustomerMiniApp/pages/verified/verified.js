// pages/verified/verified.js
const app = getApp();
const api = require('../../core/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    idcard: '',
    nameError: false,
    idcardError: false,
    errorMsg: '',
    idcardFront: '',
    idcardBack: '',
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  onIdcardChange: function (e) {
    this.setData({
      idcard: e.detail.value
    })
  },

  onNameChange: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  selectIdcardFront: function () {
    const that = this;

    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          loading: true
        });
        const imgPath = res.tempFilePaths[0];
        api.uploadImg(imgPath, res => {
          that.setData({
            loading: false
          });
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          });
          that.setData({
            idcardFront: res
          });
        }, () => {
          that.setData({
            loading: false
          });
        });
      }
    })
  },

  selectIdcardBack: function () {
    const that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          loading: true
        });
        const imgPath = res.tempFilePaths[0];
        api.uploadImg(imgPath, res => {
          that.setData({
            loading: false
          });
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          });
          that.setData({
            idcardBack: res
          });
        }, () => {
          that.setData({
            loading: false
          });
        });
      }
    })
  },

  submit: function () {
    this.setData({
      errorMsg: ''
    })

    const {
      userId,
      tokenId
    } = app.globalData.user;

    const {
      idcard,
      name,
      idcardFront,
      idcardBack
    } = this.data;

    if (!name || name === '') {
      return this.setData({
        errorMsg: '请输入真实姓名'
      })
    }

    if (!idcard || idcard.length != 18) {
      return this.setData({
        errorMsg: '请输入18位有效身份证号'
      })
    }

    if (!idcardFront || idcardFront === '') {
      return this.setData({
        errorMsg: '请点击上传身份证正面'
      })
    }

    if (!idcardBack || idcardBack === '') {
      return this.setData({
        errorMsg: '请点击上传身份证背面'
      })
    }
    const that = this;
    that.setData({
      loading: false
    });

    api.realCertification(userId, tokenId, name, idcard, idcardFront, idcardBack, res => {
      if (res.data.code !== 1) {
        return that.setData({
          errorMsg: res.data.message
        })
      }

      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      });

      wx.reLaunch({
        url: '/pages/index/index'
      });
    });
  }

})