import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Models
import { EventRepresentation } from '../../models/event-representation.model';
import { LocationRepresentation } from 'src/app/modules/locations/models/location-representation.model';

// Services
import { EventsWebService } from '../../services/events-web.service';
import { LocationsWebService } from 'src/app/modules/locations/services/locations-web.service';
import { SnackBarService } from '@shared/services/snack-bar.service';

// UI
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
    private locationsWebService: LocationsWebService,
    public snackBarService: SnackBarService
  ) {
    this.getEvent();
    this.event$.subscribe((event) => {
      this.getLocations();
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
   * Calls the EventsWebService to save an event
   *
   * @param {EventRepresentation} event
   * @memberof EventEditPageComponent
   */
  public saveEvent(event: EventRepresentation): void {
    this.eventsWebService.saveEvent(event).subscribe(
      (eventSaved) => {
        console.log('event saved', eventSaved);
        this.snackBarService.open('success-save-event');
      },
      (error) => {
        console.log('ERROR saving event', error);
        this.snackBarService.open('fail-save-event');
      }
    );
  }

  /**
   * Calls the LocationsWebService to get the user's locations
   *
   * @private
   * @memberof EventEditPageComponent
   */
  private getLocations(): void {
    this.locationsWebService.getLocations().subscribe((locations) => {
      this.userLocations = locations ? locations : [];
    });
  }
}
