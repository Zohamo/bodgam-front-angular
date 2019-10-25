import { Component, Input } from '@angular/core';
import { EventRepresentation } from '../../models/event-representation.model';
import moment from 'moment';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  public startDateDayName: string;
  public startDateDayNumber: string;
  public startDateMonth: string;
  public startDateYear: string;

  public event: EventRepresentation;
  @Input() set eventDetail(eventDetail: EventRepresentation) {
    this.event = eventDetail;
    this.startDateDayName = moment
      .unix(this.event.startDatetime)
      .locale('fr')
      .format('dddd');
    this.startDateDayNumber = moment.unix(this.event.startDatetime).format('D');
    this.startDateMonth = moment
      .unix(this.event.startDatetime)
      .locale('fr')
      .format('MMMM');
    this.startDateYear = moment.unix(this.event.startDatetime).format('YYYY');
  }
}
