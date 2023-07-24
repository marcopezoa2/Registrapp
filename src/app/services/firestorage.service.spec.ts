import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { FirestorageService } from './firestorage.service';

describe('FirestorageService', () => {
  let service: FirestorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)]
    });
    service = TestBed.inject(FirestorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
