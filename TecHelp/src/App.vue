<template>
  <div class="app-container">
    <header class="app-header">
      <div class="logo">
        <a>
          <img 
            src="https://i.ibb.co/8g5z09B6/04fe10b4-cf1c-4f85-8a23-ca59bc3c5957.jpg" 
            alt="Logo TECHELP" 
            width="50" 
            height="50"
          />
        </a>
        <h1>TECHELP</h1>
      </div>
      <button @click="toggleMenu" class="menu-button" aria-label="Toggle menu">
        <span class="icon">{{ menuOpen ? '✕' : '☰' }}</span>
      </button>
    </header>

    <div class="app-layout">
      <nav :class="['app-nav', { 'open': menuOpen }]">
        <div class="user-profile">
          <div class="avatar">
            <img :src="userAvatar" alt="Foto de perfil" width="50" height="50" />
          </div>
          <div class="user-info">
            <h3>{{ userData.nombre }}</h3>
            <p>{{ userData.carrera }}</p>
          </div>
        </div>
        <ul class="nav-links">
          <li 
            v-for="(item, key) in navItems" 
            :key="key"
            @click="navigateTo(key)"
            :class="{ active: currentViewKey === key }"
          >
            <span class="icon">{{ item.icon }}</span> {{ item.label }}
          </li>
        </ul>
      </nav>

      <main class="app-content" @click="menuOpen && isMobile && toggleMenu()">
        <Transition name="fade" mode="out-in">
          <component 
            :is="currentView" 
            :user-data="userData" 
            @update-user="updateUserData" 
          />
        </Transition>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, computed, onMounted, onBeforeUnmount } from 'vue';
import Dashboard from './components/Dashboard.vue';
import Chatbot from './components/Chatbot.vue';
import Schedule from './components/Schedule.vue';
import Performance from './components/Performance.vue';
import Profile from './components/Profile.vue';

// Componentes disponibles
const components = {
  dashboard: Dashboard,
  chatbot: Chatbot,
  schedule: Schedule,
  performance: Performance,
  profile: Profile
};

// Items de navegación
const navItems = {
  dashboard: { icon: '📊', label: 'Dashboard' },
  chatbot: { icon: '💬', label: 'Asistente IA' },
  schedule: { icon: '📅', label: 'Horario' },
  performance: { icon: '📈', label: 'Rendimiento' },
  profile: { icon: '👤', label: 'Perfil' }
};

// Estado reactivo
const menuOpen = ref(false);
const currentViewKey = ref('dashboard');
const isMobile = ref(window.innerWidth <= 768);
const userAvatar = ref('https://via.placeholder.com/50');

// Datos del usuario
const userData = ref({
  id: '12345',
  nombre: 'Israel Ortiz Ramirez',
  carrera: 'Ingeniería en Tecnologias de la informacion y comunicaciones',
  semestre: 5,
  materias: [
    { id: 1, nombre: 'Programación web', calificacion: 85, riesgo: 'bajo' },
    { id: 2, nombre: 'Cálculo Diferencial', calificacion: 62, riesgo: 'alto' },
    { id: 3, nombre: 'Física II', calificacion: 70, riesgo: 'medio' },
    { id: 4, nombre: 'Estructura de Datos', calificacion: 90, riesgo: 'bajo' },
    { id: 5, nombre: 'Inglés Técnico', calificacion: 75, riesgo: 'medio' }
  ],
  horario: [
    { dia: 'Lunes', clases: [
      { hora: '08:00-10:00', materia: 'Programación Web', aula: 'A-3' },
      { hora: '10:30-12:30', materia: 'Física II', aula: 'B-203' }
    ]},
    { dia: 'Martes', clases: [
      { hora: '07:30-09:30', materia: 'Cálculo Diferencial', aula: 'C-305' },
      { hora: '10:00-12:00', materia: 'Estructura de Datos', aula: 'A-102' }
    ]},
    { dia: 'Miércoles', clases: [
      { hora: '08:00-10:00', materia: 'Programación Avanzada', aula: 'A-101' },
      { hora: '10:30-12:30', materia: 'Inglés Técnico', aula: 'D-405' }
    ]},
    { dia: 'Jueves', clases: [
      { hora: '07:30-09:30', materia: 'Cálculo Diferencial', aula: 'C-305' },
      { hora: '10:00-12:00', materia: 'Física II', aula: 'B-203' }
    ]},
    { dia: 'Viernes', clases: [
      { hora: '09:00-11:00', materia: 'Estructura de Datos', aula: 'A-102' },
      { hora: '11:30-13:30', materia: 'Inglés Técnico', aula: 'D-405' }
    ]}
  ]
});

// Componente actual computado
const currentView = computed(() => components[currentViewKey.value]);

// Función para cambiar entre vistas
const navigateTo = (view) => {
  currentViewKey.value = view;
  if (isMobile.value) {
    menuOpen.value = false;
  }
};

// Función para abrir/cerrar el menú
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Función para actualizar datos del usuario
const updateUserData = (newData) => {
  userData.value = { ...userData.value, ...newData };
};

// Función para manejar cambios de tamaño de ventana
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
  if (!isMobile.value && menuOpen.value) {
    menuOpen.value = false;
  }
};

// Ciclo de vida
onMounted(() => {
  console.log('Aplicación inicializada');
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f7fa;
  overflow: hidden;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #4f46e5;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo img {
  border-radius: 8px;
  object-fit: cover;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.menu-button {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.menu-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.app-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.app-nav {
  width: 250px;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow-y: auto;
  transition: transform 0.3s ease;
  z-index: 5;
}

.user-profile {
  display: flex;
  align-items: center;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid #eaeaea;
  background-color: #f9fafb;
}

.avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
  margin-left: 0.75rem;
  overflow: hidden;
}

.user-info h3 {
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-info p {
  font-size: 0.8rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-links {
  list-style: none;
  padding: 0.5rem 0;
}

.nav-links li {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.nav-links li:hover {
  background-color: #f5f7fa;
  color: #4f46e5;
}

.nav-links li.active {
  background-color: #f0f2ff;
  color: #4f46e5;
  border-left-color: #4f46e5;
}

.nav-links .icon {
  margin-right: 0.75rem;
  font-size: 1.1rem;
  width: 24px;
  text-align: center;
}

.app-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background-color: #f5f7fa;
}

/* Transiciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .menu-button {
    display: block;
  }

  .app-nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    padding-top: 60px;
    transform: translateX(-100%);
  }

  .app-nav.open {
    transform: translateX(0);
  }

  .app-content {
    margin-left: 0;
  }
}
</style>