import { Component, Input } from '@angular/core';
import { EventRepresentation } from '../../models/event-representation.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  @Input() events: EventRepresentation[];

  /**
   * TrackBy the events's list
   *
   * @param {*} index
   * @param {*} item
   * @returns {(number | null)}
   * @memberof EventListComponent
   */
  public eventTrackBy(index, item): number | null {
    return item ? item.id : null;
  }
}
