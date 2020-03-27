import { Component, OnDestroy } from '@angular/core';
import { Country, ProfileRepresentation } from '@/models';
import { CountriesWebService, ProfilesWebService } from '@/services';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// UI
import { faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profiles-page',
  templateUrl: './profiles-page.component.html',
  styleUrls: ['./profiles-page.component.scss']
})
export class ProfilesPageComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public profiles$: Observable<ProfileRepresentation[]>;
  public countries: Country[];

  // UI
  faUsers = faUsers;

  /**
   * Creates an instance of ProfilesPageComponent.
   *
   * @param {ProfilesWebService} profilesWebService
   * @param {CountriesWebService} countriesWebService
   * @memberof ProfilesPageComponent
   */
  constructor(private profilesWebService: ProfilesWebService, private countriesWebService: CountriesWebService) {
    this.getProfiles();
    this.getCountries();
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof ProfilesPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Get the profiles's list
   *
   * @private
   * @memberof ProfilesPageComponent
   */
  private getProfiles(): void {
    this.profiles$ = this.profilesWebService.getProfiles();
  }

  /**
   * Get the list of countries
   *
   * @private
   * @memberof ProfileEditPageComponent
   */
  private getCountries(): void {
    this.countriesWebService
      .getCountries()
      .pipe(takeUntil(this.destroy$))
      .subscribe((countries) => {
        this.countries = countries;
      });
  }
}
