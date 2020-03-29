import { Component } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Country, ProfileRepresentation } from '@/models';
import { ProfileService, CountryService } from '@/services';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile-list-page',
  templateUrl: './profile-list-page.component.html',
  styleUrls: ['./profile-list-page.component.scss']
})
export class ProfileListPageComponent {
  public profiles$: Observable<ProfileRepresentation[]>;
  public countries: Country[];

  // UI
  faUsers = faUsers;

  /**
   * Creates an instance of ProfileListPageComponent.
   *
   * @param {ProfileService} profileService
   * @param {CountryService} countryService
   * @memberof ProfileListPageComponent
   */
  constructor(private profileService: ProfileService, private countryService: CountryService) {
    this.getProfiles();
    this.getCountries();
  }

  /**
   * Get the profiles's list
   *
   * @private
   * @memberof ProfileListPageComponent
   */
  private getProfiles(): void {
    this.profiles$ = this.profileService.getProfiles();
  }

  /**
   * Get the list of countries
   *
   * @private
   * @memberof ProfileEditPageComponent
   */
  private getCountries(): void {
    this.countryService
      .getCountries()
      .pipe(first())
      .subscribe((countries: Country[]) => {
        this.countries = countries;
      });
  }
}
