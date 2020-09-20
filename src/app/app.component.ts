import { Component, Inject, LOCALE_ID } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Creates an instance of AppComponent.
   *
   * @param {string} locale
   * @memberof AppComponent
   */
  constructor(@Inject(LOCALE_ID) public locale: string) {
    // TODO : for internationalization
    // moment.locale(locale.split('-')[0]);
    moment.locale('fr');
  }
}
