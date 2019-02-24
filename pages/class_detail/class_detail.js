// pages/class_detail/class_detail.js
var network = require("../../utils/network.js");
Page({

  data: {
    i: 0,
    show_brand: false,
    icon_status: false,
    icon_status1: false,
    isAsc: false,
    id: '',
    priceType: 1,
    goodsBrand: [
      'lv',
      'GUCCI'
    ],
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
  getGoodList(sortCol, brand_id) {
    var that = this;
    network.GET({
      url: 'client/goods',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {
        // id: that.data.id,
        pageNum: 1,
        pageSize: 10,
        isAsc: that.data.isAsc,
        sortCol: sortCol,
        serial: that.data.id,
        goodsType: brand_id,
        isRecommend:0
      },
      success(res) {
        console.log(res)

        if (res.data.code == 0) {
          let goodsList = res.data.data.records;
          // let goodsBrand = res.data.data.goodsBrand;
          for (let i in goodsList) {
            goodsList[i].coverImage = network.imgUrl + goodsList[i].coverImage
          }
          that.setData({
            goodsList: goodsList,
            // goodsBrand: goodsBrand
          })
          console.log(that.data.goodsList);
        } else {
          // console.log(res);
        }
      }
    })

  },
  // 获取品牌
  getbrand() {
    var that = this;
    network.GET({
      url: 'client/type/'+ that.data.id+'/serial',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {
        pageSize: 10,
        pageNum: 1
      },
      success(res) {
        console.log(res)
        // let goodsList = res.data.data.records;


        if (res.data.code == 0) {
          let goodsBrand = res.data.data;
          that.setData({
            // goodsList: goodsList,
            goodsBrand: goodsBrand
          })

        } else {
          // console.log(res);
        }
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
    this.getGoodList('create_time', this.data.brand)
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
        isAsc: false,
      })
    } else {
      this.setData({
        icon_status: false,
        isAsc: true,
      })
    }
    this.getGoodList('expect_price', '')
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
        isAsc: false,
      })
    } else {
      this.setData({
        icon_status1: false,
        isAsc: true,
      })
    }
    this.getGoodList('buy_price', '')
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
    this.getGoodList('', this.data.brand)
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
    console.log(options)
    if (options.id) {
      this.setData({
        id: options.id,
        name: options.name
      })
      this.getGoodList('create_time', this.data.brand)
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