import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventRepresentation } from '../../models/event-representation.model';
import { LocationFullRepresentation } from 'src/app/features/locations/models/location-full-representation';
import { EventsWebService } from '../../services/events-web.service';
import { LocationsWebService } from 'src/app/features/locations/services/locations-web.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent {
  public event$: Observable<EventRepresentation>;
  public location: LocationFullRepresentation;

  /**
   * Creates an instance of EventPageComponent.
   *
   * @param {ActivatedRoute} route
   * @param {EventsWebService} eventsWebService
   * @param {LocationsWebService} locationsWebService
   * @memberof EventPageComponent
   */
  constructor(
    private route: ActivatedRoute,
    private eventsWebService: EventsWebService,
    private locationsWebService: LocationsWebService
  ) {
    this.getEvent();
    this.event$.subscribe((event) => {
      this.getLocation(event.location.id);
    });
  }

  /**
   * Calls the EventsWebService to get an event by its id
   *
   * @private
   * @memberof EventPageComponent
   */
  private getEvent(): void {
    this.event$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.eventsWebService.getEvent(+params.get('id')))
    );
  }

  /**
   * Calls the LocationsWebService to get the event's location
   *
   * @private
   * @param {number} locationId
   * @memberof EventPageComponent
   */
  private getLocation(locationId: number): void {
    this.locationsWebService.getLocation(locationId).subscribe((location) => {
      this.location = location;
    });
  }
}
