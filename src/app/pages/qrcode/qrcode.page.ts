import { Component, OnInit } from '@angular/core';

import { FirestoreBDService } from '../../services/firestore-bd.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiClientService } from '../../services/api-client.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})

export class QrcodePage implements OnInit {

  //lista que se recorre en el AsisQr para traer a los alumnos que escanearon el codigo
  listaDeAsistentes = [];

  usuarios: any[] = [];  //parece que no se esta ocupando

  //Variables para crear el Canvas del código QR
  //elementType = 'canvas';
  elementType = NgxQrcodeElementTypes.CANVAS;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  //value = 'https://www.techiediaries.com/';

  //Variable del boton
  value = '';

  fechaHoy = new Date(Date.now());
  fechaActual1 = '' + this.fechaHoy.getFullYear() + '-' + (this.fechaHoy.getMonth() + 1) + '-' + (this.fechaHoy.getDate()) + 'T00:00:00.000-03:00';
  fechaActual2 = '' + this.fechaHoy.getFullYear() + '-' + (this.fechaHoy.getMonth() + 1) + '-' + (this.fechaHoy.getDate()) + 'T00:00:00.000-03:00';



  sede: any;
  jornada: any;
  asignatura: any;

  //variables que contienen los datos que se ingresan por el formulario
  dato = {
    sede: { 'name': '' },
    jornada: { 'name': '' },
    seccion: { 'sigla_seccion': '' },
    hora_inicio: this.fechaActual1,
    hora_termino: this.fechaActual2,
  }


  //datos del formulario de asistencia para validar
  qrAsistencia = new FormGroup({
    sede: new FormControl('', [Validators.required]),
    jornada: new FormControl('', [Validators.required]),
    seccion: new FormControl('', [Validators.required]),

  });

  compareWith: any;

  constructor(
    private firestoreBDService: FirestoreBDService,
    private toast: ToastController,
    private api: ApiClientService
  ) { }

  async ngOnInit() {
    this.listarAsistencias()
  }

  ionViewWillEnter() {
    this.getSede();
    this.getJornada();
    this.getAsignatura();
  }

  getSede() {
    this.api.getSede().subscribe((data) => {
      this.sede = data;
      this.sede.reverse();
      console.log(this.sede, 'getSede');
    });
  }
  getJornada() {
    this.api.getJornada().subscribe((data) => {
      this.jornada = data;
      this.jornada.reverse();
      console.log(this.jornada, 'getJornada');
    });
  }
  getAsignatura() {
    this.api.getAsignatura().subscribe((data) => {
      this.asignatura = data;
      this.asignatura.reverse();
      console.log(this.asignatura, 'getAsignatura');
    });
  }

  recargarlista() {
    this.listarAsistencias();
  }


  listarAsistencias() {
    //Carga los datos de usuarios registrados en pantalla al inicio
    this.firestoreBDService.getAll('Asistencia/').then(firebaseResponse => {
      firebaseResponse.subscribe(listaDeAsistentesRef => {
        this.listaDeAsistentes = listaDeAsistentesRef.map(asistenciaRef => {
          let asistencia = asistenciaRef.payload.doc.data();
          asistencia['id'] = asistenciaRef.payload.doc.id;
          return asistencia;
        })
        console.log(this.listaDeAsistentes);
        var hora_inicio = new Date(this.dato.hora_inicio);
        var hora_termino = new Date(this.dato.hora_termino);
        // var hora_inicio = new Date('2022-12-14T18:30:00.000-03:00');
        // var hora_termino = new Date('2022-12-14T18:33:00.000-03:00');
        var nueva_lista = this.listaDeAsistentes.filter(datoLista => hora_inicio <= datoLista.fecha_asistencia.toDate() && hora_termino >= datoLista.fecha_asistencia.toDate());
        console.log(nueva_lista);
        this.listaDeAsistentes = nueva_lista;
      })
    })
  }


  async generarQR() {
    if (this.dato.sede['name'].trim().length == 0) {
      const toast = await this.toast.create({
        message: "Porfavor, indique una sede",
        duration: 1000,
        color: "danger",
        position: "middle",
        icon: "alert"
      });
      toast.present();
      console.log('ingresando sede');
      return;
    }
    else if (this.dato.jornada['name'].trim().length == 0) {
      const toast = await this.toast.create({
        message: "Porfavor, indique una jornada",
        duration: 1000,
        color: "danger",
        position: "middle",
        icon: "alert"
      });
      toast.present();
      console.log('ingresando jornada');
      return;
    }
    else if (this.dato.seccion['sigla_seccion'].trim().length == 0) {
      const toast = await this.toast.create({
        message: "Porfavor, indique una seccion",
        duration: 1000,
        color: "danger",
        position: "middle",
        icon: "alert"
      });
      toast.present();
      console.log('ingresando seccion');
      return;
    }
    else if (this.dato.hora_inicio == null) {
      const toast = await this.toast.create({
        message: "Porfavor, indique Hora inicio",
        duration: 1000,
        color: "danger",
        position: "middle",
        icon: "alert"
      });
      toast.present();
      console.log('ingresando hora inicio');
      return;
    } else if (this.dato.hora_termino == null) {
      const toast = await this.toast.create({
        message: "Porfavor, indique Hora Termino",
        duration: 1000,
        color: "danger",
        position: "middle",
        icon: "alert"
      });
      toast.present();
      console.log('ingresando hora termino');
      return;
    }
    else {
      if (this.value == '') {
        (this.value = this.dato.jornada['name'] + this.dato.sede['name'] + this.dato.seccion['sigla_seccion'] + this.dato.hora_inicio + this.dato.hora_termino);
        //this.value = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        console.log(this.value)
        console.log(this.dato.jornada, this.dato.sede, this.dato.seccion, 'getAsignatura');
        console.log(this.dato, 'This dato')

        var data = {
          'jornada': this.dato.jornada['name'],
          'seccion': this.dato.seccion['sigla_seccion'],
          'sede': this.dato.sede['name'],
          'hora_inicio': this.dato.hora_inicio,
          'hora_termino': this.dato.hora_termino,
          'codigoQr': this.value,
        }
        this.firestoreBDService.create('AsistenciaDocente/', data).then(res => {
          console.log(res);
        }).catch(err => {
          console.log("error en creacion: ", err);
        });
      }
    }
  }

  eliminarQR(id) {
    this.firestoreBDService.delete('Asistencia/', id).then(res => {
      alert("Se elimino con exito");
    }).catch(err => {
      console.log("ERROR al eliminar ", err);
    });

  }

  obtenerValorSede(e) {
    console.log(e.detail.value)
    this.dato.sede = e.detail.value;
  }
  obtenerValorJornada(e) {
    console.log(e.detail.value)
    this.dato.jornada = e.detail.value;
  }
  obtenerValorSeccion(e) {
    console.log(e.detail.value)
    this.dato.seccion = e.detail.value;
  }
  obtenerValorhora_inicio(e) {
    console.log(e.detail.value)
    this.dato.hora_inicio = e.detail.value;
  }
  obtenerValorhora_termino(e) {
    console.log(e.detail.value)
    this.dato.hora_termino = e.detail.value;
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };
}
