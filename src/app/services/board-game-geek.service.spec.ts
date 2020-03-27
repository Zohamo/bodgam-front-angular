import { TestBed } from '@angular/core/testing';

import { BoardGameGeekService } from './board-game-geek.service';

describe('BoardGameGeekService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoardGameGeekService = TestBed.get(BoardGameGeekService);
    expect(service).toBeTruthy();
  });
});
