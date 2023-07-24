import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteraccionesService {

  loading: any;

  constructor(
    public toast: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController) { }


  //mensaje Toast para Acciones Erroneas Rojo
  async presentToastError(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      position: 'bottom',
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }

  //mensaje Toast para Acciones Exitosas Verde
  async presentToastExito(mensaje: string) {
    const toast = await this.toast.create({
      message: mensaje,
      position: 'bottom',
      color: 'success',
      duration: 2000
    });
    toast.present();
  }

  //mensaje de carga de pantalla
  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      duration: 1500,
      message: mensaje,
    });
    await this.loading.present();
  }

  async closeLoading() {
    return this.loading.dismiss();

  }

  //Mensaje de Alerta
  async alert(titulo: string, mensaje: string, boton: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }


  async campoVacio(mensaje: string) {
    const toast = await this.toast.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      duration: 1000,
      color: "danger",
      position: "bottom",
      icon: "alert"
    });
    toast.present();
  }

  async campoForm(mensaje: string) {
    const toast = await this.toast.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      duration: 1000,
      color: "warning",
      position: "bottom",
      icon: "alert"
    });
    toast.present();
  }

}
