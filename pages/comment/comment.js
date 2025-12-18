//comment.js
const { commentRequest } = require('../../api/index.js');

Page({
  data: {
    imageList: [],
    uploading: false
  },
  addImage() {
    let that = this;
    this.setData({
      uploading: true
    })
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var filePaths = that.data.imageList.concat(tempFilePaths);
        that.setData({
          imageList: filePaths
        })
      },
      complete: function (res) {
        that.setData({
          uploading: false
        })
      }
    })
  },
  deleteImage(e) {
    let delSrc = e.currentTarget.dataset.src;
    let imageList = this.data.imageList;
    imageList.splice(imageList.indexOf(delSrc), 1);
    this.setData({
      imageList: imageList
    });
  },
  formSubmit(e) {
    console.log(e.detail.value);
    let data = e.detail.value;
    if (!data.content.length) {
      wx.showModal({
        title: '说点什么吧',
        showCancel: false
      })
      return;
    }
    
    let imageList = this.data.imageList;
    let that = this;
    
    // 模拟上传图片（mock模式下直接使用本地路径）
    if (!this.data.uploading && imageList.length) {
      console.log('模拟上传图片:', imageList);
    }
    
    // 使用mock API提交评价
    wx.showLoading({
      title: '提交中...',
    });
    
    const commentData = {
      score: data.score || 5,
      content: data.content,
      images: imageList,
      serviceName: '家政服务',
      userName: '用户'
    };
    
    commentRequest.submitComment(commentData)
      .then(res => {
        wx.hideLoading();
        if (res.code === 'success') {
          wx.showModal({
            title: '提交成功',
            content: '感谢您的评价！',
            showCancel: false,
            success: function() {
              wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
              });
            }
          });
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.error('提交评价失败:', err);
        wx.showModal({
          title: '提交失败',
          content: '评价提交失败，请重试',
          showCancel: false
        });
      });
  },
  onLoad: function () {
  }
})
