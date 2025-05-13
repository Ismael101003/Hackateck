// src/services/notification-service.ts

import { ref, reactive } from 'vue';

export type NotificationType = 'success' | 'warning' | 'error';

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  duration: number;
  autoClose: boolean;
}

// Estado global para las notificaciones
const notifications = reactive<Notification[]>([]);
let nextId = 1;

export class NotificationService {
  // Añadir una nueva notificación
  addNotification(
    title: string,
    message: string,
    type: NotificationType = 'success',
    duration: number = 5000,
    autoClose: boolean = true
  ): number {
    const id = nextId++;
    
    const notification: Notification = {
      id,
      title,
      message,
      type,
      duration,
      autoClose
    };
    
    notifications.push(notification);
    
    return id;
  }
  
  // Mostrar una notificación de éxito
  success(title: string, message: string, duration: number = 5000): number {
    return this.addNotification(title, message, 'success', duration);
  }
  
  // Mostrar una notificación de advertencia
  warning(title: string, message: string, duration: number = 5000): number {
    return this.addNotification(title, message, 'warning', duration);
  }
  
  // Mostrar una notificación de error
  error(title: string, message: string, duration: number = 5000): number {
    return this.addNotification(title, message, 'error', duration);
  }
  
  // Eliminar una notificación por ID
  removeNotification(id: number): void {
    const index = notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications.splice(index, 1);
    }
  }
  
  // Obtener todas las notificaciones
  getNotifications(): Notification[] {
    return notifications;
  }
  
  // Limpiar todas las notificaciones
  clearAll(): void {
    notifications.splice(0, notifications.length);
  }
}

// Exportar una instancia única del servicio
export const notificationService = new NotificationService();