import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

//import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
//import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

//componente
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';


//Uso de Storage npm install @ionic/storage-angular
import { IonicStorageModule } from '@ionic/storage-angular';

//Uso de la Cámara
import { Camera } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

//Importamos MODULO de FIREBASE
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

//Importar MODULO 'AngularFirestoreModule' -> Para crea la BD
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { RouterTestingModule } from '@angular/router/testing';

import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';




@NgModule({
  declarations: [
    AppComponent,
  ],

  entryComponents: [],

  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    NgxQRCodeModule,
    RouterTestingModule,


  ],

  providers: [
    Camera,
    SplashScreen,
    StatusBar,
    WebView,
    HttpClientModule,
    HttpClient,
    AppRoutingModule,
    HttpClientModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    NgxQRCodeModule,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
