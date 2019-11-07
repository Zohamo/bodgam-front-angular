import { Component, Input } from '@angular/core';
import moment from 'moment';
// Font Awesome
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-timeslot',
  templateUrl: './event-timeslot.component.html',
  styleUrls: ['./event-timeslot.component.scss']
})
export class EventTimeslotComponent {
  // Font Awesome
  faCalendar = faCalendar;
  faClock = faClock;

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

  @Input() set startDatetime(startDatetime: number) {
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
  }

  @Input() set endDatetime(endDatetime: number) {
    this.endTimeHour = moment.unix(endDatetime).format('HH');
    this.endTimeMinutes = moment.unix(endDatetime).format('mm');
  }
}
