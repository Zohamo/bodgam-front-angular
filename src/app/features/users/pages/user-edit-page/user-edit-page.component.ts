import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsersWebService } from '../../services/users-web.service';
import { UserFullRepresentation } from '../../models/user-full-representation.model';
import { CountriesWebService } from '@shared/services/countries-web.service';
import { Country } from '@shared/models/country.model';
import { BggGameRepresentation } from '@shared/models/bgg/bgg-game-representation.model';
import { BggWebService } from '@shared/services/bgg-web.service';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.scss']
})
export class UserEditPageComponent implements OnDestroy {
  public user$: Observable<UserFullRepresentation>;
  public countries: Country[];
  public games: BggGameRepresentation[];
  private routeParamSubscribe: Subscription;

  /**
   * Creates an instance of UserEditPageComponent.
   *
   * @param {ActivatedRoute} route
   * @param {UsersWebService} usersWebService
   * @param {CountriesWebService} countriesWebService
   * @param {BggWebService} bggWebService
   * @memberof UserEditPageComponent
   */
  constructor(
    private route: ActivatedRoute,
    private usersWebService: UsersWebService,
    private countriesWebService: CountriesWebService,
    private bggWebService: BggWebService
  ) {
    this.getUser();
    this.getCountries();
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof UserEditPageComponent
   */
  ngOnDestroy() {
    if (this.routeParamSubscribe) {
      this.routeParamSubscribe.unsubscribe();
    }
  }

  /**
   * Get the user data
   *
   * @private
   * @memberof UserEditPageComponent
   */
  private getUser(): void {
    if (this.route) {
      this.routeParamSubscribe = this.route.data.subscribe((data) => {
        switch (data.name) {
          case 'create':
            this.user$ = of(new UserFullRepresentation());
            break;
          case 'edit':
            this.user$ = this.route.paramMap.pipe(
              switchMap((params: ParamMap) => this.usersWebService.getUser(+params.get('id')))
            );
            break;
        }
      });
    }
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

  /**
   * Call BGG API to retrieve the user's games list
   *
   * @param {string} bggName
   * @memberof UserEditPageComponent
   */
  public getGames(bggName: string): void {
    this.bggWebService.getCollection(bggName).subscribe((games) => {
      this.games = games;
    });
  }

  /**
   * Create or Edit the user's data through the web service
   *
   * @param {UserFullRepresentation} user
   * @memberof UserEditPageComponent
   */
  public updateUser(user: UserFullRepresentation): void {
    if (!user.id) {
      this.usersWebService.createUser(user).subscribe(
        (userResponse: UserFullRepresentation) => {
          console.log('createUser OK', userResponse);
        },
        (error) => {
          console.log('createUser ERROR', error);
        }
      );
    } else {
      this.usersWebService.updateUser(user).subscribe(
        (userResponse: UserFullRepresentation) => {
          console.log('updateUser OK', userResponse);
        },
        (error) => {
          console.log('updateUser ERROR', error);
        }
      );
    }
  }
}
