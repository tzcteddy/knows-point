import activityManager from '../utils/activityManager';

export default {
  onLoad() {
    // 页面加载时检查是否需要显示活动弹框
    const currentPath = this.$scope.route;
    activityManager.checkPagePath(currentPath);
  }
};