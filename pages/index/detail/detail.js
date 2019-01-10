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
    goodsInfo: []
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
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'getGoodsInfo',
          header: 'application/x-www-form-urlencoded',
          params: {
            token: res_token.data,
            goodsId: that.data.goodsId
          },
          success(res) {
            console.log(res)
            let goodsInfo = res.data.data;
            if (res.data.code == '0000') {
              that.setData({
                goodsInfo: goodsInfo
              })
              wx.setNavigationBarTitle({
                title: that.data.goodsInfo.goodsName
              })
              // console.log(that.data.slide_list);
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  },
  // 复制淘宝口令
  copy_code(e) {
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