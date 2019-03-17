// pages/my/my_address/my_address.js
var network = require("../../../utils/network.js");
Page({

  data: {
    address_info: [],
    list: [],
    id: '',
    show_add: false
  },
  // 获取地址列表
  getaddress() {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.GET({
          url: 'auth/AddressAction/myAddress',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": 'JSESSIONID=' + res_token.data,
            'X-Requested-With': 'XMLHttpRequest'
          },
          params: {

          },
          success(res) {
            console.log(res)
            that.setData({
              show_add: true
            })
          }
        })
      },
    })
  },
  // 获取微信地址
  getAddress() {
    let that = this;
    wx.chooseAddress({
      success(res) {
        console.log(res)
        that.setData({
          address_info: res
        })
        if (that.data.show_add) {
          that.updateadd(address, res.userName, res.telNumber)
        } else {
          that.saveAddress(res.userName, res.telNumber, res.provinceName, res.cityName, res.countyName, res.detailInfo, res.nationalCode)
        }

      }
    })
  },
  // 保存地址
  saveAddress(receiptName, phone, province, city, area, detaileAddress, zipCode) {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        console.log(res_token)
        network.POST({
          url: 'auth/AddressAction/saveAddress',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": 'JSESSIONID=' + res_token.data,
            'X-Requested-With': 'XMLHttpRequest'
          },
          params: {
            receiptName,
            phone,
            province,
            city,
            area,
            detaileAddress,
            zipCode
          },
          success(res) {
            if (res.data.state) {
              wx.showToast({
                title: '保存成功',
              })
              that.getaddress()
            } else {
              wx.showToast({
                title: res.msg || '稍后再试',
                icon: 'none'
              })
            }
          }

        })
      },
    })
  },
  // 更新地址
  updateadd(id, receiptName, phone, province, city, area, detaileAddress, zipCode) {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        console.log(res_token)
        network.POST({
          url: 'auth/AddressAction/saveAddress',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": 'JSESSIONID=' + res_token.data,
            'X-Requested-With': 'XMLHttpRequest'
          },
          params: {
            id,
            receiptName,
            phone,
            province,
            city,
            area,
            detaileAddress,
            zipCode
          },
          success(res) {
            console.log(res)
            if (res.data.code == 0) {
              wx.showToast({
                title: '保存成功',
              })
              that.getaddress()
            } else {
              wx.showToast({
                title: res.msg || '稍后再试',
                icon: 'none'
              })
            }
          }

        })
      },
    })
  },
  onLoad: function(options) {
    this.getaddress()
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