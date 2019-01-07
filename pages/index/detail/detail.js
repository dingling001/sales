// pages/index/detail/detail.js
Page({


  data: {
    imgUrls: [
      '../../img/g3.png',
      '../../img/g2.png',
      '../../img/g1.png',
    ],
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: 'GUCCI'
    })
  },
  // 复制淘宝口令
  copy_code() {
    wx.setClipboardData({
      data: '123',
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
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