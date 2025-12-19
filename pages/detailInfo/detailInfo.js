// detailInfo.js
import { serviceRequest } from '../../api/index.js';

Page({
  data: {
    detail: '',
    images: [],
    amount: 0,
    id: '',
    count: 0,
    serviceName: '',
    price: 0
  },
  sendbtnClick() {
    let that = this;
    wx.navigateTo({
      url: './../booking/booking?id=' + that.data.id +
           '&serviceName=' + encodeURIComponent(that.data.serviceName) +
           '&amount=' + that.data.amount +
           '&price=' + that.data.price,
    })
  },
  reqData() {
    var that = this;
    serviceRequest.getDetailInfo(that.data.id)
      .then(res => {
        if (res.code === "success") {
          let data = res.data;
          let price = parseInt(data.price.replace('元/天', ''));
          let amount = price * that.data.count;
          that.setData({
            detail: data.detail,
            images: data.images || [],
            amount: amount,
            serviceName: data.title,
            price: price,
            serviceContent: data.serviceContent || [],
            serviceProcess: data.serviceProcess || [],
            precautions: data.precautions || []
          });
          console.log('服务详情数据加载成功:', that.data);
        }
      })
      .catch(err => {
        console.error('获取服务详情失败:', err);
        wx.showModal({
          title: '加载出错',
          showCancel: false
        });
      });
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
      count: options.count || 1
    })
    this.reqData();
  },
  onShareAppMessage: function () {
    return {
      title: '附近家政服务',
      path: '/pages/index/index'
    }
  }
})