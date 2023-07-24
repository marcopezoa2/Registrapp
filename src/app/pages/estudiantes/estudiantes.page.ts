import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.page.html',
  styleUrls: ['./estudiantes.page.scss'],
})
export class EstudiantesPage {

  //declaración de variables
  user: any;
  users: any;
  posts: any;
  post: any = {
    id: null,
    title: "",
    body: "",
    userId: null
  };

  compareWith: any;

  constructor(private api: ApiClientService) { }

  ionViewWillEnter() {
    this.getUsuarios();
    this.getPosts();
  }

  //API-REST-obtención de usuarios por ID JSON
  getUsuario(userId) {
    this.api.getUsuario(userId).subscribe((data) => {
      console.log('mensaje api',data);
      this.user = data;
    });
  }
  //API-REST-obtención de todos los usuarios JSON
  getUsuarios() {
    this.api.getUsuarios().subscribe((data) => {
      this.users = data;
      console.log('mensaje api',data);
    });
  }
  //API-REST-obtención de POST JSON
  getPosts() {
    this.api.getPosts().subscribe((data) => {
      this.posts = data;
      this.posts.reverse();
    });
  }
  //API-REST-Guardar POST
  guardarPost() {
    if (this.post.userId == null) {
      if (this.user == undefined) {
        console.log("Seleccione un usuario");
        return;
      }
      this.post.userId = this.user.id;
      this.api.createPost(this.post).subscribe(
        () => {
          console.log("Creado Correctamente");
          this.getPosts();
          
        },
        error => {
          console.log("Error " + error)
        }
      );
    }
    else {
      this.api.updatePost(this.post.id, this.post).subscribe(
        () => {
          console.log("Actualizado Correctamente");
          this.getPosts();
        },
        error => {
          console.log("Error " + error)
        }
      );
    }
  }
  //API-REST-Actualizar POST JSON
  setPost(_post) {
    this.post = _post;
    this.getUsuario(_post.userId);
    this.compareWith = this.compareWithFn;
  }
  //API-REST-Eliminar POST JSON
  eleminarPost(_post) {
    console.log("eliminar")
    this.api.deletePost(_post.id).subscribe(
      success => {
        console.log("Eliminado correctamente");
        this.getPosts();
      },
      error => {
        console.log("Error " + error)
      }
    )
  }

  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

}
