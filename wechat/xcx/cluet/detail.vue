<!--商品详情页需要处理活动弹框的展示和商机记录-->
<script setup>
import { activityTracker } from '@/utils/activity-tracker'
import { onMounted } from 'vue'

const route = useRoute()

onMounted(() => {
  // 检查是否有B类或C类活动需要展示
  checkAndShowActivityModal()
  
  // 记录当前应该追踪的商机
  const trackedActivity = activityTracker.getCurrentActivity()
  if (trackedActivity) {
    // 发送商机记录请求
    recordBusinessOpportunity(trackedActivity)
  }
})

function checkAndShowActivityModal() {
  // 根据商品信息检查是否有B类或C类活动
  const activities = checkProductActivities(route.params.productId)
  
  // 按优先级排序，展示最高优先级的活动弹框
  const highestPriorityActivity = activities.sort((a, b) => b.priority - a.priority)[0]
  
  if (highestPriorityActivity) {
    // 显示活动弹框
    showActivityModal(highestPriorityActivity)
  }
}

function recordBusinessOpportunity(activity) {
  // 上报商机记录
  api.recordOpportunity({
    activityType: activity.type,
    activityId: activity.id,
    productId: route.params.productId,
    timestamp: activity.timestamp
  })
}
</script>