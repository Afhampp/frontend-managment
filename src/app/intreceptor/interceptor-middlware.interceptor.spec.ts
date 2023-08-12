import { TestBed } from '@angular/core/testing';

import { InterceptorMiddlwareInterceptor } from './interceptor-middlware.interceptor';

describe('InterceptorMiddlwareInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterceptorMiddlwareInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InterceptorMiddlwareInterceptor = TestBed.inject(InterceptorMiddlwareInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
