// pages/sale/sale.js
var network = require("../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindcontact(e) {
    // console.log(e.path)
  },
  // 去寄售
  go_sale(e) {
    wx.getStorage({
      key: 'token',
      success: (res) => {
        wx.navigateTo({
          url: './sale_form/sale_form',
        })
      },
      fail:(erro)=>{
        // console.log(e.detail.userInfo)
        if (e.detail.userInfo){
          network.Login(e.detail.userInfo)
          wx.navigateTo({
            url: './sale_form/sale_form',
          })
        }else{
          wx.showToast({
            title: '请授权获得更好的体验',
            icon:'none'
          })
        }

      }
    })
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
