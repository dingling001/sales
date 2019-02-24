// pages/my/my_sale/my_sale.js
let network = require('../../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
    pageSize: 10,
    pageNum: 0,
    n:0
  },
  // 获取寄售列表
  getGlist() {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.GET({
          url: 'user/goods',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": res_token.data
          },
          params: {
            pageSize: that.data.pageSize,
            pageNum: that.data.pageNum
          },
          success(res) {
            let records = res.data.data.records;
            for (let i in records) {
              records[i].coverImage = network.imgUrl + '/pic/' + records[i].coverImage

            }
            console.log(records)
            that.setData({
              records: records
            })
          }
        })
      },
    })
  },
  onLoad: function(options) {
    this.getGlist()
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