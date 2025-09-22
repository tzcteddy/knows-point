// utils/url-params.ts
// 在A类活动页跳转到详情页时，携带活动信息
function navigateToProductDetail(productId, activityInfo) {
  const query = {
    productId,
    fromActivity: activityInfo.type,
    activityId: activityInfo.id,
    activityPriority: activityInfo.priority
  }
  
  router.push({ name: 'ProductDetail', query })
}

// 在详情页接收活动信息
function handleActivityFromUrl() {
  const { fromActivity, activityId, activityPriority } = route.query
  
  if (fromActivity && activityId) {
    activityTracker.setCurrentActivity({
      type: fromActivity,
      id: activityId,
      priority: parseInt(activityPriority),
      timestamp: Date.now()
    })
  }
}