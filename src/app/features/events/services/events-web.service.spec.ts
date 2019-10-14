import { TestBed } from '@angular/core/testing';

import { EventsWebService } from './events-web.service';

describe('EventsWebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventsWebService = TestBed.get(EventsWebService);
    expect(service).toBeTruthy();
  });
});
