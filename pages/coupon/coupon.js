// coupon.js
var app = getApp()
Page({
  data: {
    currentTab: 0,
    coupons: []
  },

  // 切换标签
  switchTab: function(e) {
    var tab = e.currentTarget.dataset.tab
    this.setData({
      currentTab: tab
    })
    // 根据标签加载不同状态的优惠券
    this.loadCouponsByStatus(tab)
  },

  // 根据状态加载优惠券
  loadCouponsByStatus: function(status) {
    // mock 数据
    var mockCoupons = [
      {
        id: 1,
        amount: 50,
        condition: 300,
        desc: '满300减50',
        expireDate: '2025-12-31',
        status: 0, // 0: 未使用, 1: 已使用, 2: 已过期
        isReceived: true
      },
      {
        id: 2,
        amount: 30,
        condition: 200,
        desc: '新用户专享优惠',
        expireDate: '2025-12-25',
        status: 0,
        isReceived: false
      },
      {
        id: 3,
        amount: 100,
        condition: 500,
        desc: '大额满减券',
        expireDate: '2025-11-30',
        status: 2,
        isReceived: true
      },
      {
        id: 4,
        amount: 20,
        condition: 100,
        desc: '日常优惠',
        expireDate: '2025-12-20',
        status: 1,
        isReceived: true
      }
    ]

    // 过滤出对应状态的优惠券
    var filteredCoupons = mockCoupons.filter(function(coupon) {
      return coupon.status === status
    })

    this.setData({
      coupons: filteredCoupons
    })
  },

  // 使用优惠券
  useCoupon: function(e) {
    var coupon = e.currentTarget.dataset.coupon
    if (coupon.status !== 0) {
      return
    }

    if (!coupon.isReceived) {
      // 领取优惠券
      this.receiveCoupon(coupon)
    } else {
      // 使用优惠券
      this.confirmUseCoupon(coupon)
    }
  },

  // 领取优惠券
  receiveCoupon: function(coupon) {
    var that = this
    // mock 请求
    wx.showLoading({
      title: '领取中...'
    })

    setTimeout(function() {
      wx.hideLoading()
      // 更新优惠券状态
      var coupons = that.data.coupons
      for (var i = 0; i < coupons.length; i++) {
        if (coupons[i].id === coupon.id) {
          coupons[i].isReceived = true
          break
        }
      }
      that.setData({
        coupons: coupons
      })
      wx.showToast({
        title: '领取成功',
        icon: 'success'
      })
    }, 1000)
  },

  // 确认使用优惠券
  confirmUseCoupon: function(coupon) {
    var that = this
    wx.showModal({
      title: '使用优惠券',
      content: '确定要使用 ' + coupon.desc + ' 优惠券吗？',
      success: function(res) {
        if (res.confirm) {
          // mock 使用请求
          wx.showLoading({
            title: '使用中...'
          })

          setTimeout(function() {
            wx.hideLoading()
            wx.showToast({
              title: '使用成功',
              icon: 'success'
            })
            // 重新加载当前标签的优惠券
            that.loadCouponsByStatus(that.data.currentTab)
          }, 1000)
        }
      }
    })
  },

  // 去领取优惠券
  goToGetCoupon: function() {
    wx.showToast({
      title: '跳转到领取页面',
      icon: 'none'
    })
    // 这里可以跳转到优惠券领取页面
  },

  onLoad: function(options) {
    // 加载初始标签的优惠券
    this.loadCouponsByStatus(this.data.currentTab)
  }
})