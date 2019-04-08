//app.js
let network = require('./utils/network.js')
App({
  onLaunch: function() {
    this.getmsg()
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
        // console.log(res.data.consumerWechat)
        that.globalData.w_num = res.data.consumerWechat;
        that.globalData.w_tel = res.data.consumerHotline
      }
    })
  },
  globalData: {
    userInfo: null,
    w_num: '',
    w_tel: ''
  }
})