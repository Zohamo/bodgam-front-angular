import { TestBed, async, inject } from '@angular/core/testing';

import { HasProfileGuard } from './has-profile.guard';

describe('HasProfileGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasProfileGuard]
    });
  });

  it('should ...', inject([HasProfileGuard], (guard: HasProfileGuard) => {
    expect(guard).toBeTruthy();
  }));
});
