//app.js
App({
  onLaunch: function () {
    
    wx.login(
      {
        success(res) {
          if (res.code) {
            // 发起网络请求
            this.globalData.code = res.code
          }
          else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      }
    ) 
    wx.getUserInfo(
      {
        success(res){
          this.globalData.image_url = res.userInfo.avatarUrl;
          this.globalData.nick_name = res.userInfo.nickName;
        }
      }
    )

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

   
  },
  onShow: function () {
  },
  globalData: {
    appid: "1259217349",
    secretid: "AKIDG5f7J7Z04scATW5AcpmY5NPFrKabg4Rc",
    secret: "93qTuJ3czBKSSQEoBLtDICrupY6sQkqg",
    image_url: "",
    resource:"this is"
  }
})
