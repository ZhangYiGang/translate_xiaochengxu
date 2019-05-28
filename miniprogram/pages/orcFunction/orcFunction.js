// miniprogram/pages/orcFunction/orcFunction.js
var app =getApp();
var time='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:0,
    image_url :"" ,
    mode: "scaleToFill",
    result_string:"这里会显示结果啊"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      image_url: app.globalData.image_url[0],
      // result_string:app.globalData.result_text
    })
//console.log(that.data.image_url)
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
  
  ocr: function () {
    var that = this;
    that.submitimg();
    
  },
  back: function(){
    wx.navigateBack({
      delta: 1
    })

  },
  submitimg() {
    wx.showLoading({ 'title': '识别中' });//提示框
    var CryptoJS = require('../../lib/crypto-js/crypto-js');//引入CryptoJS模块
    var now = Math.floor(Date.now() / 1000);
    var expired = now + 1000;//生成过期时间
    var secret_src = 'a=' + app.globalData.appid + '&b=' + '&k=' + app.globalData.secretid + '&e=' + expired + '&t=' + now + '&r=' + '123' + '&f=';//按照开发文档拼接字符串
    var auth_b = CryptoJS.HmacSHA1(secret_src, app.globalData.secret).concat(CryptoJS.enc.Utf8.parse(secret_src));//完成加密算法
    var auth = auth_b.toString(CryptoJS.enc.Base64);//按要求获取base64字符串
    var that = this;
    time = Date.now();//开始计时
    wx.uploadFile({
      url: 'https://recognition.image.myqcloud.com/ocr/handwriting',
      filePath: app.globalData.image_url[0],
      name: 'image',
      header: {
        'authorization': auth//header按照文档填写
      },
      formData: {
        'appid': app.globalData.appid
      },
      success: function (res) {
        wx.hideLoading();
        var data = res.data;
        that.response(data,time);
        // console.log(data);
        // console.log(JSON.parse(data))
        // db.collection('content').add({
        //   data: JSON.parse(res.data)
        // })
      }
    })
  },

  response(data) {
    var result = JSON.parse(data);
    if (result.code != 0)//非正常情况
    {
      wx.showModal({ 'title': '错误', 'content': '服务暂不可用\ncode:' + result.code + '\nmsg:' + result.message, 'showCancel': false });
    }
    else {
      var resource = "";
      for (var i = 0; i < result.data.items.length; i++) {
        resource = resource + result.data.items[i].itemstring;//识别返回结果的拼接
      }
      var last = Date.now() - time;//停止计时
      this.setData({ time: ' 用时:' + last + 'ms' });//显示
      console.log(result);//控制台记录结果，以便调试
      this.setData({ "result_string": resource });
      console.log(resource)
      app.globalData.resource = resource
    }
  },
  translate: function(){
    wx.navigateTo({
      url: '../translateFunction/translateFunction',
    })
  }
})