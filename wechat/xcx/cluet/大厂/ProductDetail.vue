<!-- ProductDetail.vue -->
<template>
  <div>
    <h1>商品详情</h1>
    <!-- 商品内容 -->
    
    <!-- 活动弹框 -->
    <el-dialog 
      v-if="activeModal" 
      :title="activeModal.title"
      v-model="modalVisible"
      @close="dismissActiveModal"
    >
      <p>{{ activeModal.content }}</p>
      <template #footer>
        <el-button @click="dismissActiveModal">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useActivity } from '@/composables/useActivity'
import { onMounted } from 'vue'

const { 
  currentActivity, 
  activeModal, 
  recordOpportunity, 
  dismissActiveModal 
} = useActivity()

const modalVisible = computed(() => !!activeModal.value)

onMounted(() => {
  // 页面加载完成后记录商机
  recordOpportunity({
    productId: route.params.id as string
  })
})
</script>