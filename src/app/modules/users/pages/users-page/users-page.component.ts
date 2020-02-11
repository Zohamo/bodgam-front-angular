import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Models
import { Country } from '@shared/models/country.model';
import { UserRepresentation } from '../../models/user-representation.model';

// Services
import { CountriesWebService } from '@shared/services/countries-web.service';
import { UsersWebService } from '../../services/users-web.service';

// UI
import { faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public users$: Observable<UserRepresentation[]>;
  public countries: Country[];

  // UI
  faUsers = faUsers;

  /**
   * Creates an instance of UsersPageComponent.
   *
   * @param {UsersWebService} usersWebService
   * @param {CountriesWebService} countriesWebService
   * @memberof UsersPageComponent
   */
  constructor(private usersWebService: UsersWebService, private countriesWebService: CountriesWebService) {
    this.getUsers();
    this.getCountries();
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof UsersPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Get the users's list
   *
   * @private
   * @memberof UsersPageComponent
   */
  private getUsers(): void {
    this.users$ = this.usersWebService.getUsers();
  }

  /**
   * Get the list of countries
   *
   * @private
   * @memberof UserEditPageComponent
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
