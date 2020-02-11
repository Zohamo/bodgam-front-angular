import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

// Models
import { EventRepresentation } from '../../models/event-representation.model';
import { LocationFullRepresentation } from 'src/app/modules/locations/models/location-full-representation';

// Services
import { EventsWebService } from '../../services/events-web.service';
import { LocationsWebService } from 'src/app/modules/locations/services/locations-web.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

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
    this.event$.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      this.getLocation(event.location.id);
    });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof EventPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
    this.locationsWebService
      .getLocation(locationId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((location) => {
        this.location = location;
      });
  }
}
