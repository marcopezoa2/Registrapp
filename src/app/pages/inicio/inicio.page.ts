import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { Subscription } from 'rxjs';
import { RegistroUsu } from '../../interfaces-bd';
import { FirestoreBDService } from '../../services/firestore-bd.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  //Vamos a crear una variable que reciba los datos del usuario desde el Login:
  //usuario: any;

  //usuario: any;

  // usuario: RegistroUsu[] = [
  //   {
  //     uid:'',
  //     rut: '',
  //     nombre: '',
  //     ap_paterno: '',
  //     correo: '',
  //     clave: '',
  //     tipo_usuario: 'alumno',
  //     escuela: '',
  //     carrera: '',
  //     sede: '',
  //     asignatura: '',
  //     foto: '',
  //   }
  // ]


  //suscriber metodo usado en el LOGIN HOME para LOGOUT
  suscriberUserInfo: Subscription;

  uid: string = null;

  usuario: RegistroUsu = null;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private firebaseauthService: FirebaseauthService,
    private firestoreService: FirestoreBDService) {

  }

  ngOnInit() {
    //this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
    console.log('estoy en perfil');
    var res = this.firebaseauthService.stateAuth();
    console.log(res, 'en perfil - estado autenticacion');
    this.getUid();
    console.log(this.getUid())
  }

  async getUid() {
    const uid = await this.firebaseauthService.getUid();
    if (uid) {
      this.uid = uid;
      console.log('uid Firebase -> ', this.uid);
      this.getInfoUser();
    } else {
      console.log('no existe uid Firebase');
    }
  }

  getInfoUser() {
    const path = 'Usuarios';
    const id = this.uid;
    this.firestoreService.getDocu<RegistroUsu>(path, id).subscribe(res => {
      if (res) {
        this.usuario = res;
      }
      console.log('datos son -> ', res);
    })
  }


  async logout() {
    let alert = await this.alertController.create({
      header: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Si',
          handler: () => {
            var res = this.usuario
            this.firebaseauthService.logout().then(res => {
              console.log(res, 'Sesion cerrada correctamente');
              this.router.navigate(['/home']);
            }).catch(error => {
              console.log(error, 'Error al cerrar sesión')
            });
          }
        }
      ]
    });
    alert.present();
    return;
  }
}
