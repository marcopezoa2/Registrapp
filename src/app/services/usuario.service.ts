import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreBDService } from './firestore-bd.service';
import { RegistroUsu } from 'src/app/interfaces-bd';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //Array de Registro cinculado a interface.ts (deben contener las mismas variables)
  arrayRegistros: RegistroUsu[] = [
    {
      uid: '',
      rut: '17.851.727-9',
      nombre: 'Marco',
      ap_paterno: 'Pezoa',
      correo: 'admin@duoc.cl',
      clave: 'adminadmin',
      tipo_usuario: 'administrador',
      escuela: '',
      carrera: '',
      sede: 'Puente Alto',
      asignatura: '',
      foto: '',
    },
    {
      uid: '',
      rut: '13.698.514-0',
      nombre: 'Paulina',
      ap_paterno: 'Espinoza',
      correo: 'docente@profesor.duoc.cl',
      clave: 'docente',
      tipo_usuario: 'docente',
      escuela: '',
      carrera: '',
      sede: 'Puente Alto',
      asignatura: '',
      foto: '',
    },
    {
      uid: '',
      rut: '15.789.385-8',
      nombre: 'Sebastian',
      ap_paterno: 'Salgado',
      //fecha_nac: '1992-08-10',
      correo: 'alumno@duocuc.cl',
      clave: 'alumno',
      tipo_usuario: 'alumno',
      escuela: 'Informática y Telecomunicaciones',
      carrera: 'Analista Programador Computacional',
      sede: 'Puente Alto',
      asignatura: 'PGY4121-026V',
      foto: '',
    }
  ];


  //Variable que se encarga de saber si el usuario esta Logueado o No:

  constructor(
    public firestoreBDService: FirestoreBDService
  ) { }


  //obtener usuario del array
  getUsuario(rut) {
    return this.arrayRegistros.find(usu => usu.rut == rut);
  }


  //******************   METODOS ASISTENCIA QR   ******************* */
  //Genera una marca de asistencia con datos que se almacen en BD
  marcarAsistencia(qrAsistencia, usuario) {
    const tiempoTranscurrido = Date.now();
    const fecha = new Date(tiempoTranscurrido);
    fecha.toDateString(); // convierte los segundos a fecha : "Sun Dec 10 2022"

    console.log('Fecha_Asistencia: ' + fecha);
    console.log('Rut_estudiante: ' + usuario.rut);
    console.log('Qr_Asistencia: ' + qrAsistencia);
    console.log('nombre_alumno: ' + usuario.nombre + usuario.ap_paterno);

    //variable data que almacenara la información que gaurdara en BD sin crear un array previo
    var data = {
      'fecha_asistencia': fecha,
      'rut_estudiante': usuario.rut,
      'qr_asistencia': qrAsistencia,
      'nombre_alumno': usuario.nombre + ' ' + usuario.ap_paterno
    }
    //Guarda los datos obtenidos del codigo Escaneado en Coleccion Asistencia
    var res = this.firestoreBDService.createDocu(data, 'Asistencia/', crypto.randomUUID()).then(res => console.log(res, 'Datos Creados en BD')).catch(err => console.log(err, 'Datos NO creados en BD'));
    console.log(res);
  }
}
