// const API_URL = 'http://test.jianghairui.com/wechat/'
const API_URL = 'https://www.chugebaobao.com/displayStation/action/'

// const imgUrl = 'http://test.jianghairui.com'
const imgUrl = 'https://chugebaobao.com/displayStation/action/'



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
      if (res.data.code == 503) {
        wx.showToast({
          title: '未登录，点击登录！',
          icon: 'none'
        })
        wx.clearStorage()
        wx.switchTab({
          url: '/pages/my/my',
        })

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

function Login(userinfo) {
  wx.login({
    success(res) {
      console.log(res.code)
      if (res.code) {
        wx.request({
          url: API_URL + 'auth/login',
          data: {
            code: res.code,
            name:userinfo.nickName,
            pic: userinfo.avatarUrl
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          // header: {
            // "Content-Type": "application/x-www-form-urlencoded"},// 设置请求的 header
          success: function(res) {
            // console.log(res.data.code)
            if (res.data.code == 0) {
              wx.setStorage({
                key: 'token',
                data: res.data.data.token
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