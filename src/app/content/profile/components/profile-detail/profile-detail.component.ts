import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
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
import { Profile } from '@/models';
import { CountryService } from '@/services';
import moment from 'moment';
import { first } from 'rxjs/operators';

import { ProfileFormDialogComponent } from '../profile-form-dialog/profile-form-dialog.component';

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

  /**
   * Inputs
   */

  @Input() profile: Profile;
  @Input() isAdmin: boolean;

  /**
   * Creates an instance of ProfileDetailComponent.
   *
   * @param {MatDialog} dialog
   * @memberof ProfileDetailComponent
   */
  constructor(private dialog: MatDialog, private countryService: CountryService) {}

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
   * Call CountryService to get the country's name from the isoCode.
   *
   * @param {string} isoCode
   * @returns {string}
   * @memberof ProfileDetailComponent
   */
  public getCountryName(isoCode: string): string {
    return this.countryService.getCountry(isoCode).name;
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
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(ProfileFormDialogComponent, {
        data: this.profile
      });

      dialogRef
        .afterClosed()
        .pipe(first())
        .subscribe((profileSaved: Profile) => {
          console.log('profileSaved', profileSaved);
          if (profileSaved) {
            this.profile = profileSaved;
          }
        });
    }
  }
}
