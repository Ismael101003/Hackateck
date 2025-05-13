<!-- src/views/Register.vue -->
<template>
  <div class="register-container">
    <div class="register-card">
      <h2 class="register-title">Crear Cuenta</h2>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <form @submit.prevent="register" class="register-form">
        <div class="form-group">
          <label for="nombre">Nombre Completo</label>
          <input 
            type="text" 
            id="nombre" 
            v-model="userData.nombre" 
            required
            placeholder="Nombre y apellidos"
          />
        </div>
        
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input 
            type="email" 
            id="email" 
            v-model="userData.email" 
            required
            placeholder="ejemplo@universidad.edu"
          />
        </div>
        
        <div class="form-group">
          <label for="carrera">Carrera</label>
          <select id="carrera" v-model="userData.carrera" required>
            <option value="" disabled selected>Selecciona tu carrera</option>
            <option value="Ingeniería Informática">Ingeniería Informática</option>
            <option value="Ingeniería Civil">Ingeniería Civil</option>
            <option value="Medicina">Medicina</option>
            <option value="Derecho">Derecho</option>
            <option value="Administración de Empresas">Administración de Empresas</option>
            <option value="Psicología">Psicología</option>
            <option value="Arquitectura">Arquitectura</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="semestre">Semestre Actual</label>
          <select id="semestre" v-model="userData.semestre" required>
            <option value="" disabled selected>Selecciona tu semestre</option>
            <option v-for="n in 10" :key="n" :value="n">{{ n }}° Semestre</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            v-model="userData.password" 
            required
            placeholder="Mínimo 8 caracteres"
            minlength="8"
          />
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">Confirmar Contraseña</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword" 
            required
            placeholder="Repite tu contraseña"
            minlength="8"
          />
        </div>
        
        <div class="form-actions">
          <button type="submit" class="register-button" :disabled="isLoading">
            {{ isLoading ? 'Creando cuenta...' : 'Crear Cuenta' }}
          </button>
        </div>
      </form>
      
      <div class="register-footer">
        <p>¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/auth-service';

const router = useRouter();

const userData = ref({
  nombre: '',
  email: '',
  carrera: '',
  semestre: '',
  password: ''
});

const confirmPassword = ref('');
const error = ref('');
const isLoading = ref(false);

async function register() {
  // Validar que las contraseñas coincidan
  if (userData.value.password !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden';
    return;
  }
  
  isLoading.value = true;
  error.value = '';
  
  try {
    // En una implementación real, esto enviaría los datos al backend
    // Por ahora, simulamos un registro exitoso
    
    // Simular un retraso de red
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simular un inicio de sesión automático después del registro
    const loginResponse = await authService.login({
      email: userData.value.email,
      password: userData.value.password
    });
    
    if (loginResponse.success) {
      // Redirigir al dashboard
      router.push('/dashboard');
    } else {
      error.value = 'Error al iniciar sesión automáticamente. Por favor, inicia sesión manualmente.';
    }
  } catch (err) {
    error.value = 'Error al crear la cuenta. Intenta nuevamente.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-background);
  padding: 1rem;
}

.register-card {
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: var(--shadow-md);
  padding: 2rem;
}

.register-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
}

.error-message {
  background-color: #fef2f2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.register-form {
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

.form-group input,
.form-group select {
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-actions {
  margin-top: 1rem;
}

.register-button {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.register-button:hover {
  background-color: var(--color-primary-dark);
}

.register-button:disabled {
  background-color: var(--color-text-lighter);
  cursor: not-allowed;
}

.register-footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.register-footer a {
  color: var(--color-primary);
  text-decoration: none;
}

.register-footer a:hover {
  text-decoration: underline;
}
</style>