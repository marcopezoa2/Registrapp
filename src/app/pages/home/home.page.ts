import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreBDService } from 'src/app/services/firestore-bd.service';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { InteraccionesService } from '../../services/interacciones.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  credenciales = {
    correo: null,
    clave: null
  }

  //Variables:
  usuario = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)])
  });

  constructor(
    private router: Router,
    public alertController: AlertController,
    public firestoreBDService: FirestoreBDService,
    private firebaseauthService: FirebaseauthService,
    private interaction: InteraccionesService,
  ) { }

  ngOnInit() {
  }


  async login() {
    if (this.credenciales.correo == null || this.credenciales.correo.trim().length == 0) {
      this.interaction.campoVacio('El campo esta vacio');
      return;
    }
    else if (this.credenciales.clave == null || this.credenciales.clave.trim().length == 0) {
      this.interaction.campoVacio('El campo esta vacio');
      return;
    }
    await this.interaction.presentLoading('Ingresando...')
    console.log('credenciales -> ', this.credenciales);
    var regexp= new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)').test(this.credenciales.correo);
    if(regexp==false){
      this.interaction.presentToastError('Correo solamente puede ser Institucional DUOC UC') 
      return false;
    }
    const res = await this.firebaseauthService.login(this.credenciales.correo, this.credenciales.clave).catch(error => {
      console.log('error');
      this.interaction.closeLoading();
      console.log(error.message);
      if (error.code == 'auth/missing-email') {
        this.interaction.presentToastError('Usuario y/o contraseña inválida');
        return;
      } else if (error.code == 'auth/invalid-email') {
        this.interaction.presentToastError('La dirección de correo electrónico está mal escrita');
        return;
      } else if (error.code == 'auth/user-not-found') {
        this.interaction.presentToastError('No hay registro de este usuario');
        return;
      } else {
        this.interaction.presentToastError('Usuario y/o contraseña inválida');
        return;
      }
    })
    if (res) {
      console.log('res -> ', res);
      this.interaction.closeLoading();
      this.interaction.presentToastExito('Ingresado con exito');
      this.usuario.reset();
      this.router.navigate(['/inicio'])
    }
  }
}
