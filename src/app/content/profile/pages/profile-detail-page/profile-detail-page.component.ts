import { Component, OnDestroy } from '@angular/core';
import { Profile, User } from '@/models';
import { Observable, Subject } from 'rxjs';
import { ProfileService, UserService } from '@/services';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-detail-page',
  templateUrl: './profile-detail-page.component.html',
  styleUrls: ['./profile-detail-page.component.scss']
})
export class ProfileDetailPageComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public userId: number;
  public profile$: Observable<Profile>;

  /**
   * Creates an instance of ProfileDetailPageComponent.
   *
   * @param {ProfileService} profileService
   * @memberof ProfileDetailPageComponent
   */
  constructor(private profileService: ProfileService, private userService: UserService) {
    this.userService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe((user: User) => {
      if (user) {
        this.userId = user.id;
      }
    });
    this.profile$ = profileService.currentProfile$;
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof ProfileDetailPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Call ProfileService to edit the profile.
   *
   * @param {Profile} profile
   * @memberof ProfileDetailPageComponent
   */
  public saveProfile(profile: Profile): void {
    this.profile$ = this.profileService.saveProfile(profile);
  }
}
