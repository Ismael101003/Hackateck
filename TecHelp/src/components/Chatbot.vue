<template>
  <div class="chatbot-container">
    <h2 class="page-title">Asistente IA</h2>
    
    <div class="chatbot">
      <div class="chat-messages" ref="chatContainer">
        <div v-for="(message, index) in messages" :key="index" 
             :class="['message', message.sender === 'bot' ? 'bot-message' : 'user-message']">
          <div class="message-avatar">
            <span v-if="message.sender === 'bot'">🤖</span>
            <span v-else>👤</span>
          </div>
          <div class="message-content">
            <div class="message-text" v-html="formatMessage(message.text)"></div>
            <div class="message-time">{{ message.time }}</div>
          </div>
        </div>
        <div v-if="isTyping" class="message bot-message typing">
          <div class="message-avatar">🤖</div>
          <div class="message-content">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chat-input">
        <input 
          type="text" 
          v-model="userInput" 
          placeholder="Escribe tu pregunta aquí..." 
          @keyup.enter="sendMessage"
          :disabled="isTyping"
        />
        <button @click="sendMessage" :disabled="isTyping || !userInput.trim()">
          <span class="send-icon">📤</span>
        </button>
      </div>
      
      <div class="suggestion-chips">
        <button 
          v-for="(suggestion, index) in suggestions" 
          :key="index" 
          @click="usesuggestion(suggestion)"
          class="suggestion-chip"
        >
          {{ suggestion }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';

const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
});

const messages = ref([]);
const userInput = ref('');
const isTyping = ref(false);
const chatContainer = ref(null);

// Sugerencias de preguntas frecuentes
const suggestions = ref([
  "¿Cómo puedo mejorar en Cálculo?",
  "¿Cuándo es mi próximo examen?",
  "¿Qué materias tengo en riesgo?",
  "Técnicas de estudio efectivas"
]);

// Inicializar el chat con un mensaje de bienvenida
onMounted(() => {
  addBotMessage(`Hola ${props.userData.nombre}, soy tu asistente de estudios. ¿En qué puedo ayudarte hoy?`);
});

// Función para enviar un mensaje
const sendMessage = async () => {
  if (!userInput.value.trim() || isTyping.value) return;
  
  const message = userInput.value;
  addUserMessage(message);
  userInput.value = '';
  
  // Simular respuesta del bot
  await respondToMessage(message);
};

// Función para usar una sugerencia
const usesuggestion = (suggestion) => {
  userInput.value = suggestion;
  sendMessage();
};

// Añadir mensaje del usuario
const addUserMessage = (text) => {
  messages.value.push({
    text,
    sender: 'user',
    time: getCurrentTime()
  });
  scrollToBottom();
};

// Añadir mensaje del bot
const addBotMessage = (text) => {
  messages.value.push({
    text,
    sender: 'bot',
    time: getCurrentTime()
  });
  scrollToBottom();
};

// Obtener hora actual formateada
const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
};

// Simular respuesta del bot con IA
const respondToMessage = async (message) => {
  isTyping.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simular tiempo de procesamiento
  
  let response = '';
  
  // Lógica simple para simular respuestas de IA
  const messageLower = message.toLowerCase();
  
  if (messageLower.includes('mejorar') && messageLower.includes('cálculo')) {
    response = `Para mejorar en Cálculo Diferencial, te recomiendo:<br>
    1. Dedica al menos 2 horas diarias a practicar ejercicios<br>
    2. Forma un grupo de estudio con compañeros<br>
    3. Utiliza recursos en línea como Khan Academy o YouTube<br>
    4. Agenda una tutoría con el profesor, tienes disponibilidad los martes y jueves`;
  } 
  else if (messageLower.includes('próximo examen')) {
    response = `Tus próximos exámenes son:<br>
    - Cálculo Diferencial: 15 de mayo<br>
    - Física II: 18 de mayo<br>
    - Programación Avanzada: 20 de mayo<br>
    Te recomiendo empezar a prepararte para Cálculo, ya que es tu materia con mayor riesgo.`;
  }
  else if (messageLower.includes('materias') && messageLower.includes('riesgo')) {
    response = `Basado en tu rendimiento actual, tienes las siguientes materias en riesgo:<br>
    <span style="color: #dc2626;">⚠️ Alto riesgo: Cálculo Diferencial (62/100)</span><br>
    <span style="color: #f59e0b;">⚠️ Riesgo medio: Física II (70/100)</span><br>
    <span style="color: #f59e0b;">⚠️ Riesgo medio: Inglés Técnico (75/100)</span><br>
    Te sugiero priorizar Cálculo Diferencial en tu plan de estudios.`;
  }
  else if (messageLower.includes('técnicas') && messageLower.includes('estudio')) {
    response = `Aquí tienes algunas técnicas de estudio efectivas:<br>
    1. <b>Método Pomodoro</b>: 25 minutos de estudio, 5 de descanso<br>
    2. <b>Mapas mentales</b>: Organiza visualmente los conceptos<br>
    3. <b>Enseña lo aprendido</b>: Explicar a otros refuerza tu conocimiento<br>
    4. <b>Práctica espaciada</b>: Repasa el material en intervalos crecientes<br>
    5. <b>Autoevaluación</b>: Hazte preguntas para comprobar tu comprensión`;
  }
  else if (messageLower.includes('horario')) {
    response = `Tu horario para hoy incluye:<br>
    - 10:30-12:30: Física II (Aula B-203)<br>
    - 14:00-16:00: Estructura de Datos (Aula A-102)<br>
    Recuerda llevar el material necesario para las prácticas de laboratorio en Física.`;
  }
  else {
    response = `Gracias por tu mensaje. Como tu asistente de estudios, puedo ayudarte con:<br>
    - Información sobre tus materias y calificaciones<br>
    - Consejos para mejorar tu rendimiento académico<br>
    - Recordatorios sobre tu horario y exámenes<br>
    - Técnicas de estudio personalizadas<br>
    ¿En qué área específica necesitas ayuda?`;
  }
  
  isTyping.value = false;
  addBotMessage(response);
  
  // Actualizar sugerencias basadas en la conversación
  updateSuggestions(messageLower);
};

// Actualizar sugerencias basadas en la conversación
const updateSuggestions = (lastMessage) => {
  if (lastMessage.includes('cálculo')) {
    suggestions.value = [
      "Muéstrame ejercicios de Cálculo",
      "¿Cuándo es mi examen de Cálculo?",
      "Recursos para aprender Cálculo",
      "Agenda una tutoría de Cálculo"
    ];
  } else if (lastMessage.includes('examen')) {
    suggestions.value = [
      "Técnicas para reducir ansiedad",
      "Cómo prepararse para exámenes",
      "Material de estudio recomendado",
      "Recordatorios para exámenes"
    ];
  } else if (lastMessage.includes('técnicas') || lastMessage.includes('estudio')) {
    suggestions.value = [
      "Método Pomodoro explicado",
      "Aplicaciones para estudiar",
      "Cómo hacer mapas mentales",
      "Técnicas de memorización"
    ];
  } else {
    suggestions.value = [
      "¿Cómo puedo mejorar en Cálculo?",
      "¿Cuándo es mi próximo examen?",
      "¿Qué materias tengo en riesgo?",
      "Técnicas de estudio efectivas"
    ];
  }
};

// Formatear mensaje para mostrar HTML
const formatMessage = (text) => {
  return text;
};

// Desplazarse al final del chat
const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

// Observar cambios en los mensajes para desplazarse al final
watch(messages, () => {
  scrollToBottom();
});
</script>

<style scoped>
.chatbot-container {
  width: 100%;
}

.page-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.chatbot {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  max-width: 80%;
  margin-bottom: 0.5rem;
}

.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.bot-message {
  align-self: flex-start;
}

.message-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  margin: 0 0.5rem;
  font-size: 1.25rem;
}

.message-content {
  background-color: #f3f4f6;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  position: relative;
}

.user-message .message-content {
  background-color: #4f46e5;
  color: white;
  border-top-right-radius: 0;
}

.bot-message .message-content {
  background-color: #f3f4f6;
  color: #333;
  border-top-left-radius: 0;
}

.message-text {
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.message-time {
  font-size: 0.7rem;
  color: #6b7280;
  text-align: right;
}

.user-message .message-time {
  color: rgba(255, 255, 255, 0.8);
}

.chat-input {
  display: flex;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
}

.chat-input input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 1.5rem;
  outline: none;
  font-size: 0.875rem;
}

.chat-input input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

.chat-input button {
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.chat-input button:hover {
  background-color: #4338ca;
}

.chat-input button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.suggestion-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
}

.suggestion-chip {
  background-color: #f3f4f6;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.suggestion-chip:hover {
  background-color: #e5e7eb;
}

/* Indicador de escritura */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.typing-indicator span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #9ca3af;
  animation: typing 1s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.5rem);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .message {
    max-width: 90%;
  }
  
  .suggestion-chips {
    overflow-x: auto;
    padding-bottom: 1rem;
  }
}
</style>