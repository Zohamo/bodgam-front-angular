import { Component, Input } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-event-date',
  templateUrl: './event-date.component.html',
  styleUrls: ['./event-date.component.scss']
})
export class EventDateComponent {
  public dateDayNameShort: string;
  public dateDayNumber: string;
  public dateMonthShort: string;

  /**
   * Inputs
   */

  @Input() set date(date: number) {
    this.dateDayNameShort = moment(date)
      .locale('fr')
      .format('ddd');
    this.dateDayNumber = moment(date).format('D');
    this.dateMonthShort = moment(date)
      .locale('fr')
      .format('MMM');
  }
}
