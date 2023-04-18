import { TestBed } from '@angular/core/testing';

import { FadServiceService } from './fad-service.service';

describe('FadServiceService', () => {
  let service: FadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
