import { TestBed, async, inject } from '@angular/core/testing';

import { OwnerOrAuthGuard } from './owner-or-auth.guard';

describe('OwnerOrAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnerOrAuthGuard]
    });
  });

  it('should ...', inject([OwnerOrAuthGuard], (guard: OwnerOrAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
