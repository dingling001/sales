// pages/my/my_address/my_address.js
var network = require("../../../utils/network.js");
Page({

  data: {
    address_info: [],
    list:[]
  },
// 获取地址列表
getaddress(){
  let that=this;
  wx.getStorage({
    key: 'token',
    success: (res_token) => {
      console.log(res_token)
      network.GET({
        url: 'user/address',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": res_token.data
        },
        params: {
        
        },
        success(res) {
          console.log(res)
          if (res.data.code == 0) {
           that.setData({
             list:res.data.data
           })
          } 
        }

      })
    },
  })
},
  // 获取地址
  getAddress() {
    let that = this;
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        let address = res.provinceName + res.countyName +res.detailInfo
        that.setData({
          address_info: res
        })
        that.saveAddress(address, res.userName, res.telNumber)
      }
    })
  },
  // 保存地址
  saveAddress(address, receiverUser, mobile) {
    let that=this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        console.log(res_token)
        network.POST({
          url: 'user/address',
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": res_token.data
          },
          params: {
            address,
            receiverUser,
            mobile
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