import { Component, Input } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-ui-date',
  templateUrl: './ui-date.component.html',
  styleUrls: ['./ui-date.component.scss']
})
export class UiDateComponent {
  public dateDayNameShort: string;
  public dateDayNumber: string;
  public dateMonthShort: string;

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
