// userInfo.js
var app = getApp()
const { userRequest } = require('../../api/index.js');

Page({
  data: {
    userInfo: {},
    name: '',
    sex: '0',
    phone: '',
    address: '',
    intro: ''
  },
  sexChange(e) {
    console.log(e.detail.value);
    this.setData({
      sex: e.detail.value
    })
  },
  reqData() {
    var that = this;
    userRequest.getUserInfo()
      .then(res => {
        if (res.code === 'success') {
          var data = res.data;
          that.setData({
            name: data.name || that.data.userInfo.nickName,
            sex: data.sex || '0',
            phone: data.phone || '',
            address: data.address || '',
            intro: data.intro || ''
          });
        }
      })
      .catch(err => {
        console.error('获取用户信息失败:', err);
        wx.showModal({
          title: '加载出错',
          content: '用户信息加载失败',
          showCancel: false
        });
      });
  },
  formSubmit(e) {
    console.log(e.detail.value)
    let data = e.detail.value;
  },
  onLoad: function () {
    let that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    this.reqData();
  }
})