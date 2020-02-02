import { TestBed } from '@angular/core/testing';

import { GeolocationWebService } from './geolocation-web.service';

describe('GeolocationWebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeolocationWebService = TestBed.get(GeolocationWebService);
    expect(service).toBeTruthy();
  });
});
