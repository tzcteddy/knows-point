<template>
  <view class="container">
    <!-- 首页内容 -->
    <view class="content">
      <text>首页内容</text>
    </view>
    
    <!-- 活动弹框组件 -->
    <activity-popup ref="activityPopup"></activity-popup>
  </view>
</template>

<script>
import ActivityPopup from '../../components/activity-popup/activity-popup';

export default {
  components: {
    ActivityPopup
  },
  
  onReady() {
    // 将弹框组件引用传递给活动管理器
    const activityPopup = this.$refs.activityPopup;
    getApp().setActivityPopupComponent(activityPopup);
  }
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content {
  text-align: center;
}
</style>