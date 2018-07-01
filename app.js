//app.js
const api = require('core/api.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
    //       console.log('已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框')
    //       wx.login({
    //         success: res => {
    //           const code = res.code;
    //           // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //           console.log(code);
    //           wx.getUserInfo({
    //             success: res => {
    //               console.log('可以将 res 发送给后台解码出 unionId')
    //               console.log(res)
    //               const { userInfo, rawData, signature } = res
    //               this.globalData.userInfo = userInfo

    //               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //               // 所以此处加入 callback 以防止这种情况
    //               if (this.userInfoReadyCallback) {
    //                 this.userInfoReadyCallback(res)
    //               }

    //               // TODO
    //               api.login(code, rawData, signature, (res) => {
    //                 const { wxSns, tokenId } = res.data.data;
    //                 const { openid, unionid, userId } = wxSns;
    //                 this.globalData.user = {
    //                   openid,
    //                   unionid,
    //                   userId,
    //                   tokenId
    //                 }
    //                 if (userId == -1) {
    //                   wx.redirectTo({
    //                     url: '/pages/guest/home/home'
    //                   })
    //                   return
    //                 }
    //                 // api.bindUser(openid, 3, tokenId, (res) => {
    //                 //   console.log(res)
    //                 // })
    //               })
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null
  }
})