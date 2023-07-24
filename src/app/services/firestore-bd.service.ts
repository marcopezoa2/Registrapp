/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirestoreBDService {
  constructor(public fireStoreDb: AngularFirestore) { }


  // //******************   METODOS SIMPLIFICADOS   ******************* */

  //obtiene registros de una colección en Firebase
  async getAll(collection) {
    try {
      return await this.fireStoreDb.collection(collection).snapshotChanges()
    } catch (error) {
      console.log('error en getAll:', error)
    }
  }


  //crea una colección en Firebase
  async create(collection, dato) {
    try {
      return await this.fireStoreDb.collection(collection).add(dato)
    } catch (error) {
      console.log('error en create:', error)
    }
  }

  //elimina registros de una colección por ID en Firebase
  async delete(collection, id) {
    try {
      return await this.fireStoreDb.collection(collection).doc(id).delete()
    } catch (error) {
      console.log('error en delete:', error)
    }
  }

  //obtiene registros por ID de una colección en Firebase
  async getById(collection, id) {
    try {
      return await this.fireStoreDb.collection(collection).doc(id).get()
    } catch (error) {
      console.log('error en getById:', error)
    }
  }
//actualiza registros de una colección por ID en Firebase
  async update(collection, id, dato) {
    try {
      return await this.fireStoreDb.collection(collection).doc(id).set(dato)
    } catch (error) {
      console.log('error en update:', error)
    }
  }


 //******************   METODOS JCODE   ******************* */

  //permite CREAR un Documento dentro de la BD
  createDocu(data: any, path: string, id: string) {
    //Para indicar la RUTA de una COLECCION de la BD -> path
    const collection = this.fireStoreDb.collection(path);
    //Para apuntar al DOCUMENTO -> id y la data
    return collection.doc(id).set(data);
  };

  //permite OBTENER solo un Registro de COLECCION de la BD
  getDocu<tipo>(path: string, id: string) {
    //Para indicar la RUTA de una COLECCION de la BD que va a obtener-> path
    const collection = this.fireStoreDb.collection<tipo>(path);
    //Para apuntar al DOCUMENTO que queremos obtener-> id
    return collection.doc(id).valueChanges();
  };

  //permite eliminar Documento de la BD
  deleteDocu(path: string, id: string) {
    //Para indicar la RUTA de una COLECCION de la BD que va a eliminar-> path
    const collection = this.fireStoreDb.collection(path);
    //Para apuntar al DOCUMENTO que queremos eliminar-> id
    return collection.doc(id).delete();
  };

  //permite modifcar Documento de la BD
  updateDocu(data: any, path: string, id: string) {
    //Para indicar la RUTA de una COLECCION de la BD que va a modificar-> path
    const collection = this.fireStoreDb.collection(path);
    //Para apuntar al DOCUMENTO que queremos modificar-> id
    return collection.doc(id).update(data);
  };

  //permite OBTENER un ID de forma automatica con Firebase
  getId() {
    return this.fireStoreDb.createId();
  };

  //permite Obtener TODOS los Registros de una COLECCION de la BD.
  getCollection<tipo>(path: string) {
    //Para indicar la RUTA de una COLECCION de la BD que va a modificar-> path
    const collection = this.fireStoreDb.collection<tipo>(path);
    //Retorna un OBSERVABLE con toda la info
    return collection.valueChanges();
  };
}

