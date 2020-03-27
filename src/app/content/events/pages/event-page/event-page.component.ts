import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EventRepresentation } from '@/models';
import { EventService } from '@/services';
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
   * @param {EventService} eventService
   * @memberof EventPageComponent
   */
  constructor(private route: ActivatedRoute, private eventService: EventService) {
    this.getEvent();
  }

  /**
   * Calls the EventService to get an event by its id
   *
   * @private
   * @memberof EventPageComponent
   */
  private getEvent(): void {
    this.event$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.eventService.getEvent(+params.get('id')))
    );
  }
}
