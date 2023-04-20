import { TestBed } from '@angular/core/testing';

import { HotelInterceptorInterceptor } from './hotel-interceptor.interceptor';

describe('HotelInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HotelInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HotelInterceptorInterceptor = TestBed.inject(HotelInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
