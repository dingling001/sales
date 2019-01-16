// pages/sale/sale_form/sale_form.js
Page({


  data: {
    img1: '',
    img2: ''
  },

 img1_fun(){
   let that=this;
   wx.chooseImage({
     count: 1,
     sizeType: ['original', 'compressed'],
     sourceType: ['album', 'camera'],
     success(res) {
       // tempFilePath可以作为img标签的src属性显示图片
       const tempFilePaths = res.tempFilePaths
       that.setData({
         img1: tempFilePaths
       })
     }
   })
 },
  img2_fun(){
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          img2: tempFilePaths
        })
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