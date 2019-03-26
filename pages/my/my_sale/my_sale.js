// pages/my/my_sale/my_sale.js
let network = require('../../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
    n: 0,
    navs: ['全部', '待审核', '审核不通过', '寄售中', '已卖出', '已完成', '已取消'],
    url: network.imgUrl,
    status: 10
  },
  // 获取寄售列表
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
            status: that.data.status,
          },
          success(res) {
            let records = res.data.data;
            for (let i in records) {
              // for(let j in records[i].image){
              records[i].image = records[i].image.split(',')
              // }

            }
            // console.log(records[0].image[0])
            that.setData({
              records: records
            })
          }
        })
      },
    })
  },
  copy_fn(e) {
    let wechat = e.currentTarget.dataset.wechat;
    wx.setClipboardData({
      data: wechat,
      success(res) {
        wx.getClipboardData({
          success(res) {
          }
        })
      }
    })
  },
  lookMore(e) {
    // console.log(e)
    let imgs = e.currentTarget.dataset.img;
    for (let i in imgs) {
      imgs[i] = network.imgUrl + imgs[i]
    }
    wx.previewImage({
      current: imgs[0], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },

  nav_fun(e) {
    let index = e.currentTarget.dataset.index;
    switch (index) {
      case 0:
        this.setData({
          status: 10
        })
        break;
      case 5:
        this.setData({
          status: 8
        })
        break;
      default:
        this.setData({
          status: index - 1
        })
    }
    this.setData({
      n: index
    })
    this.getGlist();
  },
  go_saling(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../my_sale_detail/my_sale_detail?id=' + id,
    })
  },

  // 0: 待审核,1: 审核不通过, 1: 审核通过, 2: 已发货, 3: 实物审核中, 4: 实物审核未通过, 5: 上架销售, 6: 已售出, 7: 已完成
  // 未发货
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