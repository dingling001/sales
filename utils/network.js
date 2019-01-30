var API_URL = 'https://tv.zt31.cn/tv/consignment-master/app/weChat/'
// const API_URL ='http://test.jianghairui.com/wechat/'
const imgUrl = 'https://tv.zt31.cn'

var requestHandler = {
  url: "",
  header: "",
  params: {},
  success: function(res) {
    // success
  },
  fail: function() {

  },
}

function getUrlKey(key) {
  return decodeURIComponent((new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}
//GET请求
function GET(requestHandler) {
  request('GET', requestHandler)
}
//POST请求
function POST(requestHandler) {
  request('POST', requestHandler)
}

function request(method, requestHandler) {
  //注意：可以对params加密等处理
  var params = requestHandler.params;
  var url = requestHandler.url;
  var header = requestHandler.header;
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: API_URL + url,
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': header
    }, // 设置请求的 header
    success: function(res) {
      wx.hideLoading()
      //注意：可以对参数解密等处理
      if (res.data.code == 3) {
       
       
      } else {
        requestHandler.success(res)
      }
    },
    fail: function() {
      wx.showToast({
        title: '网络延迟，稍后再试',
        icon: 'none'
      })
    },
    complete: function() {
      // complete
    }
  })
}

module.exports = {
  GET: GET,
  POST: POST,
  getUrlKey: getUrlKey,
  imgUrl: imgUrl
}