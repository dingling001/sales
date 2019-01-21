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
    brand: '',
    index: -1
  },
  // 获取分类
  getTypeList() {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'getTypeList',
          header: 'application/x-www-form-urlencoded',
          params: {
            token: res_token.data,
          },
          success(res) {
            // console.log(res)
            let classlist = res.data.data;
            let list = []
            for (let i in classlist) {
              classlist[i].banImg = network.imgUrl + classlist[i].typeImg,
                list.push(classlist[i].typeName)
            }
            if (res.data.code == '0000') {
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
      fail: (err => {
        wx.showModal({
          title: '登录已失效',
          content: '请点击我的-> 登录',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../../my/my',
              })
            }
          }
        })
      })
    })
  },
  bindType(e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 品牌
  brand_fun(e) {
    this.setData({
      brand: e.datail.value
    })
  },
  // 选择图片
  img1_fun() {
    var that = this;
    var imgs = this.data.imgs;
    wx.chooseImage({
      count: imgs.length - 4, // 默认9 
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
    wx.uploadFile({
      url: util.baseUrl + 'index/api/uploadImage',
      header: {
        'content-type': 'multipart/form-data'
      },
      filePath: filepath,
      name: 'file',
      formData: {
        token: that.data.token
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
  onLoad: function(options) {
    this.getTypeList()
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