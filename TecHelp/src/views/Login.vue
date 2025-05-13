<!-- src/views/Login.vue -->
<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Iniciar Sesión</h2>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input 
            type="email" 
            id="email" 
            v-model="credentials.email" 
            required
            placeholder="ejemplo@universidad.edu"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            v-model="credentials.password" 
            required
            placeholder="Tu contraseña"
          />
        </div>
        
        <div class="form-actions">
          <button type="submit" class="login-button" :disabled="isLoading">
            {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
          </button>
        </div>
      </form>
      
      <div class="login-footer">
        <p>¿No tienes una cuenta? <router-link to="/register">Regístrate</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { authService } from '../services/auth-service';

const router = useRouter();
const route = useRoute();

const credentials = ref({
  email: '',
  password: ''
});

const error = ref('');
const isLoading = ref(false);

async function login() {
  isLoading.value = true;
  error.value = '';
  
  try {
    const response = await authService.login(credentials.value);
    
    if (response.success) {
      // Redirigir a la página original o al dashboard
      const redirectPath = route.query.redirect || '/dashboard';
      router.push(redirectPath);
    } else {
      error.value = response.message || 'Error al iniciar sesión';
    }
  } catch (err) {
    error.value = 'Error de conexión. Intenta nuevamente.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 1rem;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.login-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.error-message {
  background-color: #fef2f2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  font-size: 0.875rem;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.form-actions {
  margin-top: 1rem;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: #4338ca;
}

.login-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.login-footer a {
  color: #4f46e5;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}
</style>