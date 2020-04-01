import { Component, OnDestroy } from '@angular/core';
import { LocationItem, Profile } from '@/models';
import { LocationService, ProfileService, UserService } from '@/services';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-location-list-page',
  templateUrl: './profile-location-list-page.component.html',
  styleUrls: ['./profile-location-list-page.component.scss']
})
export class ProfileLocationListPageComponent implements OnDestroy {
  public isAdmin: boolean;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public locations$: Observable<LocationItem[]>;

  /**
   * Creates an instance of ProfileLocationListPageComponent.
   *
   * @param {LocationService} locationService
   * @param {ProfileService} profileService
   * @memberof ProfileLocationListPageComponent
   */
  constructor(
    private locationService: LocationService,
    private profileService: ProfileService,
    private userService: UserService
  ) {
    profileService.currentProfile$.pipe(takeUntil(this.destroy$)).subscribe((profile: Profile) => {
      if (profile && profile.id) {
        this.locations$ = locationService.getLocations(profile.id);
        this.userService.currentUser$.subscribe((user) => {
          if (user) {
            this.isAdmin = profile.id === user.id;
          }
        });
      }
    });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof ProfileLocationListPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
