import { Component } from '@angular/core';
import { faDungeon } from '@fortawesome/free-solid-svg-icons';
import { AppInfo } from '@/config';
import moment from 'moment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public author = AppInfo.AUTHOR;
  public version = AppInfo.VERSION;
  public startYear = AppInfo.STARTYEAR;
  public currentYear = moment().year();
  public title = AppInfo.TITLE;

  // Font Awesome
  public faDungeon = faDungeon;
}
