import { Component, Input } from '@angular/core';
import { EventRepresentation } from '../../../models/event-representation.model';
// Font Awesome
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss']
})
export class EventListItemComponent {
  // Font Awesome
  faEye = faEye;
  faEdit = faEdit;

  public startDateDayName: string;
  public startDateDayNumber: string;
  public startDateMonth: string;

  public event: EventRepresentation;
  @Input() set eventItem(eventItem: EventRepresentation) {
    this.event = eventItem;
  }
}
