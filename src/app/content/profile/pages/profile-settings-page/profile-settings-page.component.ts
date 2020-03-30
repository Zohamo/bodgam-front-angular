import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Profile, ProfilePrivacy } from '@/models';
import { AlertService, ProfileService, UserService } from '@/services';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile-settings-page',
  templateUrl: './profile-settings-page.component.html',
  styleUrls: ['./profile-settings-page.component.scss']
})
export class ProfileSettingsPageComponent {
  public userId: number;
  public profileId: number;
  public profile$: Observable<Profile>;

  /**
   * Creates an instance of ProfileSettingsPageComponent.
   *
   * @param {AlertService} alertService
   * @param {ProfileService} profileService
   * @param {UserService} userService
   * @memberof ProfileSettingsPageComponent
   */
  constructor(
    private alertService: AlertService,
    private profileService: ProfileService,
    private userService: UserService
  ) {
    this.userId = userService.id;
    this.profileId = profileService.value.id;
    this.profile$ = profileService.currentProfile$;
  }

  /**
   * Call UserService to edit the profile's privacy.
   *
   * @param {ProfilePrivacy} privacy
   * @memberof ProfileSettingsPageComponent
   */
  public saveProfilePrivacy(privacy: ProfilePrivacy): void {
    this.profileService
      .saveProfilePrivacy(this.profileId, privacy)
      .pipe(first())
      .subscribe(
        (privacyResponse: ProfilePrivacy) => {
          console.log('saveProfilePrivacy OK', privacyResponse);
          this.alertService.open('success-save-profile');
        },
        (error: HttpErrorResponse) => {
          console.log('saveProfilePrivacy ERROR', error);
          this.alertService.open('error-save-profile');
        }
      );
  }

  /**
   * Call UserService to delete the user and profile.
   *
   * @memberof ProfileSettingsPageComponent
   */
  public deleteProfile(): void {
    if (this.userService.id === this.profileId) {
      this.userService
        .deleteUser(this.profileId)
        .pipe(first())
        .subscribe(
          (response) => {
            console.log('deleteProfile OK', response);
            this.alertService.open('success-delete-profile');
            this.userService.logout();
          },
          (error: HttpErrorResponse) => {
            console.log('deleteProfile ERROR', error);
            this.alertService.open('error-delete-profile');
          }
        );
    }
  }
}