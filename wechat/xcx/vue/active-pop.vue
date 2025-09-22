<template>
  <view class="activity-popup" v-if="showPopup">
    <view class="popup-mask" @tap="closePopup"></view>
    <view class="popup-content">
      <image :src="activityData.imageUrl" mode="aspectFit" class="activity-image"></image>
      <view class="popup-close" @tap="closePopup">×</view>
      <button class="popup-button" @tap="handleActivityClick">立即参与</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false,
      activityData: {},
      callback: null
    };
  },
  methods: {
    // 显示弹框
    show(options) {
      this.activityData = options.activityData || {};
      this.callback = options.callback || null;
      this.showPopup = true;
    },
    
    // 关闭弹框
    closePopup() {
      this.showPopup = false;
    },
    
    // 处理活动点击
    handleActivityClick() {
      if (this.callback && typeof this.callback === 'function') {
        this.callback(this.activityData);
      }
      this.closePopup();
    }
  }
};
</script>

<style scoped>
.activity-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: relative;
  width: 85%;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  z-index: 10;
}

.activity-image {
  width: 100%;
  height: 400rpx;
}

.popup-close {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 50rpx;
  height: 50rpx;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36rpx;
}

.popup-button {
  margin: 30rpx;
  background: #ff6b6b;
  color: #fff;
}
</style>