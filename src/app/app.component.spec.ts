import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('AppComponent', () => {
  let modalSpy = jasmine.createSpyObj('Modal', ['present']);
  let modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
  modalCtrlSpy.create.and.callFake(function () {
    return modalSpy;
  });

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule,AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [StatusBar ,{ provide: SplashScreen, useValue: {} },{ provide: ModalController, useValue: modalCtrlSpy}],
      
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      
    }).compileComponents();
  }));

  


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  // TODO: add more tests!

});



// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { TestBed, waitForAsync } from '@angular/core/testing';

// import { AppComponent } from './app.component';

// describe('AppComponent', () => {

//   beforeEach(waitForAsync(() => {

//     TestBed.configureTestingModule({
//       declarations: [AppComponent],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//     }).compileComponents();
//   }));

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });
//   // TODO: add more tests!

// });
