// pages/my/my_sale_detail/my_sale_detail.js
let network = require('../../../utils/network.js')
Page({
  data: {
    id: '',
    url: network.imgUrl,
    consignment: {},
    mailingAddress: '',

  },

  onLoad: function(options) {
    if (options) {
      this.setData({
        id: options.id
      })
    }
    this.get_detail()
  },

  get_detail() {
    //  auth / ConsignmentAction / getConsignmentById
    let that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'auth/ConsignmentAction/getConsignmentById',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": 'JSESSIONID=' + res_token.data,
            'X-Requested-With': 'XMLHttpRequest'
          },
          params: {
            id: that.data.id
          },
          success(res) {
            console.log(res)
            let slidelist = res.data.consignment;
            slidelist.image = slidelist.image.split(',')
            console.log(slidelist.image)
            that.setData({
              consignment: slidelist
            })
          }
        })
      },
    })

  },
  mailingAddress_fun(e) {
    this.setData({
      mailingAddress: e.detail.value
    })
  },
  express_fun(e) {
    this.setData({
      express: e.detail.value
    })
  },
  singleNumber_fun(e) {
    this.setData({
      singleNumber: e.detail.value
    })
  },
  go_save() {
    let that = this;
    if (that.data.mailingAddress == '') {
      wx.showToast({
        title: '请输入寄售地址',
        icon: 'none'
      })
    } else if (that.data.express == '') {
      wx.showToast({
        title: '请输入快递公司',
        icon: 'none'
      })
    } else if (that.data.singleNumber == '') {
      wx.showToast({
        title: '请输入快递单号',
        icon: 'none'
      })
    } else {
      wx.getStorage({
        key: 'token',
        success: (res_token) => {
          network.POST({
            url: 'auth/ConsignmentAction/updateConsignmentDelivery',
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Cookie": 'JSESSIONID=' + res_token.data,
              'X-Requested-With': 'XMLHttpRequest'
            },
            params: {
              id: that.data.id,
              express: that.data.express,
              singleNumber: that.data.singleNumber,
              mailingAddress: that.data.mailingAddress
            },
            success(res) {
              console.log(res)

              if (res) {
                wx.showToast({
                  title: '保存成功',
                })
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1500)
              }
            }
          })
        },
      })
    }
  },
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