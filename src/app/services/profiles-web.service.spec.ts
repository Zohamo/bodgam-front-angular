import { TestBed } from '@angular/core/testing';

import { ProfilesWebService } from './profiles-web.service';

describe('ProfilesWebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfilesWebService = TestBed.get(ProfilesWebService);
    expect(service).toBeTruthy();
  });
});
