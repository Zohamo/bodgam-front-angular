import { Component } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Country, ProfileItem, Profile } from '@/models';
import { AlertService, CountryService, ProfileService, UserService } from '@/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.scss']
})
export class AdminUsersPageComponent {
  public profiles$: Observable<ProfileItem[]>;
  public countries: Country[];
  public deletedUserId: number;

  // Font Awesome
  faUsers = faUsers;

  /**
   * Creates an instance of AdminUsersPageComponent.
   *
   * @param {AlertService} alertService
   * @param {CountryService} countryService
   * @param {ProfileService} profileService
   * @param {UserService} userService
   * @memberof AdminUsersPageComponent
   */
  constructor(
    private alertService: AlertService,
    private countryService: CountryService,
    private profileService: ProfileService,
    private userService: UserService
  ) {
    this.profiles$ = this.profileService.getProfiles();
    this.countries = this.countryService.getCountries();
  }

  /**
   * Call UserService to delete a User & Profile.
   *
   * @param {ProfileItem} profile
   * @memberof AdminUsersPageComponent
   */
  public deleteUser(profile: ProfileItem) {
    this.userService.deleteUser(profile.id).subscribe(
      (res) => {
        console.log('DELETE USER', res);
        this.deletedUserId = profile.id;
        this.alertService.open('success-delete-user', profile.name);
      },
      (error) => {
        console.log('ERROR DELETE USER', error);
        this.alertService.open('error-delete-user', profile.name);
      }
    );
  }
}
