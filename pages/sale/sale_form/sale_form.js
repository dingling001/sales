// pages/sale/sale_form/sale_form.js
Page({


  data: {
    imgs: []
  },

  img1_fun() {
    let that = this;
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0];
        let imgs = [];
        imgs.push(tempFilePaths)
        that.setData({
          imgs: imgs
        })
        console.log(that.data.imgs)
      }
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