// src/services/data-service.ts

// Tipos para los datos académicos
export interface Materia {
  id: number;
  nombre: string;
  calificacion: number;
  riesgo: 'bajo' | 'medio' | 'alto';
}

export interface Clase {
  hora: string;
  materia: string;
  aula: string;
}

export interface DiaHorario {
  dia: string;
  clases: Clase[];
}

export interface UserData {
  id: string;
  nombre: string;
  carrera: string;
  semestre: number;
  materias: Materia[];
  horario: DiaHorario[];
}

// Clase para el servicio de datos
export class DataService {
  // Obtiene los datos completos del usuario
  async getUserData(): Promise<UserData> {
    // En una implementación real, esto se obtendría de un backend
    // Por ahora, devolvemos datos de prueba
    
    return {
      id: '12345',
      nombre: 'Carlos Rodríguez',
      carrera: 'Ingeniería Informática',
      semestre: 5,
      materias: [
        { id: 1, nombre: 'Programación Avanzada', calificacion: 85, riesgo: 'bajo' },
        { id: 2, nombre: 'Cálculo Diferencial', calificacion: 62, riesgo: 'alto' },
        { id: 3, nombre: 'Física II', calificacion: 70, riesgo: 'medio' },
        { id: 4, nombre: 'Estructura de Datos', calificacion: 90, riesgo: 'bajo' },
        { id: 5, nombre: 'Inglés Técnico', calificacion: 75, riesgo: 'medio' }
      ],
      horario: [
        { dia: 'Lunes', clases: [
          { hora: '08:00-10:00', materia: 'Programación Avanzada', aula: 'A-101' },
          { hora: '10:30-12:30', materia: 'Física II', aula: 'B-203' }
        ]},
        { dia: 'Martes', clases: [
          { hora: '07:30-09:30', materia: 'Cálculo Diferencial', aula: 'C-305' },
          { hora: '10:00-12:00', materia: 'Estructura de Datos', aula: 'A-102' }
        ]},
        { dia: 'Miércoles', clases: [
          { hora: '08:00-10:00', materia: 'Programación Avanzada', aula: 'A-101' },
          { hora: '10:30-12:30', materia: 'Inglés Técnico', aula: 'D-405' }
        ]},
        { dia: 'Jueves', clases: [
          { hora: '07:30-09:30', materia: 'Cálculo Diferencial', aula: 'C-305' },
          { hora: '10:00-12:00', materia: 'Física II', aula: 'B-203' }
        ]},
        { dia: 'Viernes', clases: [
          { hora: '09:00-11:00', materia: 'Estructura de Datos', aula: 'A-102' },
          { hora: '11:30-13:30', materia: 'Inglés Técnico', aula: 'D-405' }
        ]}
      ]
    };
  }
  
  // Obtiene las materias del usuario
  async getMaterias(): Promise<Materia[]> {
    const userData = await this.getUserData();
    return userData.materias;
  }
  
  // Obtiene el horario del usuario
  async getHorario(): Promise<DiaHorario[]> {
    const userData = await this.getUserData();
    return userData.horario;
  }
  
  // Obtiene las materias en riesgo
  async getMateriasEnRiesgo(): Promise<Materia[]> {
    const materias = await this.getMaterias();
    return materias.filter(materia => materia.riesgo === 'medio' || materia.riesgo === 'alto');
  }
  
  // Actualiza la calificación de una materia
  async updateCalificacion(materiaId: number, nuevaCalificacion: number): Promise<Materia> {
    // En una implementación real, esto se enviaría al backend
    
    // Simulamos la actualización local
    const materias = await this.getMaterias();
    const materiaIndex = materias.findIndex(m => m.id === materiaId);
    
    if (materiaIndex === -1) {
      throw new Error('Materia no encontrada');
    }
    
    // Actualizar calificación
    materias[materiaIndex].calificacion = nuevaCalificacion;
    
    // Actualizar nivel de riesgo
    if (nuevaCalificacion >= 80) {
      materias[materiaIndex].riesgo = 'bajo';
    } else if (nuevaCalificacion >= 70) {
      materias[materiaIndex].riesgo = 'medio';
    } else {
      materias[materiaIndex].riesgo = 'alto';
    }
    
    return materias[materiaIndex];
  }
  
  // Obtiene las próximas clases (para hoy)
  async getProximasClases(): Promise<Clase[]> {
    // En una implementación real, esto se calcularía basado en la fecha actual
    // Por ahora, devolvemos datos de prueba
    
    return [
      { hora: '10:30-12:30', materia: 'Física II', aula: 'B-203' },
      { hora: '14:00-16:00', materia: 'Estructura de Datos', aula: 'A-102' }
    ];
  }
  
  // Obtiene los próximos exámenes
  async getProximosExamenes(): Promise<{materia: string, fecha: string}[]> {
    // En una implementación real, esto se obtendría del backend
    // Por ahora, devolvemos datos de prueba
    
    return [
      { materia: 'Cálculo Diferencial', fecha: '2023-05-15' },
      { materia: 'Física II', fecha: '2023-05-18' },
      { materia: 'Programación Avanzada', fecha: '2023-05-20' }
    ];
  }
}

// Exportar una instancia única del servicio
export const dataService = new DataService();