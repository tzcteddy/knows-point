// components/activity-modal-manager.ts
import { activityContextManager } from '@/activity-context-manager'
import { ref, onMounted, onUnmounted } from 'vue'

interface ActivityModalConfig {
  id: string
  type: 'B' | 'C'
  priority: number
  title: string
  content: string
  showDuration?: number // 弹框展示时长
}

class ActivityModalManager {
  private modals: ActivityModalConfig[] = []
  private activeModal = ref<ActivityModalConfig | null>(null)
  private timer: number | null = null

  constructor() {
    // 监听活动上下文变化
    activityContextManager.addListener(this.handleContextChange.bind(this))
  }

  // 注册活动弹框
  registerModal(modal: ActivityModalConfig) {
    this.modals.push(modal)
    this.evaluateActiveModal()
  }

  // 注销活动弹框
  unregisterModal(modalId: string) {
    this.modals = this.modals.filter(m => m.id !== modalId)
    if (this.activeModal.value?.id === modalId) {
      this.dismissActiveModal()
    }
  }

  // 评估应该展示的活动弹框
  private evaluateActiveModal() {
    // 如果当前有A类活动，不展示B/C类弹框
    const currentContext = activityContextManager.getCurrentContext()
    if (currentContext?.type === 'A') {
      this.dismissActiveModal()
      return
    }

    // 按优先级排序，找到最高优先级的弹框
    const sortedModals = [...this.modals].sort((a, b) => b.priority - a.priority)
    const highestPriorityModal = sortedModals[0]

    if (highestPriorityModal && 
        (!this.activeModal.value || 
         highestPriorityModal.priority > this.activeModal.value.priority)) {
      this.showModal(highestPriorityModal)
    }
  }

  // 展示弹框
  private showModal(modal: ActivityModalConfig) {
    this.dismissActiveModal()
    this.activeModal.value = modal
    
    // 设置自动关闭定时器
    if (modal.showDuration) {
      this.timer = window.setTimeout(() => {
        this.dismissActiveModal()
      }, modal.showDuration)
    }
    
    // 记录该弹框为当前活动上下文
    activityContextManager.setContext({
      id: modal.id,
      type: modal.type,
      priority: modal.priority,
      source: 'direct',
      entryTime: Date.now(),
      metadata: {
        title: modal.title,
        content: modal.content
      }
    })
  }

  // 关闭当前弹框
  dismissActiveModal() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    this.activeModal.value = null
  }

  // 获取当前活动弹框
  getActiveModal() {
    return this.activeModal
  }

  // 处理活动上下文变化
  private handleContextChange(context: any) {
    // 如果当前上下文变为了A类活动，关闭所有弹框
    if (context?.type === 'A') {
      this.dismissActiveModal()
    }
  }

  // 清理资源
  destroy() {
    activityContextManager.removeListener(this.handleContextChange.bind(this))
    this.dismissActiveModal()
  }
}

export const activityModalManager = new ActivityModalManager()