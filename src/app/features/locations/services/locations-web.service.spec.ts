import { TestBed } from '@angular/core/testing';

import { LocationsWebService } from './locations-web.service';

describe('LocationsWebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationsWebService = TestBed.get(LocationsWebService);
    expect(service).toBeTruthy();
  });
});
