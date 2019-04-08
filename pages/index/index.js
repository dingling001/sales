var network = require("../../utils/network.js");
const app = getApp();
Page({
  data: {
    slide_list: [],
    homeList: [],
    scrollTop: 0,
    show_back: false,
    windowHeight: '',
    show_mold: true,
    w_num: '',
    w_tel: '',
    page: 1,
    limit:10,
    count: 0,
    scrollTop: 0,
    scrollHeight: 0,
    hideBottom: false,
    loadMoreData:'',
    imgUrl:network.imgUrl
  },
  openmsg() {
    this.setData({
      show_mold: false
    })
    wx.hideTabBar({
      animation: true
    })

  },
  close_mold() {
    this.setData({
      show_mold: true
    })
    wx.showTabBar({
      animation: true
    })
  },
  copy_fn(e) {
    let wnum = e.currentTarget.dataset.wnum;
    wx.setClipboardData({
      data: wnum,
      success(res) {
        wx.getClipboardData({
          success(res) {}
        })
      }
    })
  },
  call_fn(e) {
    let wtel = e.currentTarget.dataset.wtel;
    wx.makePhoneCall({
      phoneNumber: wtel // 仅为示例，并非真实的电话号码
    })
  },
  getmsg() {
    let that = this;
    network.GET({
      url: 'SettingAction/get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {},
      success(res) {
        console.log(res)
        that.setData({
          w_num: res.data.consumerWechat,
          w_tel: res.data.consumerHotline
        })
      }
    })
  },
  onLoad() {
    this.slideShow();
    this.homeList_fun();
    this.getmsg();
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
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
    this.setData({
      scrollTop: e.detail.scrollTop
    });
  },
  bindDownLoad: function() {
    var that = this;
    // loadMore(that);
    if (that.data.page == that.data.count) {
      that.setData({
        hideBottom: false
      })
      return;
    }
    setTimeout(function() {
      console.log('上拉加载更多');
      var tempCurrentPage = that.data.page;
      tempCurrentPage = tempCurrentPage + 1;
      that.setData({
        page: tempCurrentPage,
      })

    }, 300);

  },

  topLoad: function(event) {

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
        limit: that.data.limit,
        page: that.data.page,
      },
      success(res) {
        wx.hideNavigationBarLoading()
        if (res.data.code == 0) {
          if (that.data.page == 1) {
            that.setData({
              homeList: res.data.data,
              count: res.data.count
            })
          } else {
            let homeList = that.data.homeList;
            homeList = homeList.concat(res.data.data);
            that.setData({
              homeList: homeList,
              allPages: res.data.count,
              hideBottom: true
            })
          }
          // console.log(that.data.homeList);
        } else {;
        }
        //   }
        // })
      },
    })
  },
  onShareAppMessage: function() {

  }
})