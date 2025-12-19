// detailInfo.js
//获取应用实例
const { serviceRequest, commentRequest } = require('../../api/index.js');

Page({
  data: {
    detail: '',
    images: [],
    amount: 0,
    id: '',
    count: 0,
    commentList: [],
    averageRating: 0
  },
  sendbtnClick() {
    let that = this;
    wx.navigateTo({
      url: './../booking/booking?id=' + that.data.id,
    })
  },
  // 写评价按钮点击事件
  writeCommentClick() {
    wx.navigateTo({
      url: './../comment/comment',
    })
  },
  // 获取评价数据
  getCommentData() {
    let that = this;
    commentRequest.getCommentList()
      .then(res => {
        if (res.code === 'success') {
          let commentList = res.data;
          // 计算平均评分
          let totalRating = 0;
          commentList.forEach(item => {
            totalRating += item.rating;
          });
          let averageRating = commentList.length > 0 ? (totalRating / commentList.length).toFixed(1) : 0;

          that.setData({
            commentList: commentList,
            averageRating: averageRating
          });
        }
      })
      .catch(err => {
        console.error('获取评价数据失败:', err);
      });
  },
  reqData() {
    var that = this;
    // 使用API获取服务详情
    serviceRequest.getDetailInfo(that.data.id)
      .then(res => {
        if (res.code === 'success') {
          var data = res.data;
          let amount = parseInt(data.price) * that.data.count;
          that.setData({
            detail: data.detail || data.description || '',
            images: data.images || [],
            amount: amount
          });
        }
      })
      .catch(err => {
        console.error('获取服务详情失败:', err);
      });
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
      count: options.count || 1
    });
    this.reqData();
    this.getCommentData();
  },
  onShareAppMessage: function () {
    return {
      title: '附近家政服务',
      path: '/pages/index/index'
    }
  }
})
