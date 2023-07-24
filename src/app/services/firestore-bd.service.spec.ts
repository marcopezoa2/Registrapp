import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { FirestoreBDService } from './firestore-bd.service';

describe('FirestoreBdService', () => {
  let service: FirestoreBDService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)]
    });
    service = TestBed.inject(FirestoreBDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
