<!-- src/components/NotificationContainer.vue -->
<template>
  <div class="notification-container">
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :title="notification.title"
      :message="notification.message"
      :type="notification.type"
      :duration="notification.duration"
      :auto-close="notification.autoClose"
      @close="removeNotification(notification.id)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Notification from './Notification.vue';
import { notificationService } from '../services/notification-service';

const notifications = computed(() => {
  return notificationService.getNotifications();
});

function removeNotification(id) {
  notificationService.removeNotification(id);
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>