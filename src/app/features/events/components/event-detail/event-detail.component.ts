import { Component, Input } from '@angular/core';
import { EventRepresentation } from '../../models/event-representation.model';
import moment from 'moment';
// Font Awesome
import { faCalendar, faUsers, faClock, faBuilding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  // Font Awesome
  faCalendar = faCalendar;
  faUsers = faUsers;
  faClock = faClock;
  faBuilding = faBuilding;

  public startDateDayName: string;
  public startDateDayNameShort: string;
  public startDateDayNumber: string;
  public startDateMonth: string;
  public startDateMonthShort: string;
  public startDateYear: string;
  public startTimeHour: string;
  public startTimeMinutes: string;
  public endTimeHour: string;
  public endTimeMinutes: string;

  public event: EventRepresentation;
  @Input() set eventDetail(eventDetail: EventRepresentation) {
    this.event = eventDetail;
    this.setDateDetails(this.event.startDatetime, this.event.endDatetime);
  }

  private setDateDetails(startDatetime: number, endDatetime: number): void {
    // Start
    this.startDateDayName = moment
      .unix(startDatetime)
      .locale('fr')
      .format('dddd');
    this.startDateDayNameShort = moment
      .unix(startDatetime)
      .locale('fr')
      .format('ddd');
    this.startDateDayNumber = moment.unix(startDatetime).format('D');
    this.startDateMonth = moment
      .unix(startDatetime)
      .locale('fr')
      .format('MMMM');
    this.startDateMonthShort = moment
      .unix(startDatetime)
      .locale('fr')
      .format('MMM');
    this.startDateYear = moment.unix(startDatetime).format('YYYY');
    this.startTimeHour = moment.unix(startDatetime).format('HH');
    this.startTimeMinutes = moment.unix(startDatetime).format('mm');
    // End
    if (endDatetime) {
      this.endTimeHour = moment.unix(endDatetime).format('HH');
      this.endTimeMinutes = moment.unix(endDatetime).format('mm');
    }
  }
}
