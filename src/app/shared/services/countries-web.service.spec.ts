import { TestBed } from '@angular/core/testing';

import { CountriesWebService } from './countries-web.service';

describe('CountriesWebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountriesWebService = TestBed.get(CountriesWebService);
    expect(service).toBeTruthy();
  });
});
