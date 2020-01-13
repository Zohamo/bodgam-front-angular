import { Component, Input } from '@angular/core';
import { UserRatingsRepresentation } from '../../models/user-ratings-representation.model';

@Component({
  selector: 'app-user-ratings',
  templateUrl: './user-ratings.component.html',
  styleUrls: ['./user-ratings.component.scss']
})
export class UserRatingsComponent {
  // Inputs

  public ratings: UserRatingsRepresentation;
  @Input() set userRatings(userRatings: UserRatingsRepresentation) {
    this.ratings = userRatings;
  }

  /**
   * Calculate the average from an array of numbers
   *
   * @param {number[]} values
   * @returns {number}
   * @memberof UserRatingComponent
   */
  public average(values: number[]): number {
    return values.reduce((previous, current) => (current += previous)) / values.length;
  }

  /**
   * Calculate the global average of all ratings
   *
   * @param {UserRatingsRepresentation} ratings
   * @returns {number}
   * @memberof UserRatingsComponent
   */
  public globalAverage(ratings: UserRatingsRepresentation): number {
    const values = [];
    for (const key in ratings) {
      if (ratings.hasOwnProperty(key)) {
        values.push(this.average(ratings[key]));
      }
    }
    return this.average(values);
  }
}
