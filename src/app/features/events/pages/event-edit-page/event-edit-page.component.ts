import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventRepresentation } from '../../models/event-representation.model';
import { LocationRepresentation } from 'src/app/features/locations/models/location-representation.model';
import { EventsWebService } from '../../services/events-web.service';
import { LocationsWebService } from 'src/app/features/locations/services/locations-web.service';
// Font Awesome
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-edit-page',
  templateUrl: './event-edit-page.component.html',
  styleUrls: ['./event-edit-page.component.scss']
})
export class EventEditPageComponent implements OnDestroy {
  // Font Awesome
  faCalendarPlus = faCalendarPlus;

  public event$: Observable<EventRepresentation>;
  public userLocations: LocationRepresentation[];
  // public locations$: Observable<LocationRepresentation[]>;

  private routeParamSubscribe: Subscription;

  /**
   * Creates an instance of EventEditPageComponent.
   *
   * @param {ActivatedRoute} route
   * @param {EventsWebService} eventsWebService
   * @param {LocationsWebService} locationsWebService
   * @memberof EventEditPageComponent
   */
  constructor(
    private route: ActivatedRoute,
    private eventsWebService: EventsWebService,
    private locationsWebService: LocationsWebService
  ) {
    this.getEvent();
    this.event$.subscribe((event) => {
      if (event.host) {
        this.getLocations(event.host.id);
      }
    });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof EventEditPageComponent
   */
  ngOnDestroy() {
    if (this.routeParamSubscribe) {
      this.routeParamSubscribe.unsubscribe();
    }
  }

  /**
   * Calls the EventsWebService to get an event by its id
   *
   * @private
   * @memberof EventEditPageComponent
   */
  private getEvent(): void {
    if (this.route) {
      this.routeParamSubscribe = this.route.data.subscribe((data) => {
        switch (data.name) {
          case 'create':
            this.event$ = of(new EventRepresentation());
            break;
          case 'edit':
            this.event$ = this.route.paramMap.pipe(
              switchMap((params: ParamMap) => this.eventsWebService.getEvent(+params.get('id')))
            );
            break;
        }
      });
    }
  }

  /**
   * Calls the LocationsWebService to get the user's locations
   *
   * @private
   * @param {number} userId
   * @memberof EventEditPageComponent
   */
  private getLocations(userId: number): void {
    this.locationsWebService.getLocations(userId).subscribe((locations) => {
      this.userLocations = locations ? locations : [];
    });
  }
}
