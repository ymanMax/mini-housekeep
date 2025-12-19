import {
  mockDelay,
  bannerData,
  serviceData,
  detailListData,
  detailInfoData,
  userInfoData,
  orderListData,
  commentData,
  introductionData,
  workerData,
  bookingNotificationData
} from './mockData.js';

// 首页相关请求
export const homeRequest = {
  // 获取轮播图数据
  getBannerList() {
    return mockDelay(bannerData);
  },

  // 获取服务列表
  getServiceList() {
    return mockDelay(serviceData);
  }
};

// 服务详情相关请求
export const serviceRequest = {
  // 获取服务详情列表
  getDetailList(serviceId) {
    const filteredData = {
      code: "success",
      data: detailListData.data.filter(item => item.serviceId === serviceId)
    };
    return mockDelay(filteredData);
  },

  // 获取服务详情信息
  getDetailInfo(detailId) {
    const detailInfo = detailInfoData.data;
    detailInfo.id = detailId;
    return mockDelay({
      code: "success",
      data: detailInfo
    });
  }
};

// 用户相关请求
export const userRequest = {
  // 获取用户信息
  getUserInfo() {
    return mockDelay(userInfoData);
  },

  // 更新用户信息
  updateUserInfo(userData) {
    return mockDelay({
      code: "success",
      message: "用户信息更新成功",
      data: userData
    });
  }
};

// 订单相关请求
export const orderRequest = {
  // 获取订单列表
  getOrderList() {
    return mockDelay(orderListData);
  },

  // 创建订单
  createOrder(orderData) {
    const newOrder = {
      id: `2024${Math.random().toString().substr(2, 5)}`,
      ...orderData,
      status: "pending",
      createTime: new Date().toISOString().split('T')[0]
    };
    
    return mockDelay({
      code: "success",
      message: "订单创建成功",
      data: newOrder
    });
  },

  // 取消订单
  cancelOrder(orderId) {
    return mockDelay({
      code: "success",
      message: "订单取消成功",
      data: { orderId }
    });
  }
};

// 评价相关请求
export const commentRequest = {
  // 获取评价列表
  getCommentList() {
    return mockDelay(commentData);
  },

  // 提交评价
  submitComment(commentData) {
    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      ...commentData,
      createTime: new Date().toISOString().split('T')[0]
    };
    
    return mockDelay({
      code: "success",
      message: "评价提交成功",
      data: newComment
    });
  }
};

// 服务人员相关请求
export const workerRequest = {
  // 获取服务人员列表
  getWorkerList() {
    return mockDelay(workerData);
  },

  // 获取单个服务人员详情
  getWorkerDetail(workerId) {
    const worker = workerData.data.find(item => item.id === workerId);
    return mockDelay({
      code: "success",
      data: worker
    });
  }
};

// 预约相关请求
export const bookingRequest = {
  // 创建预约
  createBooking(bookingData) {
    const newBooking = {
      id: `booking${Math.random().toString().substr(2, 6)}`,
      ...bookingData,
      status: "confirmed",
      createTime: new Date().toISOString()
    };

    return mockDelay({
      code: "success",
      message: "预约成功",
      data: newBooking
    });
  },

  // 发送预约通知
  sendNotification(notificationData) {
    return mockDelay(bookingNotificationData);
  }
};

// 公司介绍相关请求
export const companyRequest = {
  // 获取公司介绍
  getIntroduction() {
    return mockDelay(introductionData);
  }
};

export default {
  homeRequest,
  serviceRequest,
  userRequest,
  orderRequest,
  commentRequest,
  companyRequest,
  workerRequest,
  bookingRequest
};