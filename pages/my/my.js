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
  gomycount() {
    wx.getStorage({
      key: 'token',
      success: (res) => {
        wx.navigateTo({
          url: './my_count/my_count'
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '未登录！',
          icon: "none"
        })
      }
    })
  },
  gomyaddress() {
    wx.getStorage({
      key: 'token',
      success: (res) => {
        wx.navigateTo({
          url: './my_address/my_address',
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '未登录！',
          icon: "none"
        })
      }
    })
  },
  // 我要寄售
  go_sale() {
    wx.switchTab({
      url: '../sale/sale',
    })
  },
  my_salfun() {
    wx.getStorage({
      key: 'token',
      success: (res) => {
        wx.navigateTo({
          url: './my_sale/my_sale',
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '未登录！',
          icon: "none"
        })
      }
    })

  },
  jiesuan() {
    wx.getStorage({
      key: 'token',
      success: (res) => {
        wx.navigateTo({
          url: './my_money/my_money',
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '未登录！',
          icon: "none"
        })
      }
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