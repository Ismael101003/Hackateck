// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { authService } from '../services/auth-service';



// Importar componentes para las rutas
// Nota: Usamos importación dinámica para lazy loading (carga perezosa)
const Dashboard = () => import('../components/Dashboard.vue');
const Chatbot = () => import('../components/Chatbot.vue');
const Schedule = () => import('../components/Schedule.vue');
const Performance = () => import('../components/Performance.vue');
const Profile = () => import('../components/Profile.vue');
const Login = () => import('../views/Login.vue');
const Register = () => import('../views/Register.vue');
const NotFound = () => import('../views/NotFound.vue');

// Definir rutas
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/chatbot',
    name: 'Chatbot',
    component: Chatbot,
    meta: { requiresAuth: true }
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
    meta: { requiresAuth: true }
  },
  {
    path: '/performance',
    name: 'Performance',
    component: Performance,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guest: true }
  },
  {
    // Ruta para capturar cualquier ruta no definida
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];

// Crear instancia del router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Guardia de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();
  
  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // Redirigir a la página de inicio de sesión
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } 
  // Si la ruta es solo para invitados y el usuario está autenticado
  else if (to.matched.some(record => record.meta.guest) && isAuthenticated) {
    // Redirigir al dashboard
    next({ name: 'Dashboard' });
  } 
  // En cualquier otro caso, permitir la navegación
  else {
    next();
  }
});

export default router;