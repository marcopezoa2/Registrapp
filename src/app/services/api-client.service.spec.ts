import { ApiClientService } from './api-client.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiClientService', () => {
  let service: ApiClientService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiClientService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});