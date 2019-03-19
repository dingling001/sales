// pages/my/alipay/alipay.js
var network = require("../../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    username: '',
    accounts: '',
    usenames: '',
    show_accout: false,
    account_id: ''
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
  // 获取支付宝信息
  getalidata() {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        // console.log(res_token)
        network.GET({
          url: 'auth/HxCsUserAction/getAlipayNumber',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": 'JSESSIONID=' + res_token.data,
            'X-Requested-With': 'XMLHttpRequest'
          },
          params: {

          },
          success(res) {
            //
            if (res.data.state && res.data.alipay && res.data.alipayUserName) {
              // console.log(res.data.data)
              that.setData({
                accounts: res.data.alipay,
                usenames: res.data.alipayUserName,
                show_accout: true
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
        title: '请输入支付宝账户',
        icon: 'none'
      })
    } else if (that.data.username == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
    } else {
      wx.getStorage({
        key: 'token',
        success: (res_token) => {
          // console.log(res_token)
          network.POST({
            url: 'auth/HxCsUserAction/saveAlipayNumber',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Cookie": 'JSESSIONID=' + res_token.data,
              'X-Requested-With': 'XMLHttpRequest'
            },
            params: {
              // token: res_token.data,
              alipay: that.data.account,
              alipayUserName: that.data.username,
            },
            success(res) {

              if (res.data.code == 0) {
                wx.showToast({
                  title: '保存成功',
                })
                that.setData({
                  show_accout: true
                })
                wx.navigateBack({
                  delta: 1
                })
              } else {

              }
            }

          })
        },
        fail: (err) => {
          wx.showToast({
            title: '未登录',
            icon: 'none'
          })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }, 1000)
        }
      })
    }

  },
  onLoad: function(options) {
    this.getalidata();
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