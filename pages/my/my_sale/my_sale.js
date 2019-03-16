// pages/my/my_sale/my_sale.js
let network = require('../../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
    pageSize: 1000,
    pageNum: 0,
    n: 0
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
            status:0,
          },
          success(res) {
            let records = res.data.data.records;
            for (let i in records) {
              records[i].coverImage = network.imgUrl + records[i].coverImage
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

  // 全部
  all() {
    this.getGlist()
    this.setData({
      n:0
    })
  },
  // 0: 待审核,- 1: 审核不通过, 1: 审核通过, 2: 已发货, 3: 实物审核中, 4: 实物审核未通过, 5: 上架销售, 6: 已售出, 7: 已完成
  // 未发货
  unsold() {
    this.getGlist()
    let records = this.data.records
   let list=[]
    for (let i in records) {
      if (records[i].status == 0 || records[i].status == -1 || records[i].status == 1) {
        list.push({
          status: records[i].status,
          coverImage: records[i].coverImage,
          buyPrice: records[i].buyPrice,
          name: records[i].name,
          expectPrice: records[i].expectPrice,
          id: records[i].id
        })
      }
    }
    this.setData({
      n: 1,
      records:list
    })

  },
  // 已发货
  sold(){
    this.getGlist()
    let records = this.data.records
    let list = []
    for (let i in records) {
      if (records[i].status == 2 || records[i].status == 3 || records[i].status == 4) {
        list.push({
          status: records[i].status,
          coverImage: records[i].coverImage,
          buyPrice: records[i].buyPrice,
          name: records[i].name,
          expectPrice: records[i].expectPrice,
          id: records[i].id
        })
      }
    }
    this.setData({
      n: 2,
      records: list
    })
  },
  // 进行中
  solding(){
    this.getGlist()
    let records = this.data.records
    let list = []
    for (let i in records) {
      if (records[i].status == 5 || records[i].status == 6) {
        list.push({
          status: records[i].status,
          coverImage: records[i].coverImage,
          buyPrice: records[i].buyPrice,
          name: records[i].name,
          expectPrice: records[i].expectPrice,
          id: records[i].id
        })
      }
    }
    this.setData({
      n: 3,
      records: list
    })
  },
  // 已完成
  solded(){
    this.getGlist()
    let records = this.data.records
    let list = []
    for (let i in records) {
      if (records[i].status == 7) {
        list.push({
          status: records[i].status,
          coverImage: records[i].coverImage,
          buyPrice: records[i].buyPrice,
          name: records[i].name,
          expectPrice: records[i].expectPrice,
          id: records[i].id
        })
      }
    }
    this.setData({
      n: 4,
      records: list
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