import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

// Models
import { HttpErrorResponse } from '@angular/common/http';
import { UserFullRepresentation } from '../../models/user-full-representation.model';
import { BggGameRepresentation } from '@shared/models/bgg/bgg-game-representation.model';
import { EventRepresentation } from 'src/app/modules/events/models/event-representation.model';
import { LocationRepresentation } from 'src/app/modules/locations/models/location-representation.model';

// Services
import { UsersWebService } from '../../services/users-web.service';
import { BggWebService } from '@shared/services/bgg-web.service';
import { EventsWebService } from 'src/app/modules/events/services/events-web.service';

// UI
import { faCalendarAlt, faCogs, faDice, faMapMarked, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { LocationsWebService } from 'src/app/modules/locations/services/locations-web.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public user$: Observable<UserFullRepresentation>;
  public games: BggGameRepresentation[];
  public events: EventRepresentation[];
  public locations: LocationRepresentation[];
  // TODO : user comments
  public comments: any[];

  // Booleans
  public isLoadingGames = true;
  public isLoadingEvents = true;
  public isLoadingLocations = true;

  // Font Awesome
  faCalendarAlt = faCalendarAlt;
  faCogs = faCogs;
  faDice = faDice;
  faMapMarked = faMapMarked;
  faUser = faUser;
  faUserCircle = faUserCircle;

  /**
   * Creates an instance of UserPageComponent.
   *
   * @param {ActivatedRoute} route
   * @param {UsersWebService} usersWebService
   * @param {BggWebService} bggWebService
   * @memberof UserPageComponent
   */
  constructor(
    private route: ActivatedRoute,
    private usersWebService: UsersWebService,
    private bggWebService: BggWebService,
    private eventsWebService: EventsWebService,
    private locationsWebService: LocationsWebService
  ) {
    this.getUser();
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user: UserFullRepresentation) => {
      if (user.bggName) {
        this.getGames(user.bggName);
      }
      if (user.id) {
        this.getEvents(user.id);
        this.getLocations();
      }
    });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof UserPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Get the user's data
   *
   * @private
   * @memberof UserPageComponent
   */
  private getUser(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.usersWebService.getUser(+params.get('id')))
    );
  }

  /**
   * Call BGG API to retrieve the user's games list
   *
   * @private
   * @param {string} bggName
   * @memberof UserPageComponent
   */
  private getGames(bggName: string): void {
    this.bggWebService
      .getCollection(bggName)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (games: BggGameRepresentation[]) => {
          this.games = games && games.length > 0 ? games : null;
          this.isLoadingGames = false;
        },
        (error: HttpErrorResponse) => {
          console.log('bgg getCollection error', error);
          this.isLoadingGames = false;
        }
      );
  }

  /**
   * Get the user's event list from the web service
   *
   * @private
   * @param {number} userId
   * @memberof UserPageComponent
   */
  private getEvents(userId: number): void {
    this.eventsWebService
      .getEvents(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (events) => {
          this.events = events && events.length > 0 ? events : null;
          this.isLoadingEvents = false;
        },
        (error: HttpErrorResponse) => {
          console.log('getEvents error', error);
          this.isLoadingEvents = false;
        }
      );
  }

  /**
   * Get the user's location list from the web service
   *
   * @private
   * @memberof UserPageComponent
   */
  private getLocations(): void {
    this.locationsWebService
      .getLocations()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (locations) => {
          this.locations = locations && locations.length > 0 ? locations : null;
          this.isLoadingLocations = false;
        },
        (error: HttpErrorResponse) => {
          console.log('getLocations error', error);
          this.isLoadingLocations = false;
        }
      );
  }

  /**
   * Edit the user's data privacy through the web service
   *
   * @param {UserFullRepresentation} user
   * @memberof UserPageComponent
   */
  public updateUserPrivacy(user: UserFullRepresentation): void {
    this.usersWebService
      .updateUserPrivacy(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (userResponse: UserFullRepresentation) => {
          console.log('updateUserPrivacy OK', userResponse);
        },
        (error: HttpErrorResponse) => {
          console.log('updateUserPrivacy ERROR', error);
        }
      );
  }
}
