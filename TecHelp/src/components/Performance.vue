<template>
  <div class="performance-container">
    <h2 class="page-title">Rendimiento Académico</h2>
    
    <div class="performance-summary">
      <div class="summary-card">
        <div class="summary-value">{{ calcularPromedio() }}</div>
        <div class="summary-label">Promedio General</div>
      </div>
      <div class="summary-card">
        <div class="summary-value">{{ materiasAprobadas }}</div>
        <div class="summary-label">Materias Aprobadas</div>
      </div>
      <div class="summary-card">
        <div class="summary-value">{{ materiasEnRiesgo.length }}</div>
        <div class="summary-label">Materias en Riesgo</div>
      </div>
    </div>
    
    <div class="performance-chart-container">
      <h3>Calificaciones por Materia</h3>
      <div class="chart">
        <div class="chart-bars">
          <div 
            v-for="materia in userData.materias" 
            :key="materia.id" 
            class="chart-bar-container"
          >
            <div class="chart-label">{{ materia.nombre }}</div>
            <div class="chart-bar-wrapper">
              <div 
                class="chart-bar" 
                :style="{ width: `${materia.calificacion}%`, backgroundColor: getBarColor(materia.calificacion) }"
              ></div>
              <div class="chart-value">{{ materia.calificacion }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="performance-details">
      <h3>Detalle por Materia</h3>
      <div class="details-table">
        <div class="table-header">
          <div class="header-cell">Materia</div>
          <div class="header-cell">Calificación</div>
          <div class="header-cell">Estado</div>
          <div class="header-cell">Tendencia</div>
          <div class="header-cell">Acciones</div>
        </div>
        <div 
          v-for="materia in userData.materias" 
          :key="materia.id" 
          class="table-row"
        >
          <div class="cell materia-cell">{{ materia.nombre }}</div>
          <div class="cell calificacion-cell">
            <div class="calificacion-badge" :style="{ backgroundColor: getBarColor(materia.calificacion) }">
              {{ materia.calificacion }}
            </div>
          </div>
          <div class="cell estado-cell">
            <div class="estado-badge" :class="getEstadoClass(materia.riesgo)">
              {{ getEstadoText(materia.riesgo) }}
            </div>
          </div>
          <div class="cell tendencia-cell">
            <div class="tendencia-icon" :class="getTendenciaClass(materia)">
              {{ getTendenciaIcon(materia) }}
            </div>
          </div>
          <div class="cell acciones-cell">
            <button class="action-btn">
              <span class="action-icon">📊</span>
              Detalles
            </button>
            <button class="action-btn">
              <span class="action-icon">📝</span>
              Plan
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="ai-recommendations">
      <h3>Recomendaciones de IA</h3>
      <div class="recommendations-list">
        <div 
          v-for="(recomendacion, index) in recomendaciones" 
          :key="index" 
          class="recommendation-card"
        >
          <div class="recommendation-icon">💡</div>
          <div class="recommendation-content">
            <h4>{{ recomendacion.titulo }}</h4>
            <p>{{ recomendacion.descripcion }}</p>
            <div class="recommendation-actions">
              <button class="recommendation-btn">Ver más</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
});

// Calcular promedio general
const calcularPromedio = () => {
  const sum = props.userData.materias.reduce((acc, materia) => acc + materia.calificacion, 0);
  return Math.round(sum / props.userData.materias.length);
};

// Materias aprobadas (calificación >= 70)
const materiasAprobadas = computed(() => {
  return props.userData.materias.filter(materia => materia.calificacion >= 70).length;
});

// Materias en riesgo (medio o alto)
const materiasEnRiesgo = computed(() => {
  return props.userData.materias.filter(materia => 
    materia.riesgo === 'medio' || materia.riesgo === 'alto'
  );
});

// Obtener color para las barras del gráfico
const getBarColor = (calificacion) => {
  if (calificacion >= 80) return '#4ade80';
  if (calificacion >= 70) return '#facc15';
  return '#f87171';
};

// Obtener clase CSS para el estado
const getEstadoClass = (riesgo) => {
  return {
    'estado-aprobado': riesgo === 'bajo',
    'estado-riesgo': riesgo === 'medio',
    'estado-critico': riesgo === 'alto'
  };
};

// Obtener texto para el estado
const getEstadoText = (riesgo) => {
  if (riesgo === 'bajo') return 'Aprobado';
  if (riesgo === 'medio') return 'En riesgo';
  return 'Crítico';
};

// Simular tendencia para cada materia
const getTendenciaClass = (materia) => {
  // En una app real, esto se calcularía con datos históricos
  if (materia.calificacion >= 80) return 'tendencia-positiva';
  if (materia.calificacion >= 70) return 'tendencia-estable';
  return 'tendencia-negativa';
};

// Obtener icono para la tendencia
const getTendenciaIcon = (materia) => {
  if (materia.calificacion >= 80) return '↗️';
  if (materia.calificacion >= 70) return '→';
  return '↘️';
};

// Recomendaciones de IA basadas en el rendimiento
const recomendaciones = ref([
  {
    titulo: 'Plan de estudio para Cálculo Diferencial',
    descripcion: 'Hemos detectado que necesitas mejorar urgentemente en esta materia. Te recomendamos un plan intensivo de 3 semanas.'
  },
  {
    titulo: 'Recursos adicionales para Física II',
    descripcion: 'Basado en tu rendimiento, te sugerimos estos videos y ejercicios para reforzar los conceptos clave.'
  },
  {
    titulo: 'Grupo de estudio para Inglés Técnico',
    descripcion: 'Unirse a un grupo de estudio puede ayudarte a mejorar tu comprensión y práctica del idioma.'
  },
  {
    titulo: 'Técnicas de estudio personalizadas',
    descripcion: 'Según tu perfil de aprendizaje, estas técnicas pueden ayudarte a optimizar tu tiempo de estudio.'
  }
]);
</script>

<style scoped>
.performance-container {
  width: 100%;
}

.page-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.performance-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  text-align: center;
}

.summary-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #4f46e5;
  margin-bottom: 0.5rem;
}

.summary-label {
  color: #6b7280;
  font-size: 0.875rem;
}

.performance-chart-container, .performance-details, .ai-recommendations {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.performance-chart-container h3, .performance-details h3, .ai-recommendations h3 {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.chart {
  margin-bottom: 1rem;
}

.chart-bars {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.chart-bar-container {
  display: flex;
  align-items: center;
}

.chart-label {
  width: 200px;
  font-size: 0.875rem;
  font-weight: 500;
}

.chart-bar-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  height: 1.5rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  overflow: hidden;
}

.chart-bar {
  height: 100%;
  border-radius: 0.25rem;
  transition: width 0.5s ease;
}

.chart-value {
  margin-left: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.details-table {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  background-color: #f3f4f6;
  font-weight: 600;
}

.header-cell {
  padding: 0.75rem 1rem;
  border-right: 1px solid #e5e7eb;
}

.header-cell:last-child {
  border-right: none;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  border-top: 1px solid #e5e7eb;
}

.cell {
  padding: 0.75rem 1rem;
  border-right: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
}

.cell:last-child {
  border-right: none;
}

.materia-cell {
  font-weight: 500;
}

.calificacion-cell {
  justify-content: center;
}

.calificacion-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
}

.estado-cell {
  justify-content: center;
}

.estado-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.estado-aprobado {
  background-color: #ecfdf5;
  color: #065f46;
}

.estado-riesgo {
  background-color: #fffbeb;
  color: #92400e;
}

.estado-critico {
  background-color: #fef2f2;
  color: #b91c1c;
}

.tendencia-cell {
  justify-content: center;
}

.tendencia-icon {
  font-size: 1.25rem;
}

.tendencia-positiva {
  color: #065f46;
}

.tendencia-estable {
  color: #92400e;
}

.tendencia-negativa {
  color: #b91c1c;
}

.acciones-cell {
  justify-content: space-around;
}

.action-btn {
  padding: 0.25rem 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  background-color: white;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background-color: #f3f4f6;
}

.action-icon {
  margin-right: 0.25rem;
}

.recommendations-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.recommendation-card {
  display: flex;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.recommendation-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.recommendation-content h4 {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.recommendation-content p {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
}

.recommendation-btn {
  padding: 0.25rem 0.5rem;
  border: 1px solid #4f46e5;
  border-radius: 0.25rem;
  background-color: white;
  color: #4f46e5;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.recommendation-btn:hover {
  background-color: #4f46e5;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .performance-summary {
    grid-template-columns: 1fr;
  }
  
  .recommendations-list {
    grid-template-columns: 1fr;
  }
  
  .table-header, .table-row {
    grid-template-columns: 2fr 1fr 1fr;
  }
  
  .tendencia-cell, .acciones-cell {
    display: none;
  }
}
</style>