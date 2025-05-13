
// Formatea una fecha en formato legible (DD/MM/YYYY)
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
}

// Formatea una hora en formato de 24 horas (HH:MM)
export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

// Obtiene el nombre del día de la semana
export function getDayName(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return days[d.getDay()];
}

// Obtiene el nombre del mes
export function getMonthName(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return months[d.getMonth()];
}

// Formatea una fecha en formato largo (Lunes, 15 de Mayo de 2023)
export function formatLongDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${getDayName(d)}, ${d.getDate()} de ${getMonthName(d)} de ${d.getFullYear()}`;
}

// Calcula la diferencia en días entre dos fechas
export function daysBetween(date1: Date | string, date2: Date | string): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  
  // Convertir a UTC para evitar problemas con horario de verano
  const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
  
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

// Obtiene la hora actual en formato HH:MM
export function getCurrentTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

// Formatea un rango de tiempo (HH:MM-HH:MM)
export function formatTimeRange(start: string, end: string): string {
  return `${start} - ${end}`;
}

// Calcula la duración en minutos entre dos horas (formato HH:MM)
export function calculateDuration(start: string, end: string): number {
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  
  return (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
}

// Formatea una duración en minutos a formato legible (Xh Ymin)
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}min`;
  } else if (mins === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${mins}min`;
  }
}