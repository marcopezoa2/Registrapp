import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidacionesService } from 'src/app/services/validaciones.service';

//Importar SERVICIO BD
import { FirestoreBDService } from 'src/app/services/firestore-bd.service';
//Importar Interfaz
import { RegistroUsu } from 'src/app/interfaces-bd';
import { FirestorageService } from '../../services/firestorage.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { Subscription } from 'rxjs';
import { InteraccionesService } from '../../services/interacciones.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

  listaDeUsuarios = [];

  //ARRAY REGISTROS vinculado con la INTERFAZ
  arrayRegistros: RegistroUsu[] = [];

  //variables para trabajar en la Storage
  //datos: any[] = [];
  //KEY_USUARIOS = 'userRegister';

  dato: RegistroUsu = {
    //id: '',
    uid: null,
    rut: null,
    nombre: null,
    ap_paterno: null,
    correo: null,
    clave: null,
    tipo_usuario: 'alumno',
    escuela: null,
    carrera: null,
    sede: null,
    asignatura: null,
    foto: null,
  };


  //declarar variables de grupo (formularios):
  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ap_paterno: new FormControl('', [Validators.required, Validators.minLength(3)]),
    //fecha_nac: new FormControl('', [Validators.required]),
    //Solo valida el correos de los alumnos.
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duocuc).(cl)')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    //El tipo de usuario cuando se registrar es solo del tipo alumno.
    tipo_usuario: new FormControl('alumno', [Validators.required]),
  });
  repetir_clave: string = "";





  //variable del upload imagen
  newFile: any;

  //variable que asigna UID de firebase (ID unico)
  uid = '';

  //suscriber metodo usado en el LOGIN HOME para LOGOUT
  suscriberUserInfo: Subscription;


  //ingresarEnable = false;

  constructor(
    private validaciones: ValidacionesService,
    private router: Router,
    public firebaseauthService: FirebaseauthService,
    private firestoreBDService: FirestoreBDService,
    public firestorageService: FirestorageService,
    private interaction: InteraccionesService,
  ) {
    //muestra al iniciar el estado del usuario para saber si esta autenticado o no
    this.firebaseauthService.stateAuth().subscribe(res => {
      console.log(res);
      if (res !== null) {
        this.uid = res.uid;
        this.getUserInfo(this.uid);
      } else {
        this.initUsuario();
      }
    });
  }

  // async ngOnInit() {
  //   await this.cargarDatos();
  // }

  async ngOnInit() {
    const uid = await this.firebaseauthService.getUid();
    console.log('ID Firebase del User Logueado', uid);

    //Carga los datos de usuarios registrados en pantalla al inicio
    // this.firestoreBDService.getAll('usuarios/').then(firebaseResponse => {
    //   firebaseResponse.subscribe(listaDeUsuariosRef => {
    //     this.listaDeUsuarios = listaDeUsuariosRef.map(usuarioRef => {
    //       let usuario = usuarioRef.payload.doc.data();
    //       usuario['id'] = usuarioRef.payload.doc.id;
    //       return usuario;
    //     })
    //     console.log(this.listaDeUsuarios);

    //   })
    // })
  }


  async registrarse() {
    if (this.dato.rut == null || this.dato.rut.trim().length == 0) {
      this.interaction.campoVacio('Porfavor, ingrese un Rut');
      return;
    }
    else if (!this.validaciones.validarRut(this.usuario.controls.rut.value)) {
      this.interaction.campoForm('Porfavor, ingrese Rut con puntos, guión y digito verificador');
      return;
    }
    else if (this.dato.nombre == null || this.dato.nombre.trim().length == 0) {
      this.interaction.campoVacio('Porfavor, ingrese su nombre');
      return;
    }
    else if (this.dato.ap_paterno == null || this.dato.ap_paterno.trim().length == 0) {
      this.interaction.campoVacio('Porfavor, ingrese su apellido');
      return;
    }
    else if (this.dato.correo == null || this.dato.correo.trim().length == 0) {
      this.interaction.campoVacio('Porfavor, ingrese su correo eléctronico de alumno DUOC');
      return;
    }
    else if (this.dato.clave == null || this.dato.clave.trim().length == 0) {
      this.interaction.campoVacio('Porfavor, ingrese una contraseña');
      return;
    }
    else if (this.repetir_clave == null || this.repetir_clave.trim().length == 0) {
      this.interaction.campoVacio('Porfavor, repita la misma contraseña');
      return;
    }
    else if (this.usuario.controls.clave.value != this.repetir_clave) {
      this.interaction.campoForm('Las contraseñas no coinciden');
      return;
    }
    else {
      this.interaction.presentLoading('Registrando...')
      console.log('datos usuario -> ', this.dato);
      const res = await this.firebaseauthService.registrar(this.dato).catch(error => {
        console.log('Error al registrar usuario');
        //this.interaction.closeLoading();
        //Captura los errores de Firebase y los muestra en un Toast
        console.log(error.message);
        if (error.code == 'auth/weak-password') {
          this.interaction.presentToastError('La contraseña debe tener al menos 6 caracteres!');
          return;
        } 
        else if (error.code == 'auth/invalid-email') {
          this.interaction.presentToastError('La dirección de correo electrónico está mal escrita!');
          return;
        }
        else if (error.code == 'auth/email-already-in-use') {
          this.interaction.presentToastError('La dirección de correo electrónico ya está en uso por otra cuenta!');
          return;
        }
        else {
          this.interaction.presentToastError('Upss!, Ocurrio un error al registrar');
          return;
        }
      })
      if (res) {
        console.log('exito al crear el usuario');
        const path = 'Usuarios';
        const id = res.user.uid;
        this.dato.uid = id;
        this.dato.clave = null
        await this.firestoreBDService.createDocu(this.dato, path, id)
        this.guardarUser();
        this.interaction.presentToastExito('¡Felicidades, se ha registrado exitosamente!');
        this.router.navigate(['/inicio']);
        return;
      }
    }
  }

  initUsuario() {
    this.uid = '';
    this.dato = {
      uid: '',
      rut: '',
      nombre: '',
      ap_paterno: '',
      correo: '',
      clave: '',
      tipo_usuario: 'alumno',
      escuela: '',
      carrera: '',
      sede: '',
      asignatura: '',
      foto: '',
    };
    console.log(this.dato);
  }

  //Evento que carga una imagen del usuario
  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.dato.foto = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // metodo guardar usuario creado en el registro
  async guardarUser() {
    const path = 'Usuarios'; //colecion Usuarios
    const rut = this.dato.rut;
    if (this.newFile !== undefined) {
      const res = await this.firestorageService.uploadImage(this.newFile, path, rut);
      this.dato.foto = res;
    }
    this.firestoreBDService.createDocu(this.dato, path, this.dato.uid).then(res => {
      console.log(res, 'Usuario guardado con exito');
    }).catch(error => {
      console.log(error, 'Error en guardado de usuario')
    });
  }



  //obtiene la información del usuario que esta logueado
  getUserInfo(uid: string) {
    console.log('getUserInfo');
    const path = 'Usuarios';
    this.suscriberUserInfo = this.firestoreBDService.getDocu<RegistroUsu>(path, uid).subscribe(res => {
      if (res !== undefined) {
        this.dato = res;
      }
    });
  }

}
