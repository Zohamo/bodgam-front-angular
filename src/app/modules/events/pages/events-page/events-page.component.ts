import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventsWebService } from '../../services/events-web.service';
import { EventRepresentation } from '../../models/event-representation.model';
import { faCalendarAlt, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  faCalendarAlt = faCalendarAlt;
  faCalendarPlus = faCalendarPlus;
  public events$: Observable<EventRepresentation[]>;

  /**
   * Creates an instance of EventsPageComponent.
   *
   * @param {EventsWebService} eventsWebService
   * @memberof EventsPageComponent
   */
  constructor(private eventsWebService: EventsWebService) {}

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties
   *
   * @memberof EventsPageComponent
   */
  ngOnInit() {
    this.getEvents();
  }

  /**
   * Call EventsWebService to get the events
   *
   * @private
   * @memberof EventsPageComponent
   */
  private getEvents(): void {
    this.events$ = this.eventsWebService.getEvents();
  }
}
