import { Component } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Country, ProfileItem } from '@/models';
import { ProfileService, CountryService } from '@/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-list-page',
  templateUrl: './profile-list-page.component.html',
  styleUrls: ['./profile-list-page.component.scss']
})
export class ProfileListPageComponent {
  public profiles$: Observable<ProfileItem[]>;
  public countries: Country[];

  // Font Awesome
  faUsers = faUsers;

  /**
   * Creates an instance of ProfileListPageComponent.
   *
   * @param {ProfileService} profileService
   * @param {CountryService} countryService
   * @memberof ProfileListPageComponent
   */
  constructor(private profileService: ProfileService, private countryService: CountryService) {
    this.profiles$ = this.profileService.getProfiles();
    this.countries = this.countryService.getCountries();
  }
}
