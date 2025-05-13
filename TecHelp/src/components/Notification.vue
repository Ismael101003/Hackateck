<!-- src/components/Notification.vue -->
<template>
  <transition name="notification">
    <div v-if="show" :class="['notification', `notification-${type}`]">
      <div class="notification-title">{{ title }}</div>
      <div class="notification-message">{{ message }}</div>
      <button @click="close" class="notification-close">&times;</button>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'warning', 'error'].includes(value)
  },
  duration: {
    type: Number,
    default: 5000
  },
  autoClose: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['close']);

const show = ref(true);
let timer = null;

function close() {
  show.value = false;
  emit('close');
}

function startTimer() {
  if (props.autoClose && props.duration > 0) {
    timer = setTimeout(() => {
      close();
    }, props.duration);
  }
}

function clearTimer() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

onMounted(() => {
  startTimer();
});

watch(() => props.duration, () => {
  clearTimer();
  startTimer();
});

watch(() => props.autoClose, (newValue) => {
  if (newValue) {
    startTimer();
  } else {
    clearTimer();
  }
});
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 1rem;
  border-radius: var(--border-radius-md);
  background-color: white;
  box-shadow: var(--shadow-lg);
  z-index: 100;
  max-width: 300px;
}

.notification-success {
  border-left: 4px solid var(--color-success);
}

.notification-warning {
  border-left: 4px solid var(--color-warning);
}

.notification-error {
  border-left: 4px solid var(--color-danger);
}

.notification-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.notification-message {
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.notification-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--color-text-lighter);
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  transform: translateY(30px);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>