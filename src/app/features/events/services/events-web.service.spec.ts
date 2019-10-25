import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EventsWebService } from './events-web.service';

describe('EventsWebService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventsWebService]
    })
  );

  it('should be created', inject([EventsWebService], (service: EventsWebService) => {
    expect(service).toBeTruthy();
  }));
});
