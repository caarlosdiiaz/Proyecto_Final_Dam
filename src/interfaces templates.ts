export interface Profesor {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  contrasena: string;
  tipo: string;
}

export interface Curso {
  id: number;
  nivel: string;
  grupo: string;
  tutorId: string;
}

export interface Alumno {
  id: string;
  nombre: string;
  apellidos: string;
  repetidor: boolean;
  cursoId: number;
}

export interface Registro {
  id: number;
  alumnoId: string;
  profesorId: string;
  fechaHora: string;
}

export interface RegistroHistorico {
  id: number;
  alumnoId: string;
  profesorId: string;
  fecha: string;
}