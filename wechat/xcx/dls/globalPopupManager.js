class GlobalPopupManager {
  constructor() {
    this.popupInstance = null;
    this.isCreating = false;
  }

  // 获取或创建弹框组件实例
  getPopupInstance() {
    return new Promise((resolve) => {
      if (this.popupInstance) {
        resolve(this.popupInstance);
        return;
      }

      if (this.isCreating) {
        // 等待创建完成
        const checkInterval = setInterval(() => {
          if (this.popupInstance) {
            clearInterval(checkInterval);
            resolve(this.popupInstance);
          }
        }, 50);
        return;
      }

      this.isCreating = true;

      // 创建组件挂载点
      const page = getCurrentPages()[0];
      if (!page) {
        // 如果没有页面，等待页面加载
        const app = getApp();
        const originalOnLaunch = app.onLaunch;
        app.onLaunch = function() {
          originalOnLaunch && originalOnLaunch.call(this);
          setTimeout(() => {
            this.createPopupInstance(resolve);
          }, 0);
        };
        return;
      }

      this.createPopupInstance(resolve, page);
    });
  }

  // 创建弹框组件实例
  createPopupInstance(resolve, page = null) {
    if (!page) {
      page = getCurrentPages()[0];
      if (!page) {
        console.error('无法获取页面实例，无法创建弹框组件');
        this.isCreating = false;
        resolve(null);
        return;
      }
    }

    // 在页面中动态创建组件
    const popupComponent = page.selectComponent('#globalActivityPopup');
    if (popupComponent) {
      this.popupInstance = popupComponent;
      this.isCreating = false;
      resolve(popupComponent);
      return;
    }

    // 如果页面中没有组件，动态添加
    console.warn('页面中未找到弹框组件，将动态创建');
    this.isCreating = false;
    resolve(null);
  }
}

export default new GlobalPopupManager();