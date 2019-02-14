// pages/my/alipay/alipay.js
var network = require("../../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    username: ''
  },
  account_fun(e) {
    this.setData({
      account: e.detail.value
    })
  },
  usename_fun(e) {
    this.setData({
      username: e.detail.value
    })
  },
  //  绑定支付宝
  getalpay(e) {
    var that = this;
    if (e.detail.userInfo) {
      network.Login(e.detail.userInfo)
      wx.getStorage({
        key: 'token',
        success: (res_token) => {
          network.POST({
            url: 'user/account',
            header: 'application/x-www-form-urlencoded',
            params: {
              // token: res_token.data,
              account: that.data.account,
              username: that.data.username,
              type: 'ALIPAY'
            },
            success(res) {
              console.log(res)
            }

          })
        },
        fail: (err) => {

        }
      })
    } else {
      wx.showToast({
        title: '请登录获取更好的体验',
        iocn: 'none'
      })
    }
  },
  onLoad: function(options) {

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

  }
})