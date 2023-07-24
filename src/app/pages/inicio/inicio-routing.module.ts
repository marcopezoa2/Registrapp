import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    children: [
      //Implementación de CHILDREN en InicioPage...
      {
        path: 'perfil/:rut',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'qrcode/:rut',
        loadChildren: () => import('../qrcode/qrcode.module').then(m => m.QrcodePageModule)
      },
      {
        path: 'scan-qr/:rut',
        loadChildren: () => import('../scan-qr/scan-qr.module').then(m => m.ScanQrPageModule)
      },
      {
        path: 'estudiantes/:rut',
        loadChildren: () => import('../estudiantes/estudiantes.module').then(m => m.EstudiantesPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule { }
