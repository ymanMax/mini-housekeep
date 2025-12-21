// pages/messages/index.js
import { messageRequest } from '../../api/index.js';

Page({
  data: {
    messages: [],
    messageTypes: {
      order: '订单通知',
      promotion: '优惠活动',
      system: '系统通知'
    }
  },

  onLoad: function (options) {
    this.loadMessages();
    this.startMockPush();
  },

  // 加载消息列表
  loadMessages: function () {
    messageRequest.getMessagesList().then(res => {
      if (res.code === 'success') {
        this.setData({
          messages: res.data
        });
      }
    }).catch(err => {
      console.error('加载消息失败:', err);
    });
  },

  // 标记消息为已读
  markAsRead: function (e) {
    const messageId = e.currentTarget.dataset.id;
    messageRequest.markMessageAsRead(messageId).then(res => {
      if (res.code === 'success') {
        // 更新本地数据
        const updatedMessages = this.data.messages.map(msg => {
          if (msg.id === messageId) {
            return { ...msg, isRead: true };
          }
          return msg;
        });
        this.setData({
          messages: updatedMessages
        });
        wx.showToast({
          title: '已标记为已读',
          icon: 'success'
        });
      }
    }).catch(err => {
      console.error('标记已读失败:', err);
    });
  },

  // 删除消息
  deleteMessage: function (e) {
    const messageId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条消息吗？',
      success: (res) => {
        if (res.confirm) {
          messageRequest.deleteMessage(messageId).then(res => {
            if (res.code === 'success') {
              // 更新本地数据
              const updatedMessages = this.data.messages.filter(msg => msg.id !== messageId);
              this.setData({
                messages: updatedMessages
              });
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              });
            }
          }).catch(err => {
            console.error('删除消息失败:', err);
          });
        }
      }
    });
  },

  // 模拟消息推送
  startMockPush: function () {
    // 模拟每隔30秒推送一条新消息
    setInterval(() => {
      const mockNewMessage = {
        id: Date.now().toString(),
        title: '新消息提醒',
        content: '您有一条新的服务通知，请及时查看',
        type: Math.random() > 0.66 ? 'order' : Math.random() > 0.33 ? 'promotion' : 'system',
        isRead: false,
        createTime: new Date().toISOString().replace('T', ' ').substr(0, 16)
      };

      // 添加新消息到列表顶部
      this.setData({
        messages: [mockNewMessage, ...this.data.messages]
      });

      // 显示推送提示
      wx.showToast({
        title: '您有新消息',
        icon: 'none',
        duration: 2000
      });
    }, 30000);
  }
});
