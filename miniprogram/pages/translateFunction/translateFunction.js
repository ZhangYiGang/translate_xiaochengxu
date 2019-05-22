// pages/translateFunction/translateFunction.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resource: "",
    translation: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.listenerTrans(app.globalData.resource)
  },

  /**
   * 有道翻译api
   */
  listenerTrans: function (inputData) {
    var that = this;
    wx.request({
      url: 'http://fanyi.youdao.com/translate',
      data: {
        doctype: 'json',
        type: 'AUTO',
        i: inputData
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        that.setData({
          resource: app.globalData.resource,
          translation: res.data.translateResult[0][0]['tgt']
        })
        app.globalData.translation = res.data.translateResult[0][0]['tgt'];
        // console.log(res.data.translateResult[0][0]['tgt']);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }, 

  /**
   * 上传至云后台
   */
  upload: function (){
    console.log(app.globalData.resource)
    if(app.globalData.resource!=null)
    {
      //初始化数据库
      const db = wx.cloud.database()
      //向数据库添加一条记录
      db.collection('historyRecord').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          resource: app.globalData.resource,
          translation: app.globalData.translation,
          tag: 1
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          // console.log(res)
          wx.showToast({
            title: '上传成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  copy: function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.translation,
      success: function (res) {
        // self.setData({copyTip:true}),
        wx.showToast({
          title: '复制成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        // wx.showModal({
        //   title: '提示',
        //   content: '复制成功',
        //   success: function (res) {
        //     if (res.confirm) {
        //       console.log('确定')
        //     } else if (res.cancel) {
        //       console.log('取消')
        //     }
        //   }
        // })
      }
    });
  },
})