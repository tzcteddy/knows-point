// services/opportunity-tracker.ts
import { activityContextManager } from '@/activity-context-manager'

interface OpportunityRecord {
  activityId: string
  activityType: string
  productId?: string
  userId?: string
  timestamp: number
  pageUrl: string
  referrer?: string
  userAgent: string
  metadata?: Record<string, any>
}

class OpportunityTracker {
  private trackingQueue: OpportunityRecord[] = []
  private isSending = false
  private sendTimer: number | null = null

  // 记录商机
  recordOpportunity(options: {
    productId?: string
    metadata?: Record<string, any>
  } = {}) {
    const currentContext = activityContextManager.getCurrentContext()
    
    if (!currentContext) {
      console.warn('No activity context found, skipping opportunity record')
      return
    }

    const record: OpportunityRecord = {
      activityId: currentContext.id,
      activityType: currentContext.type,
      productId: options.productId,
      userId: this.getCurrentUserId(),
      timestamp: Date.now(),
      pageUrl: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      metadata: {
        ...currentContext.metadata,
        ...options.metadata
      }
    }

    this.trackingQueue.push(record)
    this.scheduleSend()
  }

  // 定时发送商机记录
  private scheduleSend() {
    if (this.sendTimer) {
      clearTimeout(this.sendTimer)
    }

    this.sendTimer = window.setTimeout(() => {
      this.sendTrackingData()
    }, 1000) // 批量发送，减少请求次数
  }

  // 发送追踪数据
  private async sendTrackingData() {
    if (this.isSending || this.trackingQueue.length === 0) {
      return
    }

    this.isSending = true
    const recordsToSend = [...this.trackingQueue]
    this.trackingQueue = []

    try {
      // 发送到后端API
      await fetch('/api/opportunity/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: recordsToSend
        })
      })

      console.log(`Successfully sent ${recordsToSend.length} opportunity records`)
    } catch (error) {
      console.error('Failed to send opportunity records', error)
      // 发送失败，重新加入队列
      this.trackingQueue.unshift(...recordsToSend)
    } finally {
      this.isSending = false
      // 如果还有未发送的数据，继续调度
      if (this.trackingQueue.length > 0) {
        this.scheduleSend()
      }
    }
  }

  // 获取当前用户ID
  private getCurrentUserId(): string | undefined {
    // 根据实际项目实现获取用户ID的逻辑
    return undefined
  }

  // 立即发送所有待发送数据
  flush() {
    if (this.sendTimer) {
      clearTimeout(this.sendTimer)
    }
    this.sendTrackingData()
  }
}

export const opportunityTracker = new OpportunityTracker()