var network = require("../../utils/network.js");
const app = getApp();
Page({
  data: {
    slide_list: [],
    homeList: [],
    scrollTop: 0,
    show_back: false,
    windowHeight: '',
    item:false
  },
  openmsg(){
    console.log(111)
    this.setData({
      item: true
    })
  },
  onLoad() {
    this.slideShow();
    this.homeList_fun();
    // var that = this
    // // // 获取系统信息
    // wx.getSystemInfo({
    //   success: function (res) {
    //     ;
    //     // 可使用窗口宽度、高度
    //     console.log('height=' + res.windowHeight);
    //     console.log('width=' + res.windowWidth);
    //     // 计算主体部分高度,单位为px

    //     that.setData({
    //       show_back: false,
    //       windowHeight: res.windowHeight
    //     })
    //   }
    // })
  },
  // 滚动事件
  scroll(e) {
    let that = this;
    if (e.detail.scrollTop >= that.data.windowHeight) {
      that.setData({
        show_back: true,
      })
    } else {
      that.setData({
        show_back: false,
      })
    }
  },
  onShow() {
    this.slideShow();
    this.homeList_fun();
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
  // 跳转详情
  go_detail(e) {
    let homeList = this.data.homeList;
    // console.log(e)
    let hindex = e.currentTarget.dataset.hindex;
    let index = e.currentTarget.dataset.index;
    let goodsId = homeList[index].goods.id;
    // console.log(goodsId)
    wx.navigateTo({
      url: './detail/detail?goodsId=' + goodsId,
    })
  },
  // 获取首页轮播图
  slideShow() {
    var that = this;
    // wx.getStorage({
    //   key: 'token',
    //   success: (res_token) => {
    network.GET({
      url: 'SwiperAction/getSwiperList',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {},
      success(res) {
        //
        let slidelist = res.data.data;
        for (let i in slidelist) {
          slidelist[i].image = network.imgUrl + slidelist[i].image
        }
        if (res.data.data) {
          that.setData({
            slide_list: slidelist
          })
          // console.log(that.data.slide_list);
        } else {
          // ;
        }
      }
    })
  },
  // 获取首页推荐商品列表
  homeList_fun() {
    wx.showNavigationBarLoading()
    var that = this;
    network.POST({
      url: 'GoodsAction/listByRecommend',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {
        limit: 10000,
        page: 0,
      },
      success(res) {
        wx.hideNavigationBarLoading()
        var slidelist = res.data.data;
        // console.log(slidelist)
        for (let i in slidelist) {
          for (let j in slidelist[i].goodsSwiperList){
            slidelist[i].goodsSwiperList[j].image = network.imgUrl + slidelist[i].goodsSwiperList[j].image
          }
         
        }
        if (res.data.code == 0) {
          that.setData({
            homeList: slidelist
          })
          // console.log(that.data.homeList);
        } else {
          ;
        }
        //   }
        // })
      },
    })
  },
  onShareAppMessage: function () {

  }
})
