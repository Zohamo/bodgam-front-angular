import { TestBed } from '@angular/core/testing';

import { EventSubscriptionService } from './event-subscription.service';

describe('EventSubscriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventSubscriptionService = TestBed.get(EventSubscriptionService);
    expect(service).toBeTruthy();
  });
});
