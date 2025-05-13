<template>
  <div class="dashboard">
    <h2 class="page-title">Dashboard</h2>
    
    <div class="dashboard-grid">
      <div class="card warning-card">
        <h3>Alertas Académicas</h3>
        <div class="alert-list">
          <div v-for="materia in materiasEnRiesgo" :key="materia.id" class="alert-item">
            <div class="alert-icon" :class="getAlertClass(materia.riesgo)">⚠️</div>
            <div class="alert-content">
              <h4>{{ materia.nombre }}</h4>
              <p>Calificación actual: {{ materia.calificacion }}/100</p>
              <p class="alert-message">
                {{ getAlertMessage(materia) }}
              </p>
            </div>
          </div>
          <div v-if="materiasEnRiesgo.length === 0" class="no-alerts">
            ¡Felicidades! No tienes materias en riesgo.
          </div>
        </div>
      </div>
      
      <div class="card schedule-card">
        <h3>Próximas Clases</h3>
        <div class="class-list">
          <div v-for="(clase, index) in proximasClases" :key="index" class="class-item">
            <div class="class-time">{{ clase.hora }}</div>
            <div class="class-details">
              <h4>{{ clase.materia }}</h4>
              <p>Aula: {{ clase.aula }}</p>
            </div>
          </div>
          <div v-if="proximasClases.length === 0" class="no-classes">
            No tienes clases próximas para hoy.
          </div>
        </div>
      </div>
      
      <div class="card performance-card">
        <h3>Rendimiento Académico</h3>
        <div class="performance-chart">
          <div class="chart-container">
            <!-- Aquí iría un gráfico real, pero usamos una representación simple -->
            <div class="bar-chart">
              <div v-for="materia in userData.materias" :key="materia.id" class="chart-bar">
                <div class="bar-label">{{ materia.nombre.substring(0, 3) }}</div>
                <div class="bar" :style="{ height: materia.calificacion + '%', backgroundColor: getBarColor(materia.calificacion) }"></div>
                <div class="bar-value">{{ materia.calificacion }}</div>
              </div>
            </div>
          </div>
          <div class="average">
            Promedio general: {{ calcularPromedio() }}/100
          </div>
        </div>
      </div>
      
      <div class="card ai-tips-card">
        <h3>Consejos de IA</h3>
        <div class="tips-list">
          <div v-for="(tip, index) in aiTips" :key="index" class="tip-item">
            <div class="tip-icon">💡</div>
            <div class="tip-content">{{ tip }}</div>
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

// Filtrar materias en riesgo (medio o alto)
const materiasEnRiesgo = computed(() => {
  return props.userData.materias.filter(materia => 
    materia.riesgo === 'medio' || materia.riesgo === 'alto'
  );
});

// Simular próximas clases (en una app real, esto se calcularía basado en la hora actual)
const proximasClases = ref([
  { hora: '10:30-12:30', materia: 'Física II', aula: 'B-203' },
  { hora: '14:00-16:00', materia: 'Estructura de Datos', aula: 'A-102' }
]);

// Consejos de IA basados en el rendimiento del estudiante
const aiTips = computed(() => {
  const tips = [];
  
  // Generar consejos basados en materias en riesgo
  if (materiasEnRiesgo.value.length > 0) {
    materiasEnRiesgo.value.forEach(materia => {
      if (materia.riesgo === 'alto') {
        tips.push(`Considera buscar tutoría para ${materia.nombre}. Estás en riesgo de reprobar.`);
      } else if (materia.riesgo === 'medio') {
        tips.push(`Dedica más tiempo de estudio a ${materia.nombre} para mejorar tu calificación.`);
      }
    });
  }
  
  // Consejos generales
  tips.push("Recuerda hacer pausas activas durante tus sesiones de estudio para mantener la concentración.");
  tips.push("Utiliza técnicas de estudio como el método Pomodoro para aumentar tu productividad.");
  
  return tips;
});

// Calcular promedio general
const calcularPromedio = () => {
  const sum = props.userData.materias.reduce((acc, materia) => acc + materia.calificacion, 0);
  return Math.round(sum / props.userData.materias.length);
};

// Obtener mensaje de alerta basado en la materia
const getAlertMessage = (materia) => {
  if (materia.riesgo === 'alto') {
    return `¡Atención! Estás en riesgo de reprobar. Necesitas mejorar urgentemente.`;
  } else if (materia.riesgo === 'medio') {
    return `Debes mejorar tu rendimiento para asegurar aprobar esta materia.`;
  }
  return '';
};

// Obtener clase CSS para el nivel de alerta
const getAlertClass = (riesgo) => {
  return {
    'high-risk': riesgo === 'alto',
    'medium-risk': riesgo === 'medio'
  };
};

// Obtener color para las barras del gráfico
const getBarColor = (calificacion) => {
  if (calificacion >= 80) return '#4ade80';
  if (calificacion >= 70) return '#facc15';
  return '#f87171';
};
</script>

<style scoped>
.dashboard {
  width: 100%;
}

.page-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.card h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

/* Estilos para la tarjeta de alertas */
.alert-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.alert-item {
  display: flex;
  align-items: flex-start;
  padding: 0.75rem;
  background-color: #fef2f2;
  border-radius: 0.375rem;
}

.alert-icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
}

.high-risk {
  color: #dc2626;
}

.medium-risk {
  color: #f59e0b;
}

.alert-content h4 {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.alert-message {
  font-size: 0.875rem;
  color: #666;
}

/* Estilos para la tarjeta de horario */
.class-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.class-item {
  display: flex;
  padding: 0.75rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
}

.class-time {
  min-width: 100px;
  font-weight: 600;
  color: #4f46e5;
}

.class-details h4 {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

/* Estilos para la tarjeta de rendimiento */
.performance-chart {
  height: 200px;
}

.chart-container {
  height: 80%;
}

.bar-chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
}

.chart-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 18%;
}

.bar-label {
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

.bar {
  width: 100%;
  border-radius: 0.25rem 0.25rem 0 0;
  transition: height 0.3s ease;
}

.bar-value {
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.average {
  margin-top: 1rem;
  text-align: center;
  font-weight: 600;
}

/* Estilos para la tarjeta de consejos */
.tips-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  padding: 0.75rem;
  background-color: #f0f9ff;
  border-radius: 0.375rem;
}

.tip-icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
}

.tip-content {
  font-size: 0.875rem;
  color: #333;
}

.no-alerts, .no-classes {
  text-align: center;
  padding: 1rem;
  color: #6b7280;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>