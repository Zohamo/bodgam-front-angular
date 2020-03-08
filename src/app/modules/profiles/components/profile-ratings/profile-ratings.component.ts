import { Component, Input } from '@angular/core';
import { ProfileRatingsRepresentation } from '../../models/profile-ratings-representation.model';

@Component({
  selector: 'app-profile-ratings',
  templateUrl: './profile-ratings.component.html',
  styleUrls: ['./profile-ratings.component.scss']
})
export class ProfileRatingsComponent {
  // Inputs

  public ratings: ProfileRatingsRepresentation;
  @Input() set profileRatings(profileRatings: ProfileRatingsRepresentation) {
    console.log('set profileRatings', profileRatings);
    if (profileRatings) {
      this.ratings = profileRatings;
    }
  }

  /**
   * Calculate the average from an array of numbers
   *
   * @param {number[]} values
   * @returns {number}
   * @memberof ProfileRatingComponent
   */
  public average(values: number[]): number {
    // console.log('average values', values);
    return Array.isArray(values) && values.length
      ? values.reduce((previous, current) => (current += previous)) / values.length
      : null;
  }

  /**
   * Calculate the global average of all ratings
   *
   * @param {ProfileRatingsRepresentation} ratings
   * @returns {number}
   * @memberof ProfileRatingsComponent
   */
  public globalAverage(ratings: ProfileRatingsRepresentation): number {
    const values = [];
    for (const key in ratings) {
      if (ratings.hasOwnProperty(key)) {
        values.push(this.average(ratings[key]));
      }
    }
    return this.average(values);
  }
}
