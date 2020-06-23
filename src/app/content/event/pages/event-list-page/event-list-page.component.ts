import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendarAlt, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { EventBg, User } from '@/models';
import { EventService, AuthService, AlertService } from '@/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-list-page',
  templateUrl: './event-list-page.component.html',
  styleUrls: ['./event-list-page.component.scss']
})
export class EventListPageComponent {
  public events$: Observable<EventBg[]>;
  public filteredEvents$: Observable<EventBg[]>;
  public user: User;

  // Font Awesome
  faCalendarAlt = faCalendarAlt;
  faCalendarPlus = faCalendarPlus;

  /**
   * Creates an instance of EventListPageComponent.
   *
   * @param {EventService} eventService
   * @memberof EventListPageComponent
   */
  constructor(
    public alertService: AlertService,
    private eventService: EventService,
    private router: Router,
    private authService: AuthService
  ) {
    this.events$ = eventService.getEvents();
    authService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  /**
   * Set the filtered events from the EventsFiltersComponent.
   *
   * @param {Observable<EventBg[]>} filteredEvents$
   * @memberof EventListPageComponent
   */
  public setFilteredEvents(filteredEvents$: Observable<EventBg[]>): void {
    this.filteredEvents$ = filteredEvents$;
  }

  /**
   * Goto Event creation if a User is logged in.
   *
   * @memberof EventListPageComponent
   */
  public gotoEventsCreate(): void {
    this.user ? this.router.navigate(['/events', 'create']) : this.alertService.open('must-login');
  }
}
