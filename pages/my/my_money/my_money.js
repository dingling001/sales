// pages/my/my_money/my_money.js
let network = require('../../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
    url: network.imgUrl,
  },
  getGlist() {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.GET({
          url: 'auth/ConsignmentAction/myConsignment',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": 'JSESSIONID=' + res_token.data,
            'X-Requested-With': 'XMLHttpRequest'
          },
          params: {
            status: 8,
          },
          success(res) {
            let records = res.data.data;
            for (let i in records) {
              records[i].image = records[i].image.split(',')
            }
            that.setData({
              records: records
            })
          }
        })
      },
    })
  },
  lookMore1(e) {
    console.log(e)
    let imgs = e.currentTarget.dataset.img;
    for (let i in imgs) {
      imgs[i] = network.imgUrl + imgs[i]
    }

    wx.previewImage({
      current: imgs[0], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  lookMore(e) {
    // console.log(e)
    let imgs = network.imgUrl+ e.currentTarget.dataset.img;
    // for (let i in imgs) {
    //   imgs[i] = network.imgUrl + imgs[i]
    // }

    wx.previewImage({
      current: imgs, // 当前显示图片的http链接
      urls: [imgs] // 需要预览的图片http链接列表
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