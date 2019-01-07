Page({
  data: {
    imgUrls: [
      '../img/g1.png',
      '../img/p.png',
      '../img/g1.png',
    ],
  },
  onLoad() {
  
  },
  // 跳转详情
  go_detail() {
    wx.navigateTo({
      url: './detail/detail',
    })
  }
})