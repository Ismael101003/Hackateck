// src/config.ts

// Configuración de la aplicación
export const appConfig = {
  // Nombre de la aplicación
  appName: 'Asistente Estudiantil',
  
  // Versión de la aplicación
  version: '1.0.0',
  
  // URL base para las API (en una implementación real)
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.asistenteestudiantil.com',
  
  // Tiempo de expiración del token de autenticación (en milisegundos)
  tokenExpiration: 24 * 60 * 60 * 1000, // 24 horas
  
  // Configuración de almacenamiento local
  storage: {
    tokenKey: 'auth_token',
    userKey: 'user_data',
    preferencesKey: 'user_preferences'
  },
  
  // Configuración de notificaciones
  notifications: {
    defaultDuration: 5000,
    maxNotifications: 3
  },
  
  // Configuración del chatbot
  chatbot: {
    initialMessage: '¡Hola! Soy tu asistente de estudios. ¿En qué puedo ayudarte hoy?',
    suggestionsCount: 4
  },
  
  // Configuración de rendimiento académico
  academic: {
    passingGrade: 70,
    excellentGrade: 90,
    riskThresholds: {
      high: 70,
      medium: 80
    }
  }
};

export default appConfig;