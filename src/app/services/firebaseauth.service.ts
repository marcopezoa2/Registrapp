import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreBDService } from './firestore-bd.service';
import { RegistroUsu } from '../interfaces-bd';
//import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  datosUsuario: RegistroUsu;

  constructor(
    public auth: AngularFireAuth,
    private firestoredbService: FirestoreBDService
  ) {
    this.getUid();
    this.stateUser();
  }


  //******************   METODOS FIREBASE AUTH SERVICE  ******************* */

  //registrar un usuario en un formulario, se almacena en Base de datos Autenticación correo y password
  registrar(datos: RegistroUsu) {
    return this.auth.createUserWithEmailAndPassword(datos.correo, datos.clave);
  }

  //loguea a un usuario utilizando correo y password validos en Autenticación FireDB
  login(correo: string, clave: string) {
    return this.auth.signInWithEmailAndPassword(correo, clave);
  }

  //desloguea al usuario de la aplicación, 
  logout() {
    return this.auth.signOut()
  }

  //obtiene el estado de la autenticación
  stateAuth() {
    return this.auth.authState;
  }

  //obtiene el estado del Usuario
  stateUser() {
    this.stateAuth().subscribe(res => {
      console.log(res, 'ERROR EN EL SUSCRIBE RESPUESTA');
      if (res !== null) {
        return this.getInfoUser();
        
      }
    });
  }

  //obtiene la información del usuario
  async getInfoUser() {
    const uid = await this.getUid();
    const path = 'Usuarios';
    this.firestoredbService.getDocu<RegistroUsu>(path, uid).subscribe(res => {
      if (res !== undefined) {
        this.datosUsuario = res;
        console.log('datosUsuario =>', this.datosUsuario);
      }
    });
  }

  //obtiene el UID del usuario registrado
  async getUid() {
    const user = await this.auth.currentUser;
    if (user === null) {
      return null;
    } else {
      return user.uid;
    }
  }
  
  async resetPassword(correo: string): Promise<void> {
    try {
      return this.auth.sendPasswordResetEmail(correo);
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.auth.currentUser).sendEmailVerification();
  }

  
}