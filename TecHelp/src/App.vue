<template>
  <div class="app-container">
    <header class="app-header">
      <div class="logo">
        <h1>EduAssist</h1>
      </div>
      <button @click="toggleMenu" class="menu-button">
        <span v-if="menuOpen" class="icon">✕</span>
        <span v-else class="icon">☰</span>
      </button>
    </header>

    <nav :class="['app-nav', { 'open': menuOpen }]">
      <div class="user-profile">
        <div class="avatar">
          <img src="https://via.placeholder.com/50" alt="Perfil" />
        </div>
        <div class="user-info">
          <h3>{{ userData.nombre }}</h3>
          <p>{{ userData.carrera }}</p>
        </div>
      </div>
      <ul class="nav-links">
        <li @click="navigateTo('dashboard')">
          <span class="icon">📊</span> Dashboard
        </li>
        <li @click="navigateTo('chatbot')">
          <span class="icon">💬</span> Asistente IA
        </li>
        <li @click="navigateTo('schedule')">
          <span class="icon">📅</span> Horario
        </li>
        <li @click="navigateTo('performance')">
          <span class="icon">📈</span> Rendimiento
        </li>
        <li @click="navigateTo('profile')">
          <span class="icon">👤</span> Perfil
        </li>
      </ul>
    </nav>

    <main class="app-content">
      <component :is="currentView" :user-data="userData" @update-user="updateUserData" />
    </main>
  </div>
</template>

<script setup>

import { ref, shallowRef, onMounted } from 'vue';
import Dashboard from './components/Dashboard.vue';
import Chatbot from './components/Chatbot.vue';
import Schedule from './components/Schedule.vue';
import Performance from './components/Performance.vue';
import Profile from './components/Profile.vue';
import NotificationContainer from './components/NotificationContainer.vue';


const components = {
  dashboard: Dashboard,
  chatbot: Chatbot,
  schedule: Schedule,
  performance: Performance,
  profile: Profile
};

const menuOpen = ref(false);
const currentView = shallowRef(components.dashboard);
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

// Función para cambiar entre vistas
const navigateTo = (view) => {
  currentView.value = components[view];
  menuOpen.value = false;
};

// Función para abrir/cerrar el menú en dispositivos móviles
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Función para actualizar datos del usuario
const updateUserData = (newData) => {
  userData.value = { ...userData.value, ...newData };
};

onMounted(() => {
  // Aquí podríamos cargar datos del usuario desde una API o almacenamiento local
  console.log('Aplicación inicializada');
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
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #4f46e5;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
}

.menu-button {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.app-nav {
  width: 250px;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding-top: 70px;
  transition: transform 0.3s ease;
}

.user-profile {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eaeaea;
}

.avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  margin-left: 0.75rem;
}

.user-info h3 {
  font-size: 1rem;
  font-weight: 600;
}

.user-info p {
  font-size: 0.8rem;
  color: #666;
}

.nav-links {
  list-style: none;
  padding: 1rem 0;
}

.nav-links li {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
}

.nav-links li:hover {
  background-color: #f5f7fa;
  color: #4f46e5;
}

.nav-links .icon {
  margin-right: 0.75rem;
}

.app-content {
  margin-left: 250px;
  padding: 1.5rem;
  flex: 1;
  overflow-y: auto;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .menu-button {
    display: block;
  }

  .app-nav {
    transform: translateX(-100%);
    z-index: 100;
  }

  .app-nav.open {
    transform: translateX(0);
  }

  .app-content {
    margin-left: 0;
  }
}
</style>