import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { QrcodePage } from './qrcode.page';

describe('QrcodePage', () => {
  let component: QrcodePage;
  let fixture: ComponentFixture<QrcodePage>;

  beforeEach(waitForAsync(() => {   
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    TestBed.configureTestingModule({
      declarations: [ QrcodePage ],
      imports: [IonicModule.forRoot(),RouterModule.forRoot([]),RouterTestingModule,AngularFireModule.initializeApp(environment.firebaseConfig),HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(QrcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
