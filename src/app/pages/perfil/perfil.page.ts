import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { FirestoreBDService } from '../../services/firestore-bd.service';
import { InteraccionesService } from '../../services/interacciones.service';
import { RegistroUsu } from '../../interfaces-bd';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  //Vamos a crear las variables necesarias para recibir los datos:
  rut: string;
  //usuario: any;

  uid: string = null;
  usuario: RegistroUsu = null;
 

  constructor(private firebaseauthService: FirebaseauthService,
    private firestoreService: FirestoreBDService,
    public alertController: AlertController,
    private interaction: InteraccionesService,
    ) { }


  // ngOnInit() {
  //   this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
  //   this.usuario = this.usuarioService.getUsuario(this.rut);
  //   this.usuario = this.firebaseauthService.getUid(this.uid)
  //   console.table(this.usuario);
  // }


  async ngOnInit() {
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

  async editAtributo(name: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar ' + name,
      inputs: [
        {
          name,
          type: 'text',
          placeholder: 'Ingresa tu ' + name
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (ev) => {
            console.log('Confirm Ok -> ', ev);
            this.saveAtributo(name, ev[name])
          }
        }
      ]
    });
    await alert.present();
    return;
  }

  async saveAtributo(name: string, input: any) {
    await this.interaction.presentLoading('Actualizando...')
    const path = 'Usuarios';
    const id = this.uid;
    const updateDoc = {
    };
    updateDoc[name] = input;
    this.firestoreService.updateDocu(updateDoc, path, id).then(() => {
      this.interaction.presentToastExito('Registro actualizado con éxito');
      this.interaction.closeLoading();
      return;
    })
  }


}
