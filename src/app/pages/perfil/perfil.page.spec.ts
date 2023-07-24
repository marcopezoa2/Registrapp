import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { PerfilPage } from './perfil.page';
describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilPage],
      imports: [IonicModule.forRoot(),AngularFireModule.initializeApp(environment.firebaseConfig)]
    }).compileComponents();
    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { IonicModule } from '@ionic/angular';
// import { PerfilPage } from './perfil.page';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { FirebaseauthService } from '../../services/firebaseauth.service';
// import { FirestoreBDService } from '../../services/firestore-bd.service';

// describe('PerfilPage', () => {
//   let component: PerfilPage;
//   let fixture: ComponentFixture<PerfilPage>;
//   let serviceBbdd: FirestoreBDService;
//   let fireStorespy: jasmine.SpyObj<AngularFirestore>;
//   let serviceAuth: FirebaseauthService;
//   let fireAuthspy: jasmine.SpyObj<AngularFireAuth>;

//   beforeEach(waitForAsync(() => {
//     const BDspy = jasmine.createSpyObj('AngularFirestore', ['getDoc', 'updateDoc'] );
//     const Authspy = jasmine.createSpyObj('AngularFIreAuth', ['stateUser', 'getUid'] );

//     TestBed.configureTestingModule({
//       declarations: [ PerfilPage ],
//       imports: [IonicModule.forRoot()],
//       providers: [
//         FirestoreBDService,
//         {provide: AngularFirestore, useValue: BDspy},
//         FirebaseauthService,
//         {provide: AngularFireAuth, useValue: Authspy}
//       ]
//     }).compileComponents();
//     serviceBbdd = TestBed.inject(FirestoreBDService);
//     fireStorespy = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
//     serviceAuth = TestBed.inject(FirebaseauthService);
//     fireAuthspy = TestBed.inject(AngularFireAuth) as jasmine.SpyObj<AngularFireAuth>;

//     fixture = TestBed.createComponent(PerfilPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   }));

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
