import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { FirebaseauthService } from './firebaseauth.service';

describe('FirebaseauthService', () => {
  let service: FirebaseauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)]
    });
    service = TestBed.inject(FirebaseauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
