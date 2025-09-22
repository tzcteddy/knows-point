const activityManager = require('./utils/activityManager');

App({
  onLaunch: function() {
    // 初始化活动管理器
    this.activityManager = activityManager;
  },

  // 在全局App实例中提供获取弹框组件的方法
  getActivityPopup() {
    return this.activityPopup;
  },

  setActivityPopup(popup) {
    this.activityPopup = popup;
  },

  globalData: {
    userInfo: null
  }
});