import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  usuarios = [];

  // Se establece la base url del API a consumir
  apiURL = 'http://192.168.18.93:3000'; // Ejecuta json-server -H 192.168.18.93 .\db.json para ejecutar un Fake APIRest
  //comando json-server -H ip del servidor .\db.json

  constructor(private http: HttpClient) { }

  getUsuario(userId): Observable<any> {
    return this.http.get(this.apiURL + '/users/' + userId).pipe(
      retry(3)
    );
  }
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiURL + '/users/').pipe(
      retry(3)
    );
  }

  getSede(): Observable<any> {
    return this.http.get(this.apiURL + '/sede/').pipe(
      retry(3)
    );
  }
  getJornada(): Observable<any> {
    return this.http.get(this.apiURL + '/jornada/').pipe(
      retry(3)
    );
  }
  getEscuela(): Observable<any> {
    return this.http.get(this.apiURL + '/escuela/').pipe(
      retry(3)
    );
  }
  getCarrera(): Observable<any> {
    return this.http.get(this.apiURL + '/carrera/').pipe(
      retry(3)
    );
  }
  getAsignatura(): Observable<any> {
    return this.http.get(this.apiURL + '/asignatura/').pipe(
      retry(3)
    );
  }

  getPosts(): Observable<any> {
    return this.http.get(this.apiURL + '/posts/').pipe(
      retry(3)
    );
  }
  getPost(id): Observable<any> {
    return this.http.get(this.apiURL + '/posts/' + id).pipe(
      retry(3)
    );
  }
  createPost(post): Observable<any> {
    return this.http.post(this.apiURL + '/posts', post, this.httpOptions)
      .pipe(
        retry(3)
      );
  }
  updatePost(id, post): Observable<any> {
    return this.http.put(this.apiURL + '/posts/' + id, post, this.httpOptions).pipe(retry(3));
  }
  deletePost(id): Observable<any> {
    return this.http.delete(this.apiURL + '/posts/' + id, this.httpOptions);
  }
}

