var network = require("../../utils/network.js");
Page({
  data: {
    imgUrls: [
      '../img/g1.png',
      '../img/p.png',
      '../img/g1.png',
    ],
    slide_list: [],
    homeList: []
  },
  onLoad() {
    wx.setStorage({
      key: 'token',
      data: 'ceshi',
    })
    this.slideShow();
    this.homeList_fun();
  },
  // 跳转详情
  go_detail(e) {
    let homeList = this.data.homeList;
    console.log(e)
    let hindex = e.currentTarget.dataset.hindex;
    let index = e.currentTarget.dataset.index;
    let goodsId = homeList[hindex].list[index].goodsId;
    console.log(goodsId)
    wx.navigateTo({
      url: './detail/detail?goodsId=' + goodsId,
    })
  },
  // 获取首页轮播图
  slideShow() {
    var that = this;
    network.POST({
      url: 'bannerList',
      header: 'application/x-www-form-urlencoded',
      params: {},
      success(res) {
        console.log(res)
        let slidelist = res.data.data;
        if (res.data.code == '0000') {
          that.setData({
            slide_list: slidelist
          })
          // console.log(that.data.slide_list);
        } else {
          // console.log(res);
        }
      }
    })
  },
  // 获取首页推荐商品列表
  homeList_fun() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'homeList',
          header: 'application/x-www-form-urlencoded',
          params: {
            token: res_token.data,
          },
          success(res) {
            var slidelist = res.data.data;
            if (res.data.code == '0000') {
              that.setData({
                homeList: slidelist
              })
              // console.log(that.data.homeList);
            } else {
              console.log(res);
            }
          }
        })
      },
    })
  }
})