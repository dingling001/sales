// pages/index/detail/detail.js
var network = require("../../../utils/network.js");
Page({
  data: {
    imgUrls: [
      '../../img/g3.png',
      '../../img/g2.png',
      '../../img/g1.png',
    ],
    goodsId: '',
    goodsInfo: [],
    goodsCarousel: []
  },

  onLoad: function(options) {
    console.log(options)
    if (options.goodsId) {
      this.setData({
        goodsId: options.goodsId
      })
      this.getGoodsInfo()
    }

  },
  // 获取详情
  getGoodsInfo() {
    var that = this;
    network.POST({
      url: 'GoodsAction/get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {
        id: that.data.goodsId
        // token: res_token.data,
        // goodsId: that.data.goodsId
      },
      success(res) {
        console.log(res.data)
        let goodsInfo = res.data;
        for (let i in goodsInfo.swiper) {
          goodsInfo.swiper[i].image = network.imgUrl + goodsInfo.swiper[i].image
        }
   
        // goodsInfo.content = goodsInfo.content.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ')
        //   .replace(/<section/g, '<div')
        //   .replace(/\/section>/g, '\div>');
        goodsInfo.goods.detail = network.imgUrl + goodsInfo.goods.detail
        if (res.data) {
          that.setData({
            goodsInfo: goodsInfo.goods,
            goodsCarousel: goodsInfo.swiper
          })
          wx.setNavigationBarTitle({
            title: that.data.goodsInfo.name
          })
          console.log(that.data.goodsInfo);
        } else {
          console.log(res);
        }
      }
    })
  },
  // 复制淘宝口令
  copy_code(e) {
    console.log(e)
    let code = e.currentTarget.dataset.code;
    wx.setClipboardData({
      data: code,
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