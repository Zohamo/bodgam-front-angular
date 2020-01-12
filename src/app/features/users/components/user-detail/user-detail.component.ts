import { Component, Input } from '@angular/core';
import moment from 'moment';

// Models
import { UserFullRepresentation } from '../../models/user-full-representation.model';

// UI
import {
  faEnvelope,
  faGenderless,
  faGlobe,
  faMapMarked,
  faMars,
  faMobileAlt,
  faVenus
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  // Font Awesome
  faEnvelope = faEnvelope;
  faGenderless = faGenderless;
  faGlobe = faGlobe;
  faMapMarked = faMapMarked;
  faMars = faMars;
  faMobileAlt = faMobileAlt;
  faVenus = faVenus;

  // Inputs

  public user: UserFullRepresentation;
  @Input() set userDetail(userDetail: UserFullRepresentation) {
    this.user = userDetail;
  }

  /**
   * Format the birthdate for display
   *
   * @param {number} birthdate
   * @returns {string}
   * @memberof UserDetailComponent
   */
  public formatBirthdate(birthdate: number): string {
    return moment
      .unix(birthdate)
      .locale('fr')
      .format('D MMMM YYYY');
  }

  /**
   * Build the BGG url for display
   *
   * @param {string} bggName
   * @returns {string}
   * @memberof UserDetailComponent
   */
  public bggUserUrl(bggName: string): string {
    return `https://boardgamegeek.com/user/${bggName}`;
  }

  /**
   * Format the website for display
   *
   * @param {string} website
   * @returns {string}
   * @memberof UserDetailComponent
   */
  public shortWebsite(website: string): string {
    return website.split('://')[1];
  }
}
