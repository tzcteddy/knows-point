// activity-tracker.ts
interface ActivityInfo {
  type: 'A' | 'B' | 'C'
  id: string
  priority: number
  timestamp: number
}

class ActivityTracker {
  private currentActivity: ActivityInfo | null = null
  private activityStack: ActivityInfo[] = []

  // 设置当前活动（遵循优先级规则）
  setCurrentActivity(activity: ActivityInfo) {
    if (!this.currentActivity || activity.priority > this.currentActivity.priority) {
      this.currentActivity = activity
    }
    this.activityStack.push(activity)
  }

  // 获取当前应该记录的活动
  getCurrentActivity(): ActivityInfo | null {
    return this.currentActivity
  }

  // 页面跳转时调用，清理过期活动
  onNavigation() {
    // 可以根据需要清理活动栈
  }

  // 重置活动链路
  reset() {
    this.currentActivity = null
    this.activityStack = []
  }
}

export const activityTracker = new ActivityTracker()