<template>
  <div class="profile-container">
    <h2 class="page-title">Perfil de Usuario</h2>
    
    <div class="profile-content">
      <div class="profile-header">
        <div class="profile-avatar">
          <img src="https://via.placeholder.com/150" alt="Foto de perfil" />
          <button class="change-avatar-btn">Cambiar foto</button>
        </div>
        <div class="profile-info">
          <h3>{{ userData.nombre }}</h3>
          <p class="profile-subtitle">{{ userData.carrera }}</p>
          <p class="profile-detail">
            <span class="detail-label">ID Estudiante:</span> {{ userData.id }}
          </p>
          <p class="profile-detail">
            <span class="detail-label">Semestre:</span> {{ userData.semestre }}
          </p>
          <div class="profile-actions">
            <button class="edit-profile-btn">
              <span class="btn-icon">✏️</span> Editar Perfil
            </button>
            <button class="settings-btn">
              <span class="btn-icon">⚙️</span> Configuración
            </button>
          </div>
        </div>
      </div>
      
      <div class="profile-sections">
        <div class="profile-section">
          <h3 class="section-title">Información Personal</h3>
          <form class="profile-form" @submit.prevent="savePersonalInfo">
            <div class="form-group">
              <label for="nombre">Nombre Completo</label>
              <input type="text" id="nombre" v-model="personalInfo.nombre" />
            </div>
            <div class="form-group">
              <label for="email">Correo Electrónico</label>
              <input type="email" id="email" v-model="personalInfo.email" />
            </div>
            <div class="form-group">
              <label for="telefono">Teléfono</label>
              <input type="tel" id="telefono" v-model="personalInfo.telefono" />
            </div>
            <div class="form-group">
              <label for="direccion">Dirección</label>
              <textarea id="direccion" v-model="personalInfo.direccion"></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="save-btn">Guardar Cambios</button>
            </div>
          </form>
        </div>
        
        <div class="profile-section">
          <h3 class="section-title">Preferencias de Aprendizaje</h3>
          <form class="profile-form" @submit.prevent="saveLearningPreferences">
            <div class="form-group">
              <label>Estilo de Aprendizaje Preferido</label>
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="learningPreferences.visual" />
                  Visual
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="learningPreferences.auditivo" />
                  Auditivo
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="learningPreferences.lectura" />
                  Lectura/Escritura
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="learningPreferences.kinestesico" />
                  Kinestésico
                </label>
              </div>
            </div>
            <div class="form-group">
              <label for="horasEstudio">Horas de Estudio Diarias</label>
              <select id="horasEstudio" v-model="learningPreferences.horasEstudio">
                <option value="1-2">1-2 horas</option>
                <option value="3-4">3-4 horas</option>
                <option value="5-6">5-6 horas</option>
                <option value="7+">7+ horas</option>
              </select>
            </div>
            <div class="form-group">
              <label for="ambiente">Ambiente de Estudio Preferido</label>
              <select id="ambiente" v-model="learningPreferences.ambiente">
                <option value="silencioso">Silencioso</option>
                <option value="ruido-blanco">Con ruido blanco</option>
                <option value="musica">Con música</option>
                <option value="grupo">En grupo</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="submit" class="save-btn">Guardar Preferencias</button>
            </div>
          </form>
        </div>
        
        <div class="profile-section">
          <h3 class="section-title">Configuración de Notificaciones</h3>
          <form class="profile-form" @submit.prevent="saveNotificationSettings">
            <div class="form-group">
              <label>Recibir Notificaciones Sobre:</label>
              <div class="toggle-group">
                <div class="toggle-item">
                  <span>Recordatorios de Clases</span>
                  <label class="toggle">
                    <input type="checkbox" v-model="notificationSettings.clases" />
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="toggle-item">
                  <span>Fechas de Exámenes</span>
                  <label class="toggle">
                    <input type="checkbox" v-model="notificationSettings.examenes" />
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="toggle-item">
                  <span>Alertas de Rendimiento</span>
                  <label class="toggle">
                    <input type="checkbox" v-model="notificationSettings.rendimiento" />
                    <span class="toggle-slider"></span>
                  </label>
                </div>
                <div class="toggle-item">
                  <span>Consejos de Estudio</span>
                  <label class="toggle">
                    <input type="checkbox" v-model="notificationSettings.consejos" />
                    <span class="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="frecuencia">Frecuencia de Notificaciones</label>
              <select id="frecuencia" v-model="notificationSettings.frecuencia">
                <option value="diaria">Diaria</option>
                <option value="semanal">Semanal</option>
                <option value="importante">Solo importantes</option>
              </select>
            </div>
            <div class="form-actions">
              <button type="submit" class="save-btn">Guardar Configuración</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update-user']);

// Información personal
const personalInfo = ref({
  nombre: props.userData.nombre,
  email: 'carlos.rodriguez@universidad.edu',
  telefono: '555-123-4567',
  direccion: 'Av. Universidad 1234, Ciudad Universitaria'
});

// Preferencias de aprendizaje
const learningPreferences = ref({
  visual: true,
  auditivo: false,
  lectura: true,
  kinestesico: false,
  horasEstudio: '3-4',
  ambiente: 'silencioso'
});

// Configuración de notificaciones
const notificationSettings = ref({
  clases: true,
  examenes: true,
  rendimiento: true,
  consejos: false,
  frecuencia: 'diaria'
});

// Guardar información personal
const savePersonalInfo = () => {
  // En una app real, esto enviaría los datos a un servidor
  emit('update-user', { nombre: personalInfo.value.nombre });
  showSaveMessage('Información personal guardada correctamente');
};

// Guardar preferencias de aprendizaje
const saveLearningPreferences = () => {
  // En una app real, esto enviaría los datos a un servidor
  showSaveMessage('Preferencias de aprendizaje guardadas correctamente');
};

// Guardar configuración de notificaciones
const saveNotificationSettings = () => {
  // En una app real, esto enviaría los datos a un servidor
  showSaveMessage('Configuración de notificaciones guardada correctamente');
};

// Mostrar mensaje de guardado (simulado)
const showSaveMessage = (message) => {
  alert(message);
};
</script>

<style scoped>
.profile-container {
  width: 100%;
}

.page-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.profile-content {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.profile-header {
  display: flex;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;
}

.profile-avatar img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.change-avatar-btn {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.change-avatar-btn:hover {
  background-color: #e5e7eb;
}

.profile-info {
  flex: 1;
}

.profile-info h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.profile-subtitle {
  color: #6b7280;
  margin-bottom: 1rem;
}

.profile-detail {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.detail-label {
  font-weight: 600;
  margin-right: 0.5rem;
}

.profile-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.edit-profile-btn, .settings-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-profile-btn {
  background-color: #4f46e5;
  color: white;
  border: none;
}

.edit-profile-btn:hover {
  background-color: #4338ca;
}

.settings-btn {
  background-color: white;
  border: 1px solid #e5e7eb;
}

.settings-btn:hover {
  background-color: #f3f4f6;
}

.btn-icon {
  margin-right: 0.5rem;
}

.profile-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-section {
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.profile-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
}

.profile-form {
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

.form-group input, .form-group select, .form-group textarea {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.toggle-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e5e7eb;
  transition: .4s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #4f46e5;
}

input:checked + .toggle-slider:before {
  transform: translateX(24px);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.save-btn {
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-btn:hover {
  background-color: #4338ca;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .profile-avatar {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }
  
  .profile-actions {
    justify-content: center;
  }
  
  .checkbox-group {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>