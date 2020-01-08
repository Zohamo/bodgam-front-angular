import { Component, Input, Output, EventEmitter } from '@angular/core';
/**
 * Example : https://stackblitz.com/edit/angular-material-star-rating-i2f93q?file=app%2Fstar-rating%2Fstar-rating.component.html
 *
 * @export
 * @class UiRatingComponent
 */
@Component({
  selector: 'app-ui-rating',
  templateUrl: './ui-rating.component.html',
  styleUrls: ['./ui-rating.component.scss']
})
export class UiRatingComponent {
  @Input() private rating: number;
  @Input() public editable = false;
  @Input() public size: 'sm' | 'lg';

  @Output() private ratingUpdated = new EventEmitter();

  public ratingArr = [];

  /**
   * Creates an instance of UiRatingComponent.
   *
   * @memberof UiRatingComponent
   */
  constructor() {
    this.buildRatingArr(5);
  }

  /**
   * Build the array to display items
   *
   * @memberof UiRatingComponent
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
   * @memberof UiRatingComponent
   */
  showIcon(index: number): string {
    return this.rating >= index + 1 ? 'star' : this.rating >= index + 0.5 ? 'star_half' : 'star_border';
  }

  /**
   * Event to change the rating value
   *
   * @param {number} rating
   * @memberof UiRatingComponent
   */
  onRate(rating: number): void {
    this.ratingUpdated.emit(rating);
  }
}
