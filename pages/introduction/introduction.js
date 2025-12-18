// introduction.js
const { companyRequest, commentRequest } = require('../../api/index.js');

Page({
  data: {
    currentTab: '0',
    phone: '',
    notice: '',
    details: '',
    score: '',
    commentCount: 0,
    companyInfo: {},
    commentList: []
  },
  openMap() {
    wx.openLocation({
      latitude: 23,
      longitude: 90
    })
  },
  callbtnClick() {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phone
    })
  },
  commentbtnClick() {
    wx.navigateTo({
      url: './../comment/comment'
    })
  },
  tabClick(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },
  reqData() {
    let that = this;
    //在标题栏中显示加载
    wx.showNavigationBarLoading();
    
    // 获取公司介绍信息
    companyRequest.getIntroduction()
      .then(res => {
        if (res.code === 'success') {
          var data = res.data;
          that.setData({
            companyInfo: data,
            phone: '400-123-4567',
            notice: '专业服务，品质保障',
            details: data.description,
            score: '4.8',
            commentCount: 125
          });
        }
        
        // 获取评价列表
        return commentRequest.getCommentList();
      })
      .then(res => {
        if (res.code === 'success') {
          that.setData({
            commentList: res.data
          });
        }
        
        //完成停止加载
        wx.hideNavigationBarLoading();
      })
      .catch(err => {
        console.error('获取公司介绍数据失败:', err);
        wx.showModal({
          title: '加载出错',
          content: '公司介绍数据加载失败',
          showCancel: false
        });
        wx.hideNavigationBarLoading();
      });
  },
  onLoad: function () {
    this.reqData();
  }
})
