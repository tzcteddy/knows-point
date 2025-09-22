import activityManager from './utils/activityManager';
import activityPopupMixin from './mixins/activityPopup';

App({
  onLaunch: function() {
    // 注册全局混入
    this.registerGlobalMixin();
  },
  
  // 注册全局混入
  registerGlobalMixin() {
    const app = this;
    const originalPage = Page;
    
    Page = function(options) {
      // 合并混入到页面选项
      options = {
        ...options,
        ...activityPopupMixin
      };
      
      return originalPage(options);
    };
  },
  
  // 设置活动弹框组件引用
  setActivityPopupComponent(component) {
    activityManager.init(component);
  },
  
  globalData: {
    userInfo: null
  }
});