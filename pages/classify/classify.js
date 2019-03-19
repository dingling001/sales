// pages/classify/classify.js
var network = require("../../utils/network.js");
Page({


  data: {
    classlist: []
  },

  // 获取分类
  getTypeList() {
    var that = this;
    network.POST({
      url: 'GoodsTypeAction/listAll',
      header: {
            "Content-Type": "application/x-www-form-urlencoded"},
      params: {},
      success(res) {

        let classlist = res.data;
        for (let i in classlist) {
          classlist[i].bigImage = network.imgUrl + classlist[i].bigImage
        }
        if (res.data) {
          that.setData({
            classlist: classlist
          })
        } else {
          // ;
        }
      }
    })
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
    // this.getTypeList()



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
