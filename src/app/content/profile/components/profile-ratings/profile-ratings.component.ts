import { Component, Input } from '@angular/core';
import { ProfileRatings } from '@/models';

@Component({
  selector: 'app-profile-ratings',
  templateUrl: './profile-ratings.component.html',
  styleUrls: ['./profile-ratings.component.scss']
})
export class ProfileRatingsComponent {
  // Inputs

  public ratings: ProfileRatings;
  @Input() set profileRatings(profileRatings: ProfileRatings) {
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
    return Array.isArray(values) && values.length
      ? values.reduce((previous, current) => (current += previous)) / values.length
      : null;
  }

  /**
   * Calculate the global average of all ratings
   *
   * @param {ProfileRatings} ratings
   * @returns {number}
   * @memberof ProfileRatingsComponent
   */
  public globalAverage(ratings: ProfileRatings): number {
    const values = [];
    for (const key in ratings) {
      if (ratings.hasOwnProperty(key)) {
        values.push(this.average(ratings[key]));
      }
    }
    return this.average(values);
  }
}
