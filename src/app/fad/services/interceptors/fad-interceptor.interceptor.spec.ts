import { TestBed } from '@angular/core/testing';

import { FadInterceptorInterceptor } from './fad-interceptor.interceptor';

describe('FadInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FadInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FadInterceptorInterceptor = TestBed.inject(FadInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
