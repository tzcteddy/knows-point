// router/activity-interceptor.ts
import { activityContextManager } from '@/activity-context-manager'
import { RouteLocationNormalized } from 'vue-router'

// 活动类型配置
const ACTIVITY_CONFIG = {
  A: { priority: 100, source: 'campaign' as const },
  B: { priority: 50, source: 'referral' as const },
  C: { priority: 25, source: 'direct' as const }
}

class ActivityRouteInterceptor {
  // 路由前置守卫
  beforeRouteEnter(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    // 检查是否为A类活动页面
    if (this.isActivityPage(to, 'A')) {
      const activityId = to.query.activityId as string
      if (activityId) {
        activityContextManager.setContext({
          id: activityId,
          type: 'A',
          priority: ACTIVITY_CONFIG.A.priority,
          source: ACTIVITY_CONFIG.A.source,
          entryTime: Date.now(),
          metadata: {
            page: to.name,
            query: to.query
          }
        }, { force: true }) // 强制设置A类活动
      }
    }
    
    // 处理从A类活动页跳转到商品详情页的情况
    if (this.isActivityPage(from, 'A') && this.isProductDetailPage(to)) {
      // 保持A类活动上下文不变，但记录跳转信息
      const currentContext = activityContextManager.getCurrentContext()
      if (currentContext) {
        // 可以在这里添加跳转日志
        this.logActivityTransition(currentContext, to)
      }
    }
    
    // 检查URL参数中的活动信息
    this.handleUrlActivityParams(to)
    
    return true
  }

  // 路由更新守卫
  beforeRouteUpdate(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    // 处理同页面不同参数的情况
    this.handleUrlActivityParams(to)
    return true
  }

  // 判断是否为特定类型的活动页面
  private isActivityPage(route: RouteLocationNormalized, type: 'A' | 'B' | 'C'): boolean {
    // 根据实际项目路由规则实现
    switch (type) {
      case 'A':
        return route.meta?.activityType === 'A' || 
               route.name?.toString().includes('campaign')
      default:
        return false
    }
  }

  // 判断是否为商品详情页
  private isProductDetailPage(route: RouteLocationNormalized): boolean {
    return route.name === 'ProductDetail' || 
           route.path.includes('/product/')
  }

  // 处理URL中的活动参数
  private handleUrlActivityParams(route: RouteLocationNormalized) {
    const { activityType, activityId } = route.query
    
    if (typeof activityType === 'string' && typeof activityId === 'string') {
      const config = ACTIVITY_CONFIG[activityType as keyof typeof ACTIVITY_CONFIG]
      if (config) {
        activityContextManager.setContext({
          id: activityId,
          type: activityType as 'A' | 'B' | 'C',
          priority: config.priority,
          source: config.source,
          entryTime: Date.now(),
          metadata: {
            page: route.name,
            query: route.query
          }
        })
      }
    }
  }

  // 记录活动转换日志
  private logActivityTransition(context: any, to: RouteLocationNormalized) {
    // 实现日志记录逻辑
    console.log('Activity transition:', {
      fromActivity: context,
      toPage: to.name,
      timestamp: Date.now()
    })
  }
}

export const activityRouteInterceptor = new ActivityRouteInterceptor()