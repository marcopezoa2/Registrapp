import { TestBed } from '@angular/core/testing';

import { InteraccionesService } from './interacciones.service';

describe('InteraccionesService', () => {
  let service: InteraccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteraccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
