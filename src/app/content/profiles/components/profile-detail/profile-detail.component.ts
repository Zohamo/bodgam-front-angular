import { Component, Input } from '@angular/core';
import { ProfileFullRepresentation } from '@/models';
import moment from 'moment';
import { take } from 'rxjs/operators';

// Components
import { ProfileFormDialogComponent } from '../profile-form-dialog/profile-form-dialog.component';

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
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent {
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

  public profile: ProfileFullRepresentation;
  @Input() set profileDetail(profileDetail: ProfileFullRepresentation) {
    this.profile = profileDetail;
  }

  /**
   * Creates an instance of ProfileDetailComponent.
   *
   * @param {MatDialog} dialog
   * @memberof ProfileDetailComponent
   */
  constructor(private dialog: MatDialog) {}

  /**
   * Format the birthdate for display
   *
   * @param {number} birthdate
   * @returns {string}
   * @memberof ProfileDetailComponent
   */
  public formatBirthdate(birthdate: number): string {
    return moment(birthdate)
      .locale('fr')
      .format('D MMMM YYYY');
  }

  /**
   * Build the BGG url for display
   *
   * @param {string} bggName
   * @returns {string}
   * @memberof ProfileDetailComponent
   */
  public bggProfileUrl(bggName: string): string {
    return `https://boardgamegeek.com/profile/${bggName}`;
  }

  /**
   * Format the website for display
   *
   * @param {string} website
   * @returns {string}
   * @memberof ProfileDetailComponent
   */
  public shortWebsite(website: string): string {
    return website.split('://')[1];
  }

  /**
   * Open a dialog to edit the profile
   *
   * @param {number} profileId
   * @memberof ProfileDetailComponent
   */
  public openProfileFormDialog(profileId: number): void {
    console.log('profileId', profileId);
    const dialogRef = this.dialog.open(ProfileFormDialogComponent, {
      data: { id: profileId }
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((profileSaved: ProfileFullRepresentation) => {
        console.log('profileSaved', profileSaved);
        if (profileSaved) {
          this.profile = profileSaved;
        }
      });
  }
}
