// pages/sale/sale_form/sale_form.js
let util = require('../../../utils/util.js')
let network = require('../../../utils/network.js')
Page({


  data: {
    classlist: [],
    list: [],
    imgs: [],
    temp: 0,
    images: [],
    showAdd: true,
    token: '',
    expectPrice: '',
    buyPrice: '',
    phone: '',
    serial: '',
    tips: '',
    goods: '',
    index: -1
  },
  // 获取分类
  getTypeList() {
    var that = this;
    network.GET({
      url: 'client/type',
      header: {
            "Content-Type": "application/x-www-form-urlencoded"},
      params: {
        pageSize: 10,
        pageNum: 1
      },
      success(res) {
        console.log(res)
        let classlist = res.data.data.records;
        let list = []
        for (let i in classlist) {
          list.push(classlist[i].name)
        }
        if (res.data.code == 0) {
          that.setData({
            classlist: classlist,
            list: list
          })
          // console.log(that.data.classlist);
        } else {
          // console.log(res);
        }
      }
    })
  },
  bindType(e) {
    this.setData({
      index: e.detail.value
    })
  },
  oldprice_fun(e) {
    this.setData({
      expectPrice: e.detail.value
    })
  },
  price_fun(e) {
    this.setData({
      buyPrice: e.detail.value
    })
  },
  tel_fun(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  goods_fun(e) {
    this.setData({
      goods: e.detail.value
    })
  },
  tips_fun(e) {
    this.setData({
      tips: e.detail.value
    })
  },
  // 品牌
  brand_fun(e) {
    this.setData({
      serial: e.detail.value
    })
  },
  // 选择图片
  img1_fun() {
    var that = this;
    var imgs = this.data.imgs;
    wx.chooseImage({
      count: 4, // 默认9 
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function(res) {
        console.log(res)
        if (imgs.length >= 4) {
          wx.showToast({
            title: '最多上传4张图片',
            icon: 'none'
          })
          that.setData({
            showAdd: false
          })

        } else if (res.tempFiles[0].size > 307200) {
          wx.showToast({
            title: '图片过大',
            icon: 'none'
          })
        } else {
          console.log(res.tempFilePaths)
          that.setData({
            imgs: that.data.imgs.concat(res.tempFilePaths)
          });
          that.upload();
          that.setData({
            temp: that.data.imgs.length //用来解决 for 循环比 异步 快
          })
        }
      }
    })
  },
  //上传图片
  upload() {
    console.log(this.data.temp)
    for (var i = this.data.temp; i < this.data.imgs.length; i++) {
      // console.log("000")
      this.upload_file(this.data.imgs[i])
    }
  },
  // // 确认上传图片
  upload_file(filepath) {
    var that = this;
    console.log(that.data.token)
    wx.uploadFile({
      // url: util.baseUrl + 'user/upload',
      url:'http://test.jianghairui.com/wechat/user/upload',
      header: {
        'content-type': 'multipart/form-data',
        "Authorization": that.data.token
      },
      filePath: filepath,
      name: 'file',
      formData: {
        // token: that.data.token
      },
      success: function(res) {
        console.log(res)
        var imgs = [];
        // imgs = imgs.concat(JSON.parse(res.data).data.path)
        that.setData({
          images: that.data.images.concat(JSON.parse(res.data).data.path) //把字符串解析成对象
          // images: imgs
        })
        if (that.data.images.length >= 4) {
          that.setData({
            showAdd: false
          })
        }
        console.log(that.data.images)
      },
      fail: function(res) {
        wx.showToast({
          title: '图片加载失败',
          icon: 'none'
        })
      }
    })
  },
  // 提交
  go_sale(e) {
    let that = this;
    let token = that.data.token;
    let serial = that.data.serial;
    let index = that.data.index;
    // let type = that.classlist[index].id;
    let type = 'kuabao';
    let goods = that.data.goods;
    let buyPrice = that.data.buyPrice;
    let expectPrice = that.data.expectPrice;
    let phone = that.data.phone;
    let tips = that.data.tips;
    let images = that.data.images;
    let post = {
      serial,
      type,
      goods,
      buyPrice,
      expectPrice,
      phone,
      tips,
      images,
      token
    }
    if (e.detail.userInfo) {
      if (serial == '') {
        wx.showToast({
          title: '请输入品牌',
          icon: 'none'
        })
      }
      //  else if (index == -1) {
      //   wx.showToast({
      //     title: '请选择类型',
      //     icon: 'none'
      //   })
      // } 
      else if (goods == '') {
        wx.showToast({
          title: '请输入商品名称',
          icon: 'none'
        })
      } else if (buyPrice == '') {
        wx.showToast({
          title: '请输入购入价',
          icon: 'none'
        })
      } else if (expectPrice == '') {
        wx.showToast({
          title: '请输入期望价',
          icon: 'none'
        })
      } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
        wx.showToast({
          title: '请输入正确的联系电话',
          icon: 'none'
        })
      }
      // else if (images.length < 1) {
      //   wx.showToast({
      //     title: '请至少上传一张照片',
      //     icon: 'none'
      //   })
      // }
      //  else if (token == '') {
      //   wx.showToast({
      //     title: '正在登录...',
      //     icon: 'none'
      //   })
      // }
      else {
        console.log(post)
        network.POST({
          url: 'user/goods',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"},
          params: post,
          success(res) {
            console.log(res)
          }
        })
      }
    } else {
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      });
    }
    // console.log(post)
  },
  onLoad: function(options) {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: (res)=> {
        that.setData({
          token:res.data
        })
      },
    })
    this.getTypeList()
  },

  // 删除图片
  cancel_img(e) {
    let that = this;
    let index = e.target.dataset.index;
    let imgs = this.data.imgs
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
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