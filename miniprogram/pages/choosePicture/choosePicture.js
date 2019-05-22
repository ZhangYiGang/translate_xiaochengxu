// miniprogram/pages/choosePicture/choosePicture.js
var app = getApp();
var time = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: "../../res/example.jpg",//wx.chooseImage接口返回的临时地址
    resultstring: "",
    mode: "scaleToFill",
    time: "",//用时记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  setImage: function () {
    var width;
    var height;
    var that=this;
    wx.getImageInfo({
      src: that.data.tempFilePaths,
      success(res) {
        width = res.width
        height = res.height
      }
    })
    if (width > height) {
      that.data.mode = "aspectFit"
      // console.log(mode)
    } else {
      that.data.mode = "aspectFill"
      // console.log(mode)
    }
  },
  selectimgFromAlbum: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'],
      sourceType: ['album'], // 
      success: function (res) {// 
        that.setData({
          tempFilePaths: res.tempFilePaths,

        });//保存临时文件地址
        // that.submitimg();
        app.globalData.image_url = that.data.tempFilePaths;
        
        wx.navigateTo({
          url: '../orcFunction/orcFunction',
          
        } )
        that.setImage()
      }
    })
    

  },
  selectimgFromCamera: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['original', 'compressed'], //
      sourceType: ['camera'],
      success: function (res) {
        that.setData({
          tempFilePaths: res.tempFilePaths
        });//保存临时文件地址
        // that.submitimg();
      }
    })
    wx.navigateTo({
      url: '../ orcFunction / orcFunction',
    })
    that.setImage()
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

  }
})