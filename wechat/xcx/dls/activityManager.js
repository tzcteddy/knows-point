const globalPopupManager = require('./globalPopupManager');

class ActivityManager {
  constructor() {
    this.activityConfig = null;
    this.shownActivities = new Set();
    this.init();
  }

  // 初始化
  async init() {
    this.fetchActivityConfig();
    // 注册页面跳转监听
    this.registerPageListener();
  }

  // 从后端获取活动配置
  fetchActivityConfig() {
    wx.request({
      url: 'https://your-api.com/activity/config',
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200 && res.data.success) {
          this.activityConfig = res.data.data;
          // 配置加载完成后，检查当前页面
          this.checkCurrentPage();
        }
      },
      fail: (error) => {
        console.error('获取活动配置失败:', error);
      }
    });
  }

  // 注册页面跳转监听
  registerPageListener() {
    // 封装公共的页面跳转后处理逻辑
    const wrapPageNavigation = (originalMethod) => {
      return function(options) {
        const result = originalMethod.call(this, options);
        setTimeout(() => {
          getApp().activityManager.checkCurrentPage();
        }, 500);
        return result;
      };
    };

    // 重写各种页面跳转方法
    wx.navigateTo = wrapPageNavigation(wx.navigateTo);
    wx.switchTab = wrapPageNavigation(wx.switchTab);
    wx.redirectTo = wrapPageNavigation(wx.redirectTo);
    wx.reLaunch = wrapPageNavigation(wx.reLaunch);
    wx.navigateBack = wrapPageNavigation(wx.navigateBack);
  }

  // 检查当前页面
  checkCurrentPage() {
    if (!this.activityConfig) return;

    const pages = getCurrentPages();
    if (pages.length === 0) {
      // 页面栈为空，添加重试机制
      this.retryCheckCurrentPage();
      return;
    }

    const currentPage = pages[pages.length - 1];
    const currentPath = currentPage.route;

    this.checkPagePath(currentPath);
  }

  // 重试检查当前页面
  retryCheckCurrentPage(retryCount = 0) {
    // 设置最大重试次数为5次
    const MAX_RETRY = 5;
    if (retryCount >= MAX_RETRY) {
      console.log('达到最大重试次数，停止检查页面');
      return;
    }

    // 每次重试延迟时间递增，从100ms开始
    const delay = 100 * (retryCount + 1);
    setTimeout(() => {
      const pages = getCurrentPages();
      if (pages.length > 0) {
        // 页面栈不为空了，执行检查
        const currentPage = pages[pages.length - 1];
        const currentPath = currentPage.route;
        this.checkPagePath(currentPath);
      } else {
        // 继续重试
        this.retryCheckCurrentPage(retryCount + 1);
      }
    }, delay);
  }

  // 检查页面路径是否匹配活动
  checkPagePath(path) {
    if (!this.activityConfig) return;

    const { activities } = this.activityConfig;
    if (!activities || !activities.length) return;

    const matchedActivity = activities.find(activity => {
      // 路径匹配逻辑
      const isPathMatch = activity.targetPaths.some(targetPath => {
        if (targetPath === path) return true;
        if (targetPath.endsWith('*')) {
          const prefix = targetPath.slice(0, -1);
          return path.startsWith(prefix);
        }
        return false;
      });

      // 时间和显示状态检查
      const now = Date.now();
      const isNotExpired = now >= new Date(activity.startTime).getTime() && 
                          now <= new Date(activity.endTime).getTime();
      const isNotShown = !this.shownActivities.has(activity.id);

      return isPathMatch && isNotExpired && isNotShown;
    });

    if (matchedActivity) {
      this.showActivityPopup(matchedActivity);
    }
  }

  // 显示活动弹框
  async showActivityPopup(activityData) {
    const popupComponent = await globalPopupManager.getPopupInstance();
    if (!popupComponent) {
      console.error('无法获取弹框组件实例');
      return;
    }

    popupComponent.show({
      activityData,
      callback: (data) => {
        this.shownActivities.add(data.id);
        // 处理活动点击逻辑
        if (data.linkType === 'miniprogram') {
          wx.navigateTo({
            url: data.linkUrl
          });
        } else if (data.linkType === 'webview') {
          wx.navigateTo({
            url: `/pages/webview/webview?url=${encodeURIComponent(data.linkUrl)}`
          });
        }
      }
    });
  }
}

export default new ActivityManager();