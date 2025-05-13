
export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

export interface AIRecommendation {
  titulo: string;
  descripcion: string;
  prioridad: 'alta' | 'media' | 'baja';
}

// Clase para el servicio de IA
export class AIService {
  // Procesa un mensaje del usuario y genera una respuesta
  async processMessage(message: string, userData: any): Promise<string> {
    // En una implementación real, esto se conectaría a un servicio de IA
    // Por ahora, usamos lógica simple para simular respuestas
    
    const messageLower = message.toLowerCase();
    
    if (messageLower.includes('mejorar') && messageLower.includes('cálculo')) {
      return `Para mejorar en Cálculo Diferencial, te recomiendo:<br>
      1. Dedica al menos 2 horas diarias a practicar ejercicios<br>
      2. Forma un grupo de estudio con compañeros<br>
      3. Utiliza recursos en línea como Khan Academy o YouTube<br>
      4. Agenda una tutoría con el profesor, tienes disponibilidad los martes y jueves`;
    } 
    else if (messageLower.includes('próximo examen')) {
      return `Tus próximos exámenes son:<br>
      - Cálculo Diferencial: 15 de mayo<br>
      - Física II: 18 de mayo<br>
      - Programación Avanzada: 20 de mayo<br>
      Te recomiendo empezar a prepararte para Cálculo, ya que es tu materia con mayor riesgo.`;
    }
    else if (messageLower.includes('materias') && messageLower.includes('riesgo')) {
      return `Basado en tu rendimiento actual, tienes las siguientes materias en riesgo:<br>
      <span style="color: #dc2626;">⚠️ Alto riesgo: Cálculo Diferencial (62/100)</span><br>
      <span style="color: #f59e0b;">⚠️ Riesgo medio: Física II (70/100)</span><br>
      <span style="color: #f59e0b;">⚠️ Riesgo medio: Inglés Técnico (75/100)</span><br>
      Te sugiero priorizar Cálculo Diferencial en tu plan de estudios.`;
    }
    else if (messageLower.includes('técnicas') && messageLower.includes('estudio')) {
      return `Aquí tienes algunas técnicas de estudio efectivas:<br>
      1. <b>Método Pomodoro</b>: 25 minutos de estudio, 5 de descanso<br>
      2. <b>Mapas mentales</b>: Organiza visualmente los conceptos<br>
      3. <b>Enseña lo aprendido</b>: Explicar a otros refuerza tu conocimiento<br>
      4. <b>Práctica espaciada</b>: Repasa el material en intervalos crecientes<br>
      5. <b>Autoevaluación</b>: Hazte preguntas para comprobar tu comprensión`;
    }
    else if (messageLower.includes('horario')) {
      return `Tu horario para hoy incluye:<br>
      - 10:30-12:30: Física II (Aula B-203)<br>
      - 14:00-16:00: Estructura de Datos (Aula A-102)<br>
      Recuerda llevar el material necesario para las prácticas de laboratorio en Física.`;
    }
    else {
      return `Gracias por tu mensaje. Como tu asistente de estudios, puedo ayudarte con:<br>
      - Información sobre tus materias y calificaciones<br>
      - Consejos para mejorar tu rendimiento académico<br>
      - Recordatorios sobre tu horario y exámenes<br>
      - Técnicas de estudio personalizadas<br>
      ¿En qué área específica necesitas ayuda?`;
    }
  }

  // Genera recomendaciones personalizadas basadas en el rendimiento del estudiante
  generateRecommendations(userData: any): AIRecommendation[] {
    const recommendations: AIRecommendation[] = [];
    
    // Analizar materias en riesgo
    const materiasEnRiesgo = userData.materias.filter((materia: any) => 
      materia.riesgo === 'medio' || materia.riesgo === 'alto'
    );
    
    // Generar recomendaciones específicas
    materiasEnRiesgo.forEach((materia: any) => {
      if (materia.riesgo === 'alto') {
        recommendations.push({
          titulo: `Plan de estudio para ${materia.nombre}`,
          descripcion: `Hemos detectado que necesitas mejorar urgentemente en esta materia. Te recomendamos un plan intensivo de 3 semanas.`,
          prioridad: 'alta'
        });
      } else {
        recommendations.push({
          titulo: `Recursos adicionales para ${materia.nombre}`,
          descripcion: `Basado en tu rendimiento, te sugerimos estos videos y ejercicios para reforzar los conceptos clave.`,
          prioridad: 'media'
        });
      }
    });
    
    // Añadir recomendaciones generales
    recommendations.push({
      titulo: 'Técnicas de estudio personalizadas',
      descripcion: 'Según tu perfil de aprendizaje, estas técnicas pueden ayudarte a optimizar tu tiempo de estudio.',
      prioridad: 'baja'
    });
    
    return recommendations;
  }

  // Genera sugerencias para el chatbot basadas en la conversación
  generateChatSuggestions(lastMessage: string): string[] {
    if (lastMessage.toLowerCase().includes('cálculo')) {
      return [
        "Muéstrame ejercicios de Cálculo",
        "¿Cuándo es mi examen de Cálculo?",
        "Recursos para aprender Cálculo",
        "Agenda una tutoría de Cálculo"
      ];
    } else if (lastMessage.toLowerCase().includes('examen')) {
      return [
        "Técnicas para reducir ansiedad",
        "Cómo prepararse para exámenes",
        "Material de estudio recomendado",
        "Recordatorios para exámenes"
      ];
    } else if (lastMessage.toLowerCase().includes('técnicas') || lastMessage.toLowerCase().includes('estudio')) {
      return [
        "Método Pomodoro explicado",
        "Aplicaciones para estudiar",
        "Cómo hacer mapas mentales",
        "Técnicas de memorización"
      ];
    } else {
      return [
        "¿Cómo puedo mejorar en Cálculo?",
        "¿Cuándo es mi próximo examen?",
        "¿Qué materias tengo en riesgo?",
        "Técnicas de estudio efectivas"
      ];
    }
  }
}

// Exportar una instancia única del servicio
export const aiService = new AIService();