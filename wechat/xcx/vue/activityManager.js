// 活动管理工具类
class ActivityManager {
  constructor() {
    this.activityConfig = null; // 活动配置
    this.popupComponent = null; // 弹框组件引用
    this.shownActivities = new Set(); // 已显示的活动ID集合
  }

  // 初始化活动管理器
  init(popupComponent) {
    this.popupComponent = popupComponent;
    this.fetchActivityConfig();
  }

  // 从后端获取活动配置
  async fetchActivityConfig() {
    try {
      const res = await wx.request({
        url: 'https://your-api.com/activity/config',
        method: 'GET'
      });
      
      if (res.statusCode === 200 && res.data.success) {
        this.activityConfig = res.data.data;
      }
    } catch (error) {
      console.error('获取活动配置失败:', error);
    }
  }

  // 检查当前页面是否需要显示活动弹框
  checkPagePath(path) {
    if (!this.activityConfig || !this.popupComponent) return;
    
    const { activities } = this.activityConfig;
    if (!activities || !activities.length) return;
    
    // 查找匹配当前页面路径的活动
    const matchedActivity = activities.find(activity => {
      // 检查是否匹配路径
      const isPathMatch = activity.targetPaths.some(targetPath => {
        // 支持精确匹配和通配符匹配
        if (targetPath === path) return true;
        if (targetPath.endsWith('*')) {
          const prefix = targetPath.slice(0, -1);
          return path.startsWith(prefix);
        }
        return false;
      });
      
      // 检查活动是否未过期且未显示过
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
  showActivityPopup(activityData) {
    if (!this.popupComponent) return;
    
    this.popupComponent.show({
      activityData,
      callback: (data) => {
        // 记录已显示的活动
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

// 导出单例
export default new ActivityManager();