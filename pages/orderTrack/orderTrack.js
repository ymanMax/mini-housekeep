// orderTrack.js
const { orderRequest } = require('../../api/index.js');
const { simulateOrderStatusChange } = require('../../api/mockData.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {},
    statusTimeline: [],
    progressDetails: []
  },

  /**
   * 获取订单跟踪信息
   */
  getOrderTrackInfo: function (orderId) {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });

    orderRequest.getOrderTrack(orderId)
      .then(res => {
        wx.hideLoading();
        if (res.code === 'success') {
          that.setData({
            orderInfo: res.data.orderInfo,
            statusTimeline: res.data.statusTimeline,
            progressDetails: res.data.progressDetails
          });
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.error('获取订单跟踪信息失败:', err);
        wx.showModal({
          title: '加载出错',
          content: '订单跟踪信息加载失败',
          showCancel: false
        });
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.orderId) {
      this.orderId = options.orderId;
      this.getOrderTrackInfo(options.orderId);

      // 启动订单状态变化模拟
      this.startStatusChangeSimulation(options.orderId);
    }
  },

  /**
   * 启动订单状态变化模拟
   */
  startStatusChangeSimulation: function (orderId) {
    var that = this;

    // 模拟订单状态变化
    simulateOrderStatusChange(orderId, function (changedOrderId, newStatus, message) {
      // 显示状态变化通知
      wx.showToast({
        title: '订单状态已更新',
        icon: 'success',
        duration: 2000
      });

      // 重新获取订单跟踪信息
      that.getOrderTrackInfo(changedOrderId);
    });
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