// const API_URL = 'http://test.jianghairui.com/wechat/'
const API_URL = 'https://www.chugebaobao.com/displayStation/action/'

// const imgUrl = 'http://test.jianghairui.com'
const imgUrl = 'https://chugebaobao.com/displayStation/'



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
    header: header, // 设置请求的 header
    success: function(res) {
      wx.hideLoading()
      //注意：可以对参数解密等处理
      if (res.statusCode == 403) {
        wx.showToast({
          title: '登录已失效，点击登录！',
          icon: 'none'
        })
        wx.removeStorage({
          key: 'token',
          success(res) {
            console.log(res.data)
          }
        })
        wx.switchTab({
          url: '/pages/my/my',
        })

      } else {
        requestHandler.success(res)
      }
    },
    fail: function(err) {
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

function Login(userinfo = {}) {
  wx.login({
    success(res) {
      // console.log(res.code)
      if (res.code) {
        wx.request({
          url: API_URL + 'WeiXinLogin/miniProgramUserInit',
          data: {
            code: res.code,
            nickName: userinfo.nickName,
            image: userinfo.avatarUrl
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          // header: {
          // "Content-Type": "application/x-www-form-urlencoded"},// 设置请求的 header
          success: function(res) {
            // console.log(res.data.sessionId)
            if (res.data.state) {
              wx.setStorage({
                key: 'token',
                data: res.data.sessionId
              });
              wx.setStorage({
                key: 'userinfo',
                data: userinfo,
              })
            }
          }
        })

      }
    }
  })
}

module.exports = {
  GET: GET,
  POST: POST,
  Login: Login,
  getUrlKey: getUrlKey,
  imgUrl: imgUrl,
}