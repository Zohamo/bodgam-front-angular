import { Component, OnDestroy } from '@angular/core';
import { BggGame, Profile } from '@/models';
import { BoardGameGeekService, ProfileService } from '@/services';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-game-list-page',
  templateUrl: './profile-game-list-page.component.html',
  styleUrls: ['./profile-game-list-page.component.scss']
})
export class ProfileGameListPageComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public games$: Observable<BggGame[]>;

  /**
   * Creates an instance of ProfileGameListPageComponent.
   *
   * @param {BoardGameGeekService} boardGameGeekService
   * @param {ProfileService} profileService
   * @memberof ProfileGameListPageComponent
   */
  constructor(private boardGameGeekService: BoardGameGeekService, private profileService: ProfileService) {
    profileService.currentProfile$.pipe(takeUntil(this.destroy$)).subscribe((profile: Profile) => {
      if (profile && profile.bggName) {
        this.games$ = boardGameGeekService.getCollection(profile.bggName);
      }
    });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof ProfileGameListPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
