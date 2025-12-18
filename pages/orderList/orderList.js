// orderList.js
const { orderRequest } = require('../../api/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },

  /**
   * 获取订单列表数据
   */
  getOrderList() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    
    orderRequest.getOrderList()
      .then(res => {
        wx.hideLoading();
        if (res.code === 'success') {
          var orderList = res.data;
          console.log('订单列表数据:', orderList);
          that.setData({
            orderList: orderList
          });
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.error('获取订单列表失败:', err);
        wx.showModal({
          title: '加载出错',
          content: '订单列表加载失败',
          showCancel: false
        });
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList();
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