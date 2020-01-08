import { TestBed } from '@angular/core/testing';

import { UsersWebService } from './users-web.service';

describe('UsersWebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersWebService = TestBed.get(UsersWebService);
    expect(service).toBeTruthy();
  });
});
