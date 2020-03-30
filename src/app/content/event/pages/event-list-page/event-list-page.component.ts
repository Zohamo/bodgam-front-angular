import { Component } from '@angular/core';
import { faCalendarAlt, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { EventBg } from '@/models';
import { EventService } from '@/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-list-page',
  templateUrl: './event-list-page.component.html',
  styleUrls: ['./event-list-page.component.scss']
})
export class EventListPageComponent {
  public events$: Observable<EventBg[]>;

  public isUserList: boolean;

  faCalendarAlt = faCalendarAlt;
  faCalendarPlus = faCalendarPlus;

  /**
   * Creates an instance of EventListPageComponent.
   *
   * @param {EventService} eventService
   * @memberof EventListPageComponent
   */
  constructor(private eventService: EventService) {
    this.events$ = eventService.getEvents();
  }
}
