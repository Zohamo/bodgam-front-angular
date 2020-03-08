import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// Models
import { EventRepresentation } from '../../models/event-representation.model';

// Services
import { EventsWebService } from '../../services/events-web.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent {
  public event$: Observable<EventRepresentation>;

  /**
   * Creates an instance of EventPageComponent.
   *
   * @param {ActivatedRoute} route
   * @param {EventsWebService} eventsWebService
   * @memberof EventPageComponent
   */
  constructor(private route: ActivatedRoute, private eventsWebService: EventsWebService) {
    this.getEvent();
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
}
