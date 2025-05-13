// src/services/auth-service.ts

// Tipos para la autenticación
export interface User {
  id: string;
  nombre: string;
  email: string;
  carrera: string;
  semestre: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

// Clase para el servicio de autenticación
export class AuthService {
  private currentUser: User | null = null;
  private authToken: string | null = null;
  
  // Simula el inicio de sesión
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // En una implementación real, esto se conectaría a un backend
    // Por ahora, simulamos una respuesta exitosa con datos de prueba
    
    if (credentials.email === 'demo@universidad.edu' && credentials.password === 'password') {
      this.currentUser = {
        id: '12345',
        nombre: 'Carlos Rodríguez',
        email: credentials.email,
        carrera: 'Ingeniería Informática',
        semestre: 5
      };
      
      this.authToken = 'fake-jwt-token-' + Math.random().toString(36).substring(2);
      
      // Guardar en localStorage para persistencia
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      localStorage.setItem('token', this.authToken);
      
      return {
        success: true,
        message: 'Inicio de sesión exitoso',
        user: this.currentUser,
        token: this.authToken
      };
    } else {
      return {
        success: false,
        message: 'Credenciales incorrectas'
      };
    }
  }
  
  // Cierra la sesión del usuario
  logout(): void {
    this.currentUser = null;
    this.authToken = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
  
  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.currentUser || !!localStorage.getItem('token');
  }
  
  // Obtiene el usuario actual
  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      return this.currentUser;
    }
    
    return null;
  }
  
  // Obtiene el token de autenticación
  getAuthToken(): string | null {
    if (this.authToken) {
      return this.authToken;
    }
    
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.authToken = storedToken;
      return this.authToken;
    }
    
    return null;
  }
  
  // Actualiza la información del usuario
  async updateUserProfile(userData: Partial<User>): Promise<AuthResponse> {
    // En una implementación real, esto se enviaría al backend
    const currentUser = this.getCurrentUser();
    
    if (!currentUser) {
      return {
        success: false,
        message: 'No hay usuario autenticado'
      };
    }
    
    // Actualizar datos localmente
    this.currentUser = {
      ...currentUser,
      ...userData
    };
    
    localStorage.setItem('user', JSON.stringify(this.currentUser));
    
    return {
      success: true,
      message: 'Perfil actualizado correctamente',
      user: this.currentUser
    };
  }
}

// Exportar una instancia única del servicio
export const authService = new AuthService();