import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EventRepresentation } from '@/models';
import { EventsWebService } from '@/services';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
