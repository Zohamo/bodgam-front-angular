import { Component } from '@angular/core';
import { Profile } from '@/models';
import { Observable } from 'rxjs';
import { ProfileService, AuthService } from '@/services';

@Component({
  selector: 'app-profile-detail-page',
  templateUrl: './profile-detail-page.component.html',
  styleUrls: ['./profile-detail-page.component.scss']
})
export class ProfileDetailPageComponent {
  public userId: number;
  public profile$: Observable<Profile>;

  /**
   * Creates an instance of ProfileDetailPageComponent.
   *
   * @param {ProfileService} profileService
   * @memberof ProfileDetailPageComponent
   */
  constructor(private profileService: ProfileService, private authService: AuthService) {
    this.userId = authService.id;
    this.profile$ = profileService.currentProfile$;
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
