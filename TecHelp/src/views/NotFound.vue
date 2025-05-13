<!-- src/views/NotFound.vue -->
<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="not-found-icon">404</div>
      <h1 class="not-found-title">Página no encontrada</h1>
      <p class="not-found-message">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <div class="not-found-actions">
        <router-link to="/" class="btn-primary">Volver al inicio</router-link>
        <button @click="goBack" class="btn-secondary">Regresar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
  router.go(-1);
}
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-background);
  padding: 1rem;
}

.not-found-content {
  text-align: center;
  max-width: 500px;
}

.not-found-icon {
  font-size: 6rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 1rem;
  line-height: 1;
}

.not-found-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.not-found-message {
  color: var(--color-text-light);
  margin-bottom: 2rem;
}

.not-found-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.not-found-actions a,
.not-found-actions button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  font-weight: 500;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
}

.btn-secondary {
  background-color: white;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background-color: var(--color-card-hover);
}
</style>