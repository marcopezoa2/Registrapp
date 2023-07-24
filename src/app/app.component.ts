import { Component } from '@angular/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

//Usados en la API Rick & Morty
import { ModalController, Platform } from '@ionic/angular';
//import { StatusBar} from '@capacitor/status-bar';

import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { SplashComponent } from './components/splash/splash.component';
// import { FirebaseauthService } from './services/firebaseauth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  //title = 'RegistrAppDuoc';
  elementType = 'url';
  value = 'Techiediaries';


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController,
    private firestore: AngularFirestore
    // private firebaseauthService: FirebaseauthService
    ) {
    this.initializeApp();
    defineCustomElements(window);
    this.presentSplash();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //Splash para mostrar animación al cargar la aplicación
  async presentSplash() {
    const modal = await this.modalCtrl.create({
      component: SplashComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}