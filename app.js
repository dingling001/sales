//app.js
let network = require('./utils/network.js')
App({
  onLaunch: function() {

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
        this.globalData.w_num = res.data.consumerWechat;
        this.globalData.w_tel = res.data.consumerHotline
      }
    })
  },
  globalData: {
    userInfo: null,
    w_num: '',
    w_tel: ''
  }
})