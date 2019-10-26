import { Component, Input } from '@angular/core';
import { EventRepresentation } from '../../../models/event-representation.model';
import { LOCALE_ID } from '@angular/core';
import moment from 'moment';
// Font Awesome
import { faUsers, faBuilding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss']
})
export class EventListItemComponent {
  // Font Awesome
  faUsers = faUsers;
  faBuilding = faBuilding;

  public startDateDayName: string;
  public startDateDayNumber: string;
  public startDateMonth: string;

  public event: EventRepresentation;
  @Input() set eventItem(eventItem: EventRepresentation) {
    this.event = eventItem;
    this.startDateDayName = moment
      .unix(this.event.startDatetime)
      .locale('fr')
      .format('ddd');
    this.startDateDayNumber = moment.unix(this.event.startDatetime).format('D');
    this.startDateMonth = moment
      .unix(this.event.startDatetime)
      .locale('fr')
      .format('MMM');
  }
}
