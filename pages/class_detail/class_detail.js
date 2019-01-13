// pages/class_detail/class_detail.js
Page({

  data: {
    i: 0,
    show_brand: false
  },
  // 综合
  all_fun() {
    this.setData({
      i: 0,
      show_brand: false
    })
  },
  // 寄售价
  consignment_fun() {
    this.setData({
      i: 1,
      show_brand: false
    })
  },
  // 原价
  price_fun() {
    this.setData({
      i: 2,
      show_brand: false
    })
  },
  // 品牌
  brand_fun() {
    this.setData({
      i: 3,
      show_brand: true
    })
  },
  // 选择品牌
  choose_brand() {
    this.setData({
      show_brand: false,
    })
  },
  colse_mold(){
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