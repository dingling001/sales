// pages/my/bankpay/bankpay.js
var network = require("../../../utils/network.js");
Page({
  data: {
    account: '',
    bankName: '',
    registerBankAddress: '',
    usename: '',

    accounts: '',
    bankNames: '',
    registerBankAddresss: '',
    usenames: '',
    show_accout: false
  },
  bank_in(e) {
    this.setData({
      bankName: e.detail.value
    })
  },
  bank_na(e) {
    this.setData({
      registerBankAddress: e.detail.value
    })
  },
  bank_num(e) {
    this.setData({
      account: e.detail.value
    })
  },
  bank_use(e) {
    this.setData({
      usename: e.detail.value
    })
  },
  // 获取支付宝信息
  getalidata() {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        console.log(res_token)
        network.GET({
          url: 'user/account/queryAllAccount',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": res_token.data
          },
          params: {},
          success(res) {
            console.log(res)
            if (res.data.code == 0) {
              that.setData({
                accounts: res.data.data[1].account,
                usenames: res.data.data[1].username
              })
            } else {

            }
          }

        })
      },
    })
  },
  // 绑定银行卡
  bank_pay(e) {
    var that = this;
    if (that.data.registerBankAddress == '') {
      wx.showToast({
        title: '请输入开户行',
        icon: 'none'
      })
    } else if (that.data.bankNames == '') {
      wx.showToast({
        title: '请输入银行卡名称',
        icon: 'none'
      })
    } else if (that.data.account == '') {
      wx.showToast({
        title: '请输入银行卡号',
        icon: 'none'
      })
    } else if (that.data.username == '') {
      wx.showToast({
        title: '请输入姓名',
      })
    } else {
      wx.getStorage({
        key: 'token',
        success: (res_token) => {
          console.log(res_token)
          network.POST({
            url: 'user/account/queryAllAccount',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": res_token.data
            },
            params: {
              // token: res_token.data,
              account: that.data.account,
              username: that.data.username,
              bankName: that.data.bankName,
              registerBankAddress: that.data.registerBankAddress,
              type: 'BANK'
            },
            success(res) {
              console.log(res)
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
                wx.showToast({
                  title: res.msg || '稍后再试',
                  icon: 'none'
                })
              }
            }

          })
        },
      })
    }

  },
  onLoad: function(options) {
    this.getalidata()
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