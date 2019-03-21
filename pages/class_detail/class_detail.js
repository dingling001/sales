// pages/class_detail/class_detail.js
var network = require("../../utils/network.js");
Page({

  data: {
    i: 0,
    show_brand: false,
    icon_status: false,
    icon_status1: false,
    isAsc: 0,
    isAsc1: 0,
    id: '',
    priceType: 1,
    goodsBrand: [],
    brand: '',
    goodsList: [],
    name: ''
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
  getGoodList() {
    var that = this;
    network.GET({
      url: 'GoodsAction/list',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {
        page: 1,
        goodsTypeId: that.data.id,
        limit: 1000,
      },
      success(res) {
        if (res.data) {
          let goodsList = res.data.data;
          for (let i in goodsList) {
            for (let j in goodsList[i].goodsSwiperList) {
              goodsList[i].goodsSwiperList[j].image = network.imgUrl + goodsList[i].goodsSwiperList[j].image
            }
          }
          that.setData({
            goodsList: goodsList,
          })
          // console.log(that.data.goodsList);
        } else {

        }
      }
    })

  },
  // 获取品牌
  getbrand() {
    var that = this;
    network.GET({
      url: 'BrandAction/listAll',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {},
      success(res) {
        // console.log(res.data.data)
        if (res.data.data) {
          let goodsBrand = res.data.data;
          that.setData({
            goodsBrand: goodsBrand
          })

        } else {}
      }
    })

  },
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
    this.getGoodList()
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
        isAsc: 1,
        isAsc1: 0,
      })
    } else {
      this.setData({
        icon_status: false,
        isAsc: 2,
        isAsc1: 0,
      })
    }
    this.search_fun(this.data.isAsc, this.data.isAsc1, '')
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
        isAsc: 0,
        isAsc1: 1,
      })
    } else {
      this.setData({
        icon_status1: false,
        isAsc: 0,
        isAsc1: 2,
      })
    }
    this.search_fun(this.data.isAsc, this.data.isAsc1, '')
  },
  // 品牌
  brand_fun() {
    this.setData({
      i: 3,
      show_brand: true,
      icon_status: false,
      icon_status1: false,
      isAsc: 0,
      isAsc1: 0
    })
  },
  // 选择品牌
  choose_brand(e) {
    let brand = e.currentTarget.dataset.brand;
    this.setData({
      show_brand: false,
      brand: brand
    })
    this.search_fun(0, 0, this.data.brand)
  },
  colse_mold() {
    this.setData({
      show_brand: false,
    })
  },
  go_detail(e) {
    // console.log(e)
    let goodsId = e.currentTarget.dataset.id;
    // console.log(goodsId)
    wx.navigateTo({
      url: '../index/detail/detail?goodsId=' + goodsId,
    })
  },
  // 筛选
  search_fun(consignmentFlag = 1, originalPriceFlag = 1, brandId) {
    var that = this;
    network.POST({
      url: 'GoodsAction/searchGoodsList',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {
        // id: that.data.id,
        page: 1,
        goodsTypeId: that.data.id,
        limit: 1000,
        consignmentFlag: consignmentFlag,
        originalPriceFlag: originalPriceFlag,
        brandId: brandId,
        search: '',
      },
      success(res) {

        if (res.data) {
          let goodsList = res.data.data;
          for (let i in goodsList) {
            goodsList[i].detail = network.imgUrl + goodsList[i].detail
          }
          that.setData({
            goodsList: goodsList,
          })
          // console.log(that.data.goodsList);
        } else {

        }
      }
    })

  },

  onLoad: function(options) {
    // console.log(options)
    if (options.id) {
      this.setData({
        id: options.id,
        name: options.name
      })
      this.getGoodList()
      wx.setNavigationBarTitle({
        title: options.name
      })
    }
    this.getbrand()
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