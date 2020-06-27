import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * - Control the dialog opened by AppComponent
 * - Avoid Circular dependency of dialog components
 *
 * @export
 * @class DialogService
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public open$: Subject<any> = new Subject<any>();
  public afterClosedData$: Subject<any> = new Subject<any>();

  /**
   * AppComponent subscribes to this Observable,
   * waiting to open a dialog
   *
   * @param {string} dialogName
   * @memberof DialogService
   */
  public open(dialogName: string): void {
    this.open$.next(dialogName);
  }

  /**
   * Nullify the dialog Observable's value
   *
   * @memberof DialogService
   */
  public close(): void {
    this.open$.next(null);
  }

  /**
   * Set the afterClosedData$ Observable
   *
   * @param {*} data
   * @memberof DialogService
   */
  public setAfterClosedData(data: any): void {
    this.afterClosedData$.next(data);
    if (data && data.openDialog) {
      this.open(data.openDialog);
    }
  }
}
