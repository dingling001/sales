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
    show_accout: false
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
        console.log(res_token)
        network.GET({
          url: 'user/account/queryAllAccount',
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
                accounts: res.data.data[res.data.data.length - 2].account,
                usenames: res.data.data[res.data.data.length - 2].username,
                show_accout: true
              })
            } else {

            }
          }

        })
      },
    })
  },
  changpay(){
    let  that = this;
    if (that.data.account == '') {
      wx.showToast({
        title: '请输入支付宝账户',
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
            url: 'user/account/updateAccount',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": res_token.data
            },
            params: {
              // token: res_token.data,
              account: that.data.account,
              username: that.data.username,
              type: 'ALIPAY'
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
      })
    } else {
      wx.getStorage({
        key: 'token',
        success: (res_token) => {
          console.log(res_token)
          network.POST({
            url: 'user/account/addAccount',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": res_token.data
            },
            params: {
              // token: res_token.data,
              account: that.data.account,
              username: that.data.username,
              type: 'ALIPAY'
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