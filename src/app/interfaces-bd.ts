// INTERFAZ para REGISTRO
export interface RegistroUsu {
  //** ID incorporar solo si se genera con Firebase de forma automatica */
  //id: string;
  uid: string,
  rut: string,
  nombre: string,
  ap_paterno: string,
  //fecha_nac: Date,
  correo: string,
  clave: string,
  tipo_usuario: 'alumno'|'docente'|'administrador',
  escuela: string,
  carrera: string,
  sede: string,
  asignatura: string,
  foto: string,
  
};

export interface Sede{
  nombre_sede: string,
};

export interface Asignatura{
  nombre_asignatura: string,
};

export interface Docente{
  rut: string,
  nombre: string,
  apellido: string,
  correo: string,
  clave: string,
  tipo_usuario: string,
};

export interface Usuario {
  uid: string,
  rut: string,
  nombre: string,
  ap_paterno: string,
  correo: string,
  clave: string,
  tipo_usuario: string,
  escuela: string,
  carrera: string,
  sede: string,
};







