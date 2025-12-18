// mini-housekeep项目mock数据

// 模拟延迟函数
export const mockDelay = (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// 轮播图数据
export const bannerData = {
  code: "success",
  data: [
    {
      id: 1,
      thumb: "/images/ad_1.jpeg",
      title: "专业家政服务",
      link: ""
    },
    {
      id: 2,
      thumb: "/images/ad_2.jpeg", 
      title: "品质生活保障",
      link: ""
    },
    {
      id: 3,
      thumb: "/images/ad_3.jpeg",
      title: "贴心服务体验",
      link: ""
    }
  ]
};

// 服务列表数据
export const serviceData = {
  code: "success",
  data: [
    {
      id: "1",
      title: "催乳月嫂",
      thumb: "/images/icon_service_1.jpg",
      description: "专业催乳师，贴心月嫂服务",
      price: "200-500元/天"
    },
    {
      id: "2",
      title: "产后修复",
      thumb: "/images/icon_service_2.jpg",
      description: "科学产后恢复，重塑美丽身材",
      price: "300-800元/次"
    },
    {
      id: "3",
      title: "美人美家",
      thumb: "/images/icon_service_3.jpg",
      description: "家居美化，打造温馨空间",
      price: "150-400元/次"
    },
    {
      id: "4",
      title: "保洁钟点",
      thumb: "/images/icon_service_4.jpg",
      description: "专业保洁，随叫随到",
      price: "50-100元/小时"
    },
    {
      id: "5",
      title: "维修安装",
      thumb: "/images/icon_service_5.jpg",
      description: "家电维修，家具安装",
      price: "80-200元/次"
    },
    {
      id: "6",
      title: "搬家运输",
      thumb: "/images/icon_service_6.jpg",
      description: "专业搬家，安全可靠",
      price: "200-800元/次"
    }
  ]
};

// 服务详情列表数据
export const detailListData = {
  code: "success",
  data: [
    {
      id: "1",
      serviceId: "1",
      title: "高级月嫂服务",
      price: "380元/天",
      duration: "全天",
      description: "专业高级月嫂，提供全方位母婴护理服务",
      features: ["新生儿护理", "产妇护理", "营养餐制作", "家务协助"]
    },
    {
      id: "2",
      serviceId: "1",
      title: "普通月嫂服务",
      price: "280元/天",
      duration: "8小时",
      description: "基础月嫂服务，满足基本母婴护理需求",
      features: ["新生儿护理", "产妇基础护理", "简单家务"]
    },
    {
      id: "3",
      serviceId: "4",
      title: "深度保洁服务",
      price: "80元/小时",
      duration: "3小时起",
      description: "彻底清洁，让家焕然一新",
      features: ["全屋清洁", "厨房深度清洁", "卫生间消毒", "玻璃清洁"]
    }
  ]
};

// 服务详情数据
export const detailInfoData = {
  code: "success",
  data: {
    id: "1",
    title: "高级月嫂服务",
    price: "380元/天",
    originalPrice: "480元/天",
    duration: "全天服务",
    serviceContent: [
      "新生儿日常护理（喂养、洗澡、抚触）",
      "产妇产后恢复指导",
      "营养月子餐制作",
      "母婴用品清洁消毒",
      "简单家务协助"
    ],
    serviceProcess: [
      "预约确认服务时间",
      "上门服务前沟通需求",
      "按计划提供服务",
      "服务结束满意度调查"
    ],
    precautions: [
      "需提前3天预约",
      "服务期间请提供基本食宿",
      "贵重物品请自行保管"
    ]
  }
};

// 用户信息数据
export const userInfoData = {
  code: "success",
  data: {
    id: "1001",
    name: "张女士",
    phone: "138****5678",
    avatar: "/images/icon.png",
    level: "VIP会员",
    points: 1250,
    balance: 568.50,
    coupons: 3,
    orderCount: 15,
    serviceCount: 8
  }
};

// 订单列表数据
export const orderListData = {
  code: "success",
  data: [
    {
      id: "20240115001",
      serviceName: "深度保洁服务",
      serviceTime: "2024-01-15 14:00",
      status: "completed",
      price: "240元",
      address: "北京市朝阳区xxx小区",
      worker: "李师傅"
    },
    {
      id: "20240110001",
      serviceName: "高级月嫂服务",
      serviceTime: "2024-01-10 09:00",
      status: "in_progress",
      price: "380元/天",
      address: "北京市海淀区xxx小区",
      worker: "王阿姨"
    },
    {
      id: "20240105001",
      serviceName: "维修安装服务",
      serviceTime: "2024-01-05 10:00",
      status: "pending",
      price: "120元",
      address: "北京市丰台区xxx小区",
      worker: "赵师傅"
    }
  ]
};

// 评价数据
export const commentData = {
  code: "success",
  data: [
    {
      id: "1",
      userName: "王**",
      avatar: "/images/icon_comment.jpg",
      rating: 5,
      content: "月嫂服务非常专业，对宝宝很有耐心，强烈推荐！",
      serviceName: "高级月嫂服务",
      createTime: "2024-01-12",
      images: []
    },
    {
      id: "2",
      userName: "李**",
      avatar: "/images/icon_comment.jpg",
      rating: 4,
      content: "保洁阿姨很认真，打扫得很干净，下次还会选择",
      serviceName: "深度保洁服务",
      createTime: "2024-01-08",
      images: []
    },
    {
      id: "3",
      userName: "张**",
      avatar: "/images/icon_comment.jpg",
      rating: 5,
      content: "维修师傅技术很好，很快就解决了问题",
      serviceName: "维修安装服务",
      createTime: "2024-01-05",
      images: []
    }
  ]
};

// 公司介绍数据
export const introductionData = {
  code: "success",
  data: {
    companyName: "安心家政服务有限公司",
    established: "2010年",
    employees: "200+",
    serviceArea: "全国主要城市",
    description: "专业提供高品质家政服务，拥有10年行业经验，服务超过10万家庭",
    features: [
      "专业培训的服务人员",
      "严格的服务质量把控",
      "7x24小时客服支持",
      "完善的售后服务保障"
    ]
  }
};
