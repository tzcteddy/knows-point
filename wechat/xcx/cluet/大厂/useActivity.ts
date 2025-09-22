// composables/useActivity.ts
import { activityContextManager } from '@/activity-context-manager'
import { activityModalManager } from '@/components/activity-modal-manager'
import { opportunityTracker } from '@/services/opportunity-tracker'
import { ref, onMounted, onUnmounted } from 'vue'

export function useActivity() {
  const currentActivity = ref(activityContextManager.getCurrentContext())
  const activeModal = activityModalManager.getActiveModal()

  const updateActivity = (activity: any) => {
    currentActivity.value = activity
  }

  onMounted(() => {
    activityContextManager.addListener(updateActivity)
  })

  onUnmounted(() => {
    activityContextManager.removeListener(updateActivity)
  })

  return {
    currentActivity,
    activeModal,
    recordOpportunity: (options?: { productId?: string; metadata?: Record<string, any> }) => {
      opportunityTracker.recordOpportunity(options)
    },
    registerActivityModal: (modal: any) => {
      activityModalManager.registerModal(modal)
    },
    unregisterActivityModal: (modalId: string) => {
      activityModalManager.unregisterModal(modalId)
    },
    dismissActiveModal: () => {
      activityModalManager.dismissActiveModal()
    }
  }
}