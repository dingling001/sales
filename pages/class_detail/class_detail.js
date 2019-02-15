// pages/class_detail/class_detail.js
var network = require("../../utils/network.js");
Page({

  data: {
    i: 0,
    show_brand: false,
    icon_status: false,
    icon_status1: false,
    typeId: '',
    priceType: 1,
    goodsBrand: [],
    brand: '',
    goodsList: []
  },
  // 返回顶部
  back_fun() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
    // this.setData({
    //   scrollTop:0
    // })
  },
  //  获取商品列表
  getGoodList(priceType, index) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.GET({
          url: 'lient/goods',
          header: 'application/x-www-form-urlencoded',
          params: {
            token: res_token.data,
            typeId: that.data.typeId,
            // typeId: '1',
            priceType: priceType,
            brand: that.data.brand
          },
          success(res) {
            console.log(res)
            let goodsList = res.data.data.goodsList;
            let goodsBrand = res.data.data.goodsBrand;
            // for (let i in classlist) {
            //   classlist[i].banImg = network.imgUrl + classlist[i].typeImg
            // }
            if (res.data.code == '0000') {
              that.setData({
                goodsList: goodsList,
                goodsBrand: goodsBrand
              })
              console.log(that.data.goodsList);
            } else {
              // console.log(res);
            }
          }
        })
      },
    })
  },
  // 获取品牌

  // 综合
  all_fun() {
    this.setData({
      i: 0,
      show_brand: false,
      icon_status: false,
      icon_status1: false,
      priceType: '1',
      brand: ''
    })
    this.getGoodList(this.data.priceType, this.data.brand)
  },
  // 寄售价
  consignment_fun() {
    this.setData({
      i: 1,
      show_brand: false,
      icon_status1: false,
    })
    if (this.data.icon_status == false) {
      this.setData({
        icon_status: true,
        priceType: 1,
      })
    } else {
      this.setData({
        icon_status: false,
        priceType: 2,
      })
    }
    this.getGoodList(this.data.priceType, this.data.brand)
  },
  // 原价
  price_fun() {
    this.setData({
      i: 2,
      show_brand: false,
      icon_status: false
    })
    if (this.data.icon_status1 == false) {
      this.setData({
        icon_status1: true,
        priceType: 1,
      })
    } else {
      this.setData({
        icon_status1: false,
        priceType: 2,
      })
    }
    this.getGoodList(this.data.priceType, this.data.brand)
  },
  // 品牌
  brand_fun() {
    this.setData({
      i: 3,
      show_brand: true,
      icon_status: false,
      icon_status1: false,
    })
  },
  // 选择品牌
  choose_brand(e) {
    let brand = e.currentTarget.dataset.brand;
    this.setData({
      show_brand: false,
      brand: brand
    })
    this.getGoodList(this.data.priceType, this.data.brand)
  },
  colse_mold() {
    this.setData({
      show_brand: false,
    })
  },
  go_detail(e) {
    console.log(e)
    let goodsId = e.currentTarget.dataset.id;
    console.log(goodsId)
    wx.navigateTo({
      url: '../index/detail/detail?goodsId=' + goodsId,
    })
  },

  onLoad: function(options) {
    // console.log(options)
    if (options.typeId) {
      this.setData({
        typeId: options.typeId
      })
      this.getGoodList(this.data.priceType, this.data.brand)
      wx.setNavigationBarTitle({
        title: options.typeName
      })
    }
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