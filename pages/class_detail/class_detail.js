// pages/class_detail/class_detail.js
Page({

  data: {
    i: 0,
    show_brand: false,
    icon_status: false,
    icon_status1: false,
  },
  // 综合
  all_fun() {
    this.setData({
      i: 0,
      show_brand: false,
      icon_status: false,
      icon_status1: false,
    })
  },
  // 寄售价
  consignment_fun() {
    this.setData({
      i: 1,
      show_brand: false,
      icon_status1: false,
    })
    if (this.data.icon_status == false) {
      this.setData({
        icon_status: true,
      })
    } else {
      this.setData({
        icon_status: false,
      })
    }

  },
  // 原价
  price_fun() {
    this.setData({
      i: 2,
      show_brand: false,
      icon_status:false
    })
    if (this.data.icon_status1 == false) {
      this.setData({
        icon_status1: true,
      })
    } else {
      this.setData({
        icon_status1: false,
      })
    }
  },
  // 品牌
  brand_fun() {
    this.setData({
      i: 3,
      show_brand: true,
      icon_status: false,
      icon_status1: false,
    })
  },
  // 选择品牌
  choose_brand() {
    this.setData({
      show_brand: false,
    })
  },
  colse_mold() {
    this.setData({
      show_brand: false,
    })
  },

  onLoad: function(options) {

  },

  onReady: function() {

  },


  onShow: function() {

  },

  onHide: function() {

  },


  onUnload: function() {

  },


  onPullDownRefresh: function() {

  },


  onReachBottom: function() {

  },


  onShareAppMessage: function() {

  }
})