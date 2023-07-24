import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { InteraccionesService } from '../../services/interacciones.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  //Variable del correo:
  userEmail: string = '';
  correo: string = '';

  //userEmail = new FormControl('');

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authSvc: FirebaseauthService,
    private interaction: InteraccionesService,
  ) { }

  ngOnInit() {
  }

  async recuperar() {
    const email = this.userEmail;
    if (email == null || email.trim().length == 0) {
      this.interaction.campoVacio('Completa el campo requerido');
      return;
    }
    else {
      var regexp = new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)').test(email);
      if (regexp == false) {
        this.interaction.presentToastError('Correo solamente puede ser Institucional DUOC UC')
        return false;
      }
      const res = this.authSvc.resetPassword(email);
      if (res !== undefined) {
        this.interaction.presentLoading('Enviando...');
        var pass = true;
        await res.catch(error => {
          pass = false;
          console.log(error.message);
          if (error.code == 'auth/invalid-email') {
            this.interaction.presentToastError('La dirección de correo electrónico está mal escrita!');
            return;
          }
          else if (error.code == 'auth/missing-email') {
            this.interaction.presentToastError('Ingrese un correo eléctronico válido!');
            return;
          }
          else {
            this.interaction.presentToastError('Upss!, Ocurrio un error al enviar, intente de nuevo');
            return;
          }
        })
        if (pass == true) {
          const alert = await this.alertController.create({
            header: 'Atención',
            message: 'Correo de recuperación enviado, revisa tu bandeja de entrada',
            buttons: ['Aceptar'],
          });
          console.log('realizado con exito');
          await alert.present();
          this.userEmail = "";
          this.router.navigate(['/home']);
          return;
          
        }
      }
    }
  }
}
