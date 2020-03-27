import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Example : https://stackblitz.com/edit/angular-material-star-rating-i2f93q?file=app%2Fstar-rating%2Fstar-rating.component.html
 *
 * @export
 * @class RatingComponent
 */
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() private rating: number;
  @Input() public editable = false;
  @Input() public size: 'sm' | 'lg';

  @Output() private ratingUpdated = new EventEmitter();

  public ratingArr = [];

  /**
   * Creates an instance of RatingComponent.
   *
   * @memberof RatingComponent
   */
  constructor() {
    this.buildRatingArr(5);
  }

  /**
   * Build the array to display items
   *
   * @memberof RatingComponent
   */
  private buildRatingArr(itemCount: number): void {
    for (let index = 0; index < itemCount; index++) {
      this.ratingArr.push(index);
    }
  }

  /**
   * Returns the icon to display : full, half-full or empty
   *
   * @param {number} index
   * @returns {string}
   * @memberof RatingComponent
   */
  public showIcon(index: number): string {
    return this.rating >= index + 1 ? 'star' : this.rating >= index + 0.5 ? 'star_half' : 'star_border';
  }

  /**
   * Event to change the rating value
   *
   * @param {number} rating
   * @memberof RatingComponent
   */
  public onRate(rating: number): void {
    this.ratingUpdated.emit(rating);
  }
}
