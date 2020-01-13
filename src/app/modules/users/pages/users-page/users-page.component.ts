import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersWebService } from '../../services/users-web.service';
import { UserRepresentation } from '../../models/user-representation.model';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { CountriesWebService } from '@shared/services/countries-web.service';
import { Country } from '@shared/models/country.model';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {
  faUsers = faUsers;
  public users$: Observable<UserRepresentation[]>;
  public countries: Country[];

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
    this.countriesWebService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }
}
