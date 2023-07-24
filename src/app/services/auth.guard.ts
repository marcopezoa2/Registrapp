import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import { UsuarioService } from './usuario.service';
import { FirebaseauthService } from './firebaseauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    // private usuarioService: UsuarioService,
    private router: Router,
    private firebaseauthService: FirebaseauthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  
  {
    //Esta es la Lógica:
    var auth = this.firebaseauthService.stateAuth();
    if (!auth) {
      this.router.navigate(['/home']);console.log(auth)
    } else {
      return true;
    }
  }

  // {
  //   //Esta es la Lógica:
  //   var auth = this.usuarioService.getAuth();
  //   if (!auth) {
  //     this.router.navigate(['/home']);
  //   } else {
  //     return true;
  //   }
  // }
}
