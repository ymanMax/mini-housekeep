//index.js
//获取应用实例
var app = getApp()
const { homeRequest } = require('../../api/index.js');

Page({
    data: {
        serviceList: [],
        bannerList: []
    },
    reqBannerData() {
        var that = this;
        homeRequest.getBannerList()
          .then(res => {
            if (res.code === 'success') {
              var bannerList = res.data;
              console.log('轮播图数据:', bannerList);   
              that.setData({
                bannerList: bannerList,
                loading: true
              });
            }
          })
          .catch(err => {
            console.error('获取轮播图数据失败:', err);
            wx.showModal({
              title: '加载出错',
              content: '轮播图数据加载失败',
              showCancel: false
            });
          });
    },
    reqData() {
        var that = this;
        homeRequest.getServiceList()
          .then(res => {
            if (res.code === 'success') {
              var serviceList = res.data;
              console.log('服务列表数据:', serviceList.length);
              that.setData({
                serviceList: serviceList,
                loading: true
              });
            }
          })
          .catch(err => {
            console.error('获取服务列表数据失败:', err);
            wx.showModal({
              title: '加载出错',
              content: '服务列表数据加载失败',
              showCancel: false
            });
          });
    },
    onLoad: function () {
        console.log('onLoad');
        // wx.setNavigationBarTitle({
        //     title: '服务下单'
        // })
        // wx.showToast({
        //     title: '正在加载中',
        //     icon: 'loading',
        //     duration: 500
        // })
        var that = this;

        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            // that.setData({
            //     userInfo: userInfo
            // })
            console.log(userInfo);
        });
        var that = this;
        that.reqBannerData();
        that.reqData();
    },
    onShareAppMessage: function () {
        return {
            title: '附近家政服务',
            path: '/pages/index/index'
        }
    }
})