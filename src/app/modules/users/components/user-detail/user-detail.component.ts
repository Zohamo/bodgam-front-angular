import { Component, Input } from '@angular/core';
import moment from 'moment';

// Entry Components
import { ProfileFormDialogComponent } from '../profile-form-dialog/profile-form-dialog.component';

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
  faPenSquare,
  faVenus
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';

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
  faPenSquare = faPenSquare;
  faVenus = faVenus;

  // Inputs

  public user: UserFullRepresentation;
  @Input() set userDetail(userDetail: UserFullRepresentation) {
    this.user = userDetail;
  }

  /**
   * Creates an instance of UserDetailComponent.
   *
   * @param {MatDialog} dialog
   * @memberof UserDetailComponent
   */
  constructor(private dialog: MatDialog) {}

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

  /**
   * Open a dialog to edit the profile
   *
   * @param {number} userId
   * @memberof UserDetailComponent
   */
  public openProfileFormDialog(userId: number): void {
    console.log('userId', userId);
    const dialogRef = this.dialog.open(ProfileFormDialogComponent, {
      data: { id: userId }
    });

    dialogRef.afterClosed().subscribe((profileSaved: UserFullRepresentation) => {
      console.log('profileSaved', profileSaved);
      if (profileSaved) {
        this.user = profileSaved;
      }
    });
  }
}
