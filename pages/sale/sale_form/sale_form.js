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
    brand: '',
    mark: '',
    name: '',
    index: -1
  },

  // 获取分类
  getTypeList() {
    var that = this;
    network.POST({
      url: 'GoodsTypeAction/listAll',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {},
      success(res) {

        let classlist = res.data;
        let list = []
        for (let i in classlist) {
          list.push(classlist[i].name)
        }
        if (res.data) {
          that.setData({
            classlist: classlist,
            list: list
          })
        } else {}
        // console.log(that.data.classlist)
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
      expectationPrice: e.detail.value
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
      name: e.detail.value
    })
  },
  tips_fun(e) {
    this.setData({
      mark: e.detail.value
    })
  },
  // 品牌
  brand_fun(e) {
    this.setData({
      brand: e.detail.value
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
          // console.log(res.tempFilePaths)
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
    // console.log(this.data.temp)
    for (var i = this.data.temp; i < this.data.imgs.length; i++) {
      // console.log("000")
      this.upload_file(this.data.imgs[i])
    }
  },
  // // 确认上传图片
  upload_file(filepath) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        wx.uploadFile({
          // url: util.baseUrl + 'user/upload',
          url: network.imgUrl + 'action/auth/HxSysUploadAction/upload',
          header: {
            'content-type': 'multipart/form-data',
            "Cookie": 'JSESSIONID=' + res_token.data
          },
          filePath: filepath,
          name: 'imagekey',
          formData: {},
          success: function(res) {

            // imgs = imgs.concat(JSON.parse(res.data).data.path)
            // console.log(JSON.parse(res.data).list.join(','))
            that.setData({
              images: that.data.images.concat(JSON.parse(res.data).list) //把字符串解析成对象

              // images: imgs
            })
            if (that.data.images.length >= 4) {
              that.setData({
                showAdd: false
              })
            }
            // console.log(that.data.images)
          },
          fail: function(res) {
            wx.showToast({
              title: '图片加载失败',
              icon: 'none'
            })
          }
        })
      },
    })

  },
  // 提交
  go_sale(e) {
    let that = this;
    let token = that.data.token;
    let brand = that.data.brand;
    let index = that.data.index;
    let name = that.data.name;
    let buyPrice = that.data.buyPrice;
    let expectationPrice = that.data.expectationPrice;
    let phone = that.data.phone;
    let mark = that.data.mark;
    let image = that.data.images.join(',');
    if (brand == '') {
      wx.showToast({
        title: '请输入品牌',
        icon: 'none'
      })
    } else if (index == -1) {
      wx.showToast({
        title: '请选择类型',
        icon: 'none'
      })
    } else if (name == '') {
      wx.showToast({
        title: '请输入商品名称',
        icon: 'none'
      })
    } else if (buyPrice == '') {
      wx.showToast({
        title: '请输入购入价',
        icon: 'none'
      })
    } else if (expectationPrice == '') {
      wx.showToast({
        title: '请输入期望价',
        icon: 'none'
      })
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
      wx.showToast({
        title: '请输入正确的联系电话',
        icon: 'none'
      })
    } else if (image.length < 1) {
      wx.showToast({
        title: '请至少上传一张照片',
        icon: 'none'
      })
    }
    //  else if (token == '') {
    //   wx.showToast({
    //     title: '正在登录...',
    //     icon: 'none'
    //   })
    // }
    else {

      let goodsTypeId = that.data.classlist[that.data.index].id;
      let post = {
        name,
        brand,
        goodsTypeId,
        buyPrice,
        expectationPrice,
        phone,
        mark,
        image,
      }

      // console.log(post)
      wx.getStorage({
        key: 'token',
        success: (res_token) => {
          wx.showModal({
            title: '寄售',
            content: '确定提交',
            success(res) {
              if (res.confirm) {
                network.POST({
                  url: 'auth/ConsignmentAction/addConsignment',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cookie": 'JSESSIONID=' + res_token.data,
                    'X-Requested-With': 'XMLHttpRequest'
                  },
                  params: post,
                  success(res) {
                    // console.log(res.data.data)
                    if (res.data.state) {
                      wx.navigateTo({
                        url: '../../my/my_sale/my_sale',
                      })
                    }
                  }
                })
              } else if (res.cancel) {
                // console.log('用户点击取消')
              }
            }
          })
        },
      })
    }
    // console.log(post)
  },
  onLoad: function(options) {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: (res) => {

        that.setData({
          token: res.data
        })
      },
    })
    this.getTypeList()
  },

  // 删除图片
  cancel_img(e) {
    let that = this;
    let index = e.target.dataset.index;
    let image = this.data.images;
    let imgs = this.data.imgs
    // console.log(image)
    // console.log(imgs)
    image.splice(index, 1);
    imgs.splice(index, 1)
    this.setData({
      image: image,
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
