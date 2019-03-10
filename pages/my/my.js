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
  bindcontact(e) {
    console.log(e)
  },

  onLoad: function(options) {
    let that = this;
    this.setData({
      userInfo: app.globalData.userInfo
    })
    wx.getStorage({
      key: 'userinfo',
      success: (res) => {
        that.setData({
          userInfo: res.data
        })
      },
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
    let that = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: app.globalData.userInfo
      })
      network.Login(e.detail.userInfo)
    } else {
      wx.showToast({
        title: '请授权获取更好的体验',
        iocn: 'none'
      })
    }
  },
  my_salfun() {
    wx.navigateTo({
      url: './my_sale/my_sale',
    })
  },
  jiesuan() {
    wx.showToast({
      title: '正在开发中',
      icon: 'none'
    })
    // wx.navigateTo({
    //   url: './my_money/my_money',
    // })
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