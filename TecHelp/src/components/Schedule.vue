<template>
  <div class="schedule-container">
    <h2 class="page-title">Horario Académico</h2>
    
    <div class="schedule-controls">
      <button @click="changeView('week')" :class="{ active: currentView === 'week' }">Vista Semanal</button>
      <button @click="changeView('day')" :class="{ active: currentView === 'day' }">Vista Diaria</button>
    </div>
    
    <div v-if="currentView === 'week'" class="week-view">
      <div class="timetable">
        <div class="time-column">
          <div class="time-header">Hora</div>
          <div v-for="hour in hours" :key="hour" class="time-slot">{{ hour }}</div>
        </div>
        
        <div v-for="dia in userData.horario" :key="dia.dia" class="day-column">
          <div class="day-header">{{ dia.dia }}</div>
          <div class="day-schedule">
            <div 
              v-for="(clase, index) in dia.clases" 
              :key="index"
              class="class-block"
              :style="getClassStyle(clase)"
            >
              <div class="class-name">{{ clase.materia }}</div>
              <div class="class-time">{{ clase.hora }}</div>
              <div class="class-location">{{ clase.aula }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="day-view">
      <div class="day-selector">
        <button @click="prevDay" class="nav-button">←</button>
        <h3>{{ selectedDay }}</h3>
        <button @click="nextDay" class="nav-button">→</button>
      </div>
      
      <div class="day-schedule-list">
        <div v-if="currentDayClasses.length === 0" class="no-classes">
          No tienes clases programadas para este día.
        </div>
        <div 
          v-for="(clase, index) in currentDayClasses" 
          :key="index"
          class="day-class-item"
        >
          <div class="class-time-block">
            <div class="time-display">{{ formatTimeDisplay(clase.hora) }}</div>
            <div class="time-duration">{{ getClassDuration(clase.hora) }}</div>
          </div>
          <div class="class-details-block">
            <h4>{{ clase.materia }}</h4>
            <div class="class-location-info">
              <span class="location-icon">📍</span>
              <span>{{ clase.aula }}</span>
            </div>
            <div class="class-actions">
              <button class="action-button">
                <span class="action-icon">📝</span> Notas
              </button>
              <button class="action-button">
                <span class="action-icon">🔔</span> Recordatorio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
});

// Horas para la vista semanal
const hours = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

// Vista actual (semana o día)
const currentView = ref('week');

// Día seleccionado para la vista diaria
const selectedDayIndex = ref(0);
const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

// Cambiar vista
const changeView = (view) => {
  currentView.value = view;
};

// Día seleccionado actual
const selectedDay = computed(() => {
  return days[selectedDayIndex.value];
});

// Clases del día seleccionado
const currentDayClasses = computed(() => {
  const dayData = props.userData.horario.find(d => d.dia === selectedDay.value);
  return dayData ? dayData.clases : [];
});

// Navegar al día anterior
const prevDay = () => {
  selectedDayIndex.value = (selectedDayIndex.value - 1 + days.length) % days.length;
};

// Navegar al día siguiente
const nextDay = () => {
  selectedDayIndex.value = (selectedDayIndex.value + 1) % days.length;
};

// Obtener estilo para el bloque de clase en la vista semanal
const getClassStyle = (clase) => {
  const [start, end] = clase.hora.split('-');
  const startHour = parseInt(start.split(':')[0]);
  const startMinute = parseInt(start.split(':')[1]);
  const endHour = parseInt(end.split(':')[0]);
  const endMinute = parseInt(end.split(':')[1]);
  
  const startPosition = (startHour - 7) * 60 + startMinute;
  const duration = (endHour - startHour) * 60 + (endMinute - startMinute);
  
  return {
    top: `${startPosition}px`,
    height: `${duration}px`,
    backgroundColor: getClassColor(clase.materia)
  };
};

// Obtener color para la clase basado en el nombre de la materia
const getClassColor = (materia) => {
  const colors = {
    'Programación Avanzada': '#4ade80',
    'Cálculo Diferencial': '#f87171',
    'Física II': '#facc15',
    'Estructura de Datos': '#60a5fa',
    'Inglés Técnico': '#c084fc'
  };
  
  return colors[materia] || '#9ca3af';
};

// Formatear hora para mostrar en la vista diaria
const formatTimeDisplay = (timeRange) => {
  const [start, end] = timeRange.split('-');
  return `${start} - ${end}`;
};

// Obtener duración de la clase
const getClassDuration = (timeRange) => {
  const [start, end] = timeRange.split('-');
  const startHour = parseInt(start.split(':')[0]);
  const startMinute = parseInt(start.split(':')[1]);
  const endHour = parseInt(end.split(':')[0]);
  const endMinute = parseInt(end.split(':')[1]);
  
  const durationMinutes = (endHour - startHour) * 60 + (endMinute - startMinute);
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  
  return `${hours}h ${minutes}min`;
};
</script>

<style scoped>
.schedule-container {
  width: 100%;
}

.page-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.schedule-controls {
  display: flex;
  margin-bottom: 1.5rem;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.schedule-controls button {
  flex: 1;
  padding: 0.75rem;
  background-color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.schedule-controls button.active {
  background-color: #4f46e5;
  color: white;
}

/* Vista semanal */
.week-view {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.timetable {
  display: flex;
  min-height: 720px;
  position: relative;
}

.time-column {
  width: 80px;
  border-right: 1px solid #e5e7eb;
}

.time-header, .day-header {
  padding: 0.75rem;
  text-align: center;
  font-weight: 600;
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.time-slot {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.75rem;
  color: #6b7280;
}

.day-column {
  flex: 1;
  border-right: 1px solid #e5e7eb;
  position: relative;
}

.day-column:last-child {
  border-right: none;
}

.day-schedule {
  position: relative;
  height: 720px;
}

.class-block {
  position: absolute;
  left: 5px;
  right: 5px;
  border-radius: 0.25rem;
  padding: 0.5rem;
  color: white;
  font-size: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.class-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.class-time, .class-location {
  font-size: 0.7rem;
  opacity: 0.9;
}

/* Vista diaria */
.day-view {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.day-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.day-selector h3 {
  font-size: 1.25rem;
  font-weight: 600;
}

.nav-button {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.nav-button:hover {
  background-color: #f3f4f6;
}

.day-schedule-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.day-class-item {
  display: flex;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.class-time-block {
  width: 100px;
  padding: 1rem;
  background-color: #4f46e5;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.time-display {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.time-duration {
  font-size: 0.75rem;
  opacity: 0.9;
}

.class-details-block {
  flex: 1;
  padding: 1rem;
}

.class-details-block h4 {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.class-location-info {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.location-icon {
  margin-right: 0.5rem;
}

.class-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  background-color: white;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-button:hover {
  background-color: #f3f4f6;
}

.action-icon {
  margin-right: 0.25rem;
}

.no-classes {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

/* Responsive */
@media (max-width: 768px) {
  .timetable {
    overflow-x: auto;
  }
  
  .day-class-item {
    flex-direction: column;
  }
  
  .class-time-block {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.75rem;
  }
  
  .time-display, .time-duration {
    margin: 0;
  }
}
</style>