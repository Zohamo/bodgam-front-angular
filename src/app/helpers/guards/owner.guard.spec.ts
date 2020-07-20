import { TestBed, async, inject } from '@angular/core/testing';

import { OwnerGuard } from './owner.guard';

describe('OwnerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnerGuard]
    });
  });

  it('should ...', inject([OwnerGuard], (guard: OwnerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
