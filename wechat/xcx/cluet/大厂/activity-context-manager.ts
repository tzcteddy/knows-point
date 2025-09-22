// activity-context-manager.ts
interface ActivityContext {
  id: string
  type: 'A' | 'B' | 'C' | 'D' // 可扩展更多类型
  priority: number
  source: 'direct' | 'referral' | 'campaign'
  entryTime: number
  metadata?: Record<string, any>
}

interface ActivityStackItem {
  context: ActivityContext
  timestamp: number
}

class ActivityContextManager {
  private static instance: ActivityContextManager
  private activityStack: ActivityStackItem[] = []
  private currentContext: ActivityContext | null = null
  private listeners: Array<(context: ActivityContext | null) => void> = []

  private constructor() {
    this.initFromStorage()
  }

  static getInstance(): ActivityContextManager {
    if (!ActivityContextManager.instance) {
      ActivityContextManager.instance = new ActivityContextManager()
    }
    return ActivityContextManager.instance
  }

  // 初始化从存储中读取活动上下文
  private initFromStorage() {
    try {
      const stored = sessionStorage.getItem('activity_context')
      if (stored) {
        const parsed = JSON.parse(stored)
        this.currentContext = parsed.currentContext
        this.activityStack = parsed.activityStack
      }
    } catch (e) {
      console.warn('Failed to restore activity context from storage', e)
    }
  }

  // 持久化到存储
  private persist() {
    try {
      sessionStorage.setItem('activity_context', JSON.stringify({
        currentContext: this.currentContext,
        activityStack: this.activityStack
      }))
    } catch (e) {
      console.warn('Failed to persist activity context', e)
    }
  }

  // 设置活动上下文
  setContext(context: ActivityContext, options: { force?: boolean } = {}) {
    const { force = false } = options
    
    // 如果强制设置或当前没有上下文，或新上下文优先级更高
    if (force || !this.currentContext || context.priority > this.currentContext.priority) {
      this.currentContext = context
      this.notifyListeners()
    }
    
    // 将活动推入栈中
    this.activityStack.push({
      context,
      timestamp: Date.now()
    })
    
    // 保持栈大小在合理范围内
    if (this.activityStack.length > 50) {
      this.activityStack.shift()
    }
    
    this.persist()
  }

  // 获取当前活动上下文
  getCurrentContext(): ActivityContext | null {
    return this.currentContext
  }

  // 获取活动链路历史
  getHistory(limit: number = 10): ActivityStackItem[] {
    return this.activityStack.slice(-limit)
  }

  // 清除特定类型的活动
  clearContextByType(type: ActivityContext['type']) {
    this.activityStack = this.activityStack.filter(item => item.context.type !== type)
    if (this.currentContext?.type === type) {
      this.recalculateCurrentContext()
    }
    this.persist()
  }

  // 重新计算当前上下文（当当前上下文被清除时）
  private recalculateCurrentContext() {
    const highestPriorityItem = this.activityStack
      .slice()
      .sort((a, b) => b.context.priority - a.context.priority)[0]
    
    this.currentContext = highestPriorityItem?.context || null
    this.notifyListeners()
    this.persist()
  }

  // 添加监听器
  addListener(listener: (context: ActivityContext | null) => void) {
    this.listeners.push(listener)
  }

  // 移除监听器
  removeListener(listener: (context: ActivityContext | null) => void) {
    const index = this.listeners.indexOf(listener)
    if (index > -1) {
      this.listeners.splice(index, 1)
    }
  }

  // 通知监听器
  private notifyListeners() {
    this.listeners.forEach(listener => {
      try {
        listener(this.currentContext)
      } catch (e) {
        console.error('Error in activity context listener', e)
      }
    })
  }

  // 清除所有活动上下文
  clearAll() {
    this.currentContext = null
    this.activityStack = []
    this.notifyListeners()
    sessionStorage.removeItem('activity_context')
  }
}

export const activityContextManager = ActivityContextManager.getInstance()