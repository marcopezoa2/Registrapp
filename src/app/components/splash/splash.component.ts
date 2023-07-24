import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController) { }

  ngOnInit() {}

  ionViewDidEnter(){
    setTimeout(() => {
      this.modalCtrl.dismiss();
    }, 2000);
  }
}