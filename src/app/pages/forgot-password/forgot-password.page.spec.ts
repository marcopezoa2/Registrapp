import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ForgotPasswordPage } from './forgot-password.page';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';


describe('ForgotPasswordPage', () => {
  let component: ForgotPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPage>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordPage ],
      imports: [IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,AngularFireModule.initializeApp(environment.firebaseConfig)]
      ,providers: [
        FirebaseauthService,
      
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});