// booking.js
import { workerRequest, bookingRequest } from '../../api/index.js';

Page({
  data: {
    date: '',
    time: '',
    datetime: '',
    amount: '',
    id: '',
    serviceName: '',
    name: '',
    phone: '',
    address: '',
    notes: '',
    workers: [],
    selectedWorker: '',
    today: '',
    maxDate: ''
  },

  chooseAddress() {
    let that = this;
    wx.chooseAddress({
      success(res) {
        console.log('address', res);
        that.setData({
          name: res.userName,
          phone: res.telNumber,
          address: res.provinceName + res.cityName + res.countyName + res.detailInfo
        })
      },
      fail(err) {
        wx.showModal({
          title: err.errMsg,
          showCancel: false
        })
      }
    })
  },

  formSubmit(e) {
    console.log(e.detail.value);
    let data = e.detail.value;

    // 验证必要信息
    if (!data.name || !data.name.length) {
      wx.showModal({
        title: '姓名不能为空',
        showCancel: false
      })
      return;
    }
    if (!data.phone || !data.phone.length) {
      wx.showModal({
        title: '电话不能为空',
        showCancel: false
      })
      return;
    }
    if (!data.address || !data.address.length) {
      wx.showModal({
        title: '地址不能为空',
        showCancel: false
      })
      return;
    }
    if (!this.data.selectedWorker) {
      wx.showModal({
        title: '请选择服务人员',
        showCancel: false
      })
      return;
    }

    // 创建预约数据
    const bookingData = {
      serviceId: this.data.id,
      serviceName: this.data.serviceName,
      serviceTime: `${this.data.date} ${this.data.time}`,
      amount: this.data.amount,
      workerId: this.data.selectedWorker,
      workerName: this.data.workers.find(w => w.id === this.data.selectedWorker).name,
      customerInfo: {
        name: data.name,
        phone: data.phone,
        address: data.address
      },
      notes: data.notes
    };

    wx.showLoading({
      title: '正在预约...',
      mask: true
    });

    // 创建预约
    bookingRequest.createBooking(bookingData)
      .then(res => {
        if (res.code === "success") {
          console.log('预约成功:', res.data);

          // 发送预约通知
          return bookingRequest.sendNotification({
            bookingId: res.data.id,
            userId: 'currentUser',
            workerId: bookingData.workerId
          });
        } else {
          throw new Error(res.message);
        }
      })
      .then(notificationRes => {
        wx.hideLoading();
        wx.showModal({
          title: '预约成功',
          content: `已成功预约${this.data.serviceName}，服务人员${this.data.workers.find(w => w.id === this.data.selectedWorker).name}将在${this.data.date} ${this.data.time}为您服务`,
          showCancel: false,
          success: function() {
            wx.navigateBack({
              delta: 2
            });
          }
        });
      })
      .catch(err => {
        wx.hideLoading();
        console.error('预约失败:', err);
        wx.showModal({
          title: '预约失败',
          content: '网络错误，请稍后重试',
          showCancel: false
        });
      });
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },

  selectWorker: function(e) {
    this.setData({
      selectedWorker: e.currentTarget.dataset.workerid
    });
  },

  loadWorkers: function() {
    let that = this;
    workerRequest.getWorkerList()
      .then(res => {
        if (res.code === "success") {
          that.setData({
            workers: res.data
          });
        }
      })
      .catch(err => {
        console.error('获取服务人员列表失败:', err);
      });
  },

  getDateTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0');

    // 设置今天和最大预约日期（3个月后）
    let maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    let maxYear = maxDate.getFullYear();
    let maxMonth = (maxDate.getMonth() + 1).toString().padStart(2, '0');
    let maxDay = maxDate.getDate().toString().padStart(2, '0');

    return {
      date: `${year}-${month}-${day}`,
      time: '09:00',
      today: `${year}-${month}-${day}`,
      maxDate: `${maxYear}-${maxMonth}-${maxDay}`
    };
  },

  onLoad: function (options) {
    console.log('预约页面参数:', options);
    this.setData({
      id: options.id,
      amount: options.amount || 0,
      serviceName: decodeURIComponent(options.serviceName) || ''
    });

    // 初始化日期和时间
    let dateTime = this.getDateTime();
    this.setData({
      date: dateTime.date,
      time: dateTime.time,
      today: dateTime.today,
      maxDate: dateTime.maxDate
    });

    // 加载服务人员列表
    this.loadWorkers();
  },

  onShareAppMessage: function () {
    return {
      title: '附近家政服务',
      path: '/pages/index/index'
    }
  }
})
