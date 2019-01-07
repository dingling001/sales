Page({
  data: {
    imgUrls: [
      '../img/p1.png',
      '../img/p.png',
      '../img/p1.png',
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