import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EventRepresentation, LocationRepresentation } from '@/models';
import { AlertService, UserService, EventService, LocationService } from '@/services';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil, first } from 'rxjs/operators';

// UI
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-edit-page',
  templateUrl: './event-edit-page.component.html',
  styleUrls: ['./event-edit-page.component.scss']
})
export class EventEditPageComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public event$: Observable<EventRepresentation>;
  public userLocations: LocationRepresentation[];

  // UI

  faCalendarPlus = faCalendarPlus;

  /**
   * Creates an instance of EventEditPageComponent.
   *
   * @param {AlertService} alertService
   * @param {UserService} userService
   * @param {EventService} eventService
   * @param {LocationService} locationService
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @memberof EventEditPageComponent
   */
  constructor(
    public alertService: AlertService,
    private userService: UserService,
    private eventService: EventService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getEvent();
    this.event$.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      this.getLocations();
    });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof EventEditPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Calls the EventService to get an event by its id
   *
   * @private
   * @memberof EventEditPageComponent
   */
  private getEvent(): void {
    if (this.route) {
      this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
        switch (data.name) {
          case 'create':
            this.event$ = of(new EventRepresentation());
            break;
          case 'edit':
            this.event$ = this.route.paramMap.pipe(
              switchMap((params: ParamMap) => this.eventService.getEvent(+params.get('id')))
            );
            break;
        }
      });
    }
  }

  /**
   * Calls the EventService to save an event
   *
   * @param {EventRepresentation} event
   * @memberof EventEditPageComponent
   */
  public saveEvent(event: EventRepresentation): void {
    this.eventService
      .saveEvent(event)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (eventSaved: EventRepresentation) => {
          console.log('event saved', eventSaved);
          this.alertService.open('success-save-event');
          this.router.navigate(['events', eventSaved.id]);
        },
        (error) => {
          console.log('ERROR saving event', error);
          this.alertService.open('error-save-event');
        }
      );
  }

  /**
   * Calls the LocationService to get the user's locations
   *
   * @private
   * @memberof EventEditPageComponent
   */
  private getLocations(): void {
    this.locationService
      .getLocations(this.userService.id)
      .pipe(first())
      .subscribe((locations) => {
        this.userLocations = locations ? locations : [];
      });
  }
}
