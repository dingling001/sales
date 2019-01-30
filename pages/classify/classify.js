// pages/classify/classify.js
var network = require("../../utils/network.js");
Page({


  data: {
    classlist: []
  },

  // 获取分类
  getTypeList() {
    var that = this;
    // wx.getStorage({
    //   key: 'token',
    //   success: (res_token) => {
    network.POST({
      url: 'getTypeList',
      header: 'application/x-www-form-urlencoded',
      params: {
        // token: res_token.data,
      },
      success(res) {
        console.log(res)
        let classlist = res.data.data;
        // for (let i in classlist) {
        //   classlist[i].banImg = network.imgUrl + classlist[i].typeImg
        // }
        if (res.data.code == '0000') {
          that.setData({
            classlist: classlist
          })
          console.log(that.data.classlist);
        } else {
          // console.log(res);
        }
      }
    })
    // },
    // fail: (err => {
    //   wx.showModal({
    //     title: '登录已失效',
    //     content: '请点击我的-> 登录',
    //     showCancel: false,
    //     success(res) {
    //       if (res.confirm) {
    //         wx.switchTab({
    //           url: '../my/my',
    //         })
    //       }
    //     }
    //   })
    // })
    // })
  },
  onLoad: function(options) {
    this.getTypeList()
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
    this.getTypeList()
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