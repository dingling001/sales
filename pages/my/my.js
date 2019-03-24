// pages/my/my.js
var network = require("../../utils/network.js");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    show_user:false,
    show_mold: true,
    w_num: '',
    w_tel: ''
  },
  openmsg() {
    this.setData({
      show_mold: false
    })
    wx.hideTabBar({
      animation: true
    })

  },
  close_mold() {
    this.setData({
      show_mold: true
    })
    wx.showTabBar({
      animation: true
    })
  },
  copy_fn(e){
    let wnum = e.currentTarget.dataset.wnum;
    wx.setClipboardData({
      data: wnum,
      success(res) {
        wx.getClipboardData({
          success(res) {
          }
        })
      }
    })
  },
  call_fn(e){
    let wtel = e.currentTarget.dataset.wtel;
    wx.makePhoneCall({
      phoneNumber: wtel // 仅为示例，并非真实的电话号码
    })
  },
  getmsg() {
    let that = this;
    network.GET({
      url: 'SettingAction/get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {},
      success(res) {
        console.log(res)
        that.setData({
          w_num: res.data.consumerWechat,
          w_tel: res.data.consumerHotline
        })
      }
    })
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
          userInfo: res.data,
          show_user:true
        })
      },
      fail:(err)=>{
        // console.log(options)
      }
    })
    that.getmsg()
  },
  // 登录
  onGotUserInfo(e) {
    // console.log(e)
    let that = this;
    if (e.detail.userInfo) {
      // app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        show_user: true
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
          title: '未登录或登陆已失效',
          icon: "none"
        })
        this.setData({
          userInfo: {},
          show_user: false
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
          title: '未登录或登陆已失效',
          icon: "none"
        })
        this.setData({
          userInfo:{},
          show_user: false
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
          title: '未登录或登陆已失效',
          icon: "none"
        })
        this.setData({
          userInfo: {},
          show_user: false
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
          title: '未登录或登陆已失效',
          icon: "none"
        })
        this.setData({
          userInfo: {},
          show_user: false
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
    // wx.clearStorage()
    wx.getStorage({
      key: 'userinfo',
      success: (res) => {
        this.setData({
          userInfo: res.data,
          show_user: true
        })
      },
      fail: (err) => {

      }
    })
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
