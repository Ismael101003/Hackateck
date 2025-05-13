import type { Materia } from '../services/data-service';


// Calcula el promedio de calificaciones
export function calcularPromedio(materias: Materia[]): number {
  if (materias.length === 0) return 0;
  
  const sum = materias.reduce((acc, materia) => acc + materia.calificacion, 0);
  return Math.round(sum / materias.length);
}

// Determina el nivel de riesgo basado en la calificación
export function determinarRiesgo(calificacion: number): 'bajo' | 'medio' | 'alto' {
  if (calificacion >= 80) return 'bajo';
  if (calificacion >= 70) return 'medio';
  return 'alto';
}

// Obtiene el color para representar una calificación
export function getCalificacionColor(calificacion: number): string {
  if (calificacion >= 80) return '#4ade80'; // Verde
  if (calificacion >= 70) return '#facc15'; // Amarillo
  return '#f87171'; // Rojo
}

// Obtiene el texto para el estado de una materia
export function getEstadoText(riesgo: 'bajo' | 'medio' | 'alto'): string {
  if (riesgo === 'bajo') return 'Aprobado';
  if (riesgo === 'medio') return 'En riesgo';
  return 'Crítico';
}

// Obtiene la clase CSS para el estado de una materia
export function getEstadoClass(riesgo: 'bajo' | 'medio' | 'alto'): Record<string, boolean> {
  return {
    'estado-aprobado': riesgo === 'bajo',
    'estado-riesgo': riesgo === 'medio',
    'estado-critico': riesgo === 'alto'
  };
}

// Obtiene un mensaje de alerta basado en el riesgo de la materia
export function getAlertMessage(materia: Materia): string {
  if (materia.riesgo === 'alto') {
    return `¡Atención! Estás en riesgo de reprobar. Necesitas mejorar urgentemente.`;
  } else if (materia.riesgo === 'medio') {
    return `Debes mejorar tu rendimiento para asegurar aprobar esta materia.`;
  }
  return `Buen trabajo. Mantén tu rendimiento actual.`;
}

// Calcula cuántos puntos faltan para aprobar una materia
export function puntosFaltantesParaAprobar(calificacion: number): number {
  const puntajeAprobacion = 70;
  return calificacion >= puntajeAprobacion ? 0 : puntajeAprobacion - calificacion;
}

// Calcula cuántos puntos faltan para obtener excelencia
export function puntosFaltantesParaExcelencia(calificacion: number): number {
  const puntajeExcelencia = 90;
  return calificacion >= puntajeExcelencia ? 0 : puntajeExcelencia - calificacion;
}

// Calcula el porcentaje de materias aprobadas
export function porcentajeMateriasAprobadas(materias: Materia[]): number {
  if (materias.length === 0) return 0;
  
  const aprobadas = materias.filter(materia => materia.calificacion >= 70).length;
  return Math.round((aprobadas / materias.length) * 100);
}

// Ordena materias por nivel de riesgo (primero las de mayor riesgo)
export function ordenarPorRiesgo(materias: Materia[]): Materia[] {
  const riesgoPrioridad = { 'alto': 0, 'medio': 1, 'bajo': 2 };
  
  return [...materias].sort((a, b) => {
    return riesgoPrioridad[a.riesgo] - riesgoPrioridad[b.riesgo];
  });
}

// Genera un mensaje de estado general basado en el rendimiento
export function generarMensajeEstadoGeneral(materias: Materia[]): string {
  const promedio = calcularPromedio(materias);
  const materiasEnRiesgo = materias.filter(m => m.riesgo === 'medio' || m.riesgo === 'alto').length;
  
  if (promedio >= 85 && materiasEnRiesgo === 0) {
    return '¡Excelente! Tu rendimiento académico es sobresaliente.';
  } else if (promedio >= 75 && materiasEnRiesgo <= 1) {
    return 'Buen trabajo. Mantén tu rendimiento y mejora en las áreas de oportunidad.';
  } else if (promedio >= 70) {
    return 'Rendimiento aceptable, pero necesitas mejorar en varias materias.';
  } else {
    return 'Atención: Tu rendimiento académico está por debajo del promedio. Necesitas un plan de acción inmediato.';
  }
}