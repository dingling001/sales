// pages/my/wepay/wepay.js
var network = require("../../../utils/network.js");
Page({

  data: {
    account: ''
  },
  accunt_input(e) {
    this.setData({
      account: e.detail.value
    })
  },
  getalidata() {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        // console.log(res_token)
        network.GET({
          url: 'user/account',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": res_token.data
          },
          params: {
            // token: res_token.data,
            // account: that.data.account,
            // username: that.data.username,
            // type: 'ALIPAY'
          },
          success(res) {
            console.log(res)
            if (res.data.code == 0) {
              that.setData({
                accounts: res.data.data[res.data.data.length - 1].account
              })
            } else {

            }
          }

        })
      },
    })
  },
  //  绑定支付宝
  getalpay(e) {
    var that = this;
    if (that.data.account == '') {
      wx.showToast({
        title: '请输入微信号',
        icon: 'none'
      })
    } else {
      wx.getStorage({
        key: 'token',
        success: (res_token) => {
          console.log(res_token)
          network.POST({
            url: 'user/account',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": res_token.data
            },
            params: {
              // token: res_token.data,
              account: that.data.account,
              type: 'WECHAT'
            },
            success(res) {
              console.log(res)
              if (res.data.code == 0) {
                wx.showToast({
                  title: '保存成功',
                })
              } else {

              }
            }

          })
        },
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