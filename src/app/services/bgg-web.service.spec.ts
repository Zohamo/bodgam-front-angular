import { TestBed } from '@angular/core/testing';

import { BggWebService } from './bgg-web.service';

describe('BggWebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BggWebService = TestBed.get(BggWebService);
    expect(service).toBeTruthy();
  });
});
