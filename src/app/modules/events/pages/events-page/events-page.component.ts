import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventsWebService } from '../../services/events-web.service';
import { EventRepresentation } from '../../models/event-representation.model';
import { faCalendarAlt, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationWebService } from '@core/services/authentication-web.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public events$: Observable<EventRepresentation[]>;

  public isUserList: boolean;

  faCalendarAlt = faCalendarAlt;
  faCalendarPlus = faCalendarPlus;

  /**
   * Creates an instance of EventsPageComponent.
   *
   * @param {EventsWebService} eventsWebService
   * @memberof EventsPageComponent
   */
  constructor(
    private route: ActivatedRoute,
    private eventsWebService: EventsWebService,
    private authenticationWebService: AuthenticationWebService
  ) {}

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties
   *
   * @memberof EventsPageComponent
   */
  ngOnInit(): void {
    this.getEvents();
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof EventsPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Call EventsWebService to get the events
   *
   * @private
   * @memberof EventsPageComponent
   */
  private getEvents(): void {
    if (this.route) {
      this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
        switch (data.name) {
          case 'listAll':
            this.isUserList = false;
            this.events$ = this.eventsWebService.getEvents();
            break;
          case 'userList':
            this.isUserList = true;
            this.events$ = this.eventsWebService.getEvents(this.authenticationWebService.currentUserValue.id);
            break;
        }
      });
    }
  }
}
