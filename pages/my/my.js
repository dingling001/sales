// pages/my/my.js
var network = require("../../utils/network.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: []
  },


  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  // 我要寄售
  go_sale() {
    wx.switchTab({
      url: '../sale/sale',
    })
  },
  // 登录
  onGotUserInfo(e) {
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: app.globalData.userInfo
      })
      wx.setStorage({
        key: 'token',
        data: 'ceshi',
      })
      wx.login({
        success(res) {
          if (res.code) {
            network.POST({
              url: 'login',
              header: 'application/x-www-form-urlencoded',
              params: {
                code: res.code
              },
              success(res) {
                console.log(res)


              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })

    } else {
      wx.showToast({
        title: '请登录获取更好的体验',
        iocn: 'none'
      })
    }
  },

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

  }
})