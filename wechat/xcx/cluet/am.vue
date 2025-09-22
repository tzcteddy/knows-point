<!-- 对于B类和C类活动弹框： -->
<script setup>
import { activityTracker } from '@/utils/activity-tracker'
import { onMounted } from 'vue'

const props = defineProps({
  activityType: {
    type: String,
    required: true,
    validator: (val) => ['B', 'C'].includes(val)
  },
  activityId: {
    type: String,
    required: true
  }
})

onMounted(() => {
  // 只有当当前没有更高优先级活动时才记录
  const priority = props.activityType === 'B' ? 2 : 1
  activityTracker.setCurrentActivity({
    type: props.activityType,
    id: props.activityId,
    priority,
    timestamp: Date.now()
  })
})

// 获取当前应该记录的活动
function getTrackedActivity() {
  return activityTracker.getCurrentActivity()
}
</script>