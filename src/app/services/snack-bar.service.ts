import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackBarMessageComponent } from '@/components/snack-bar-message/snack-bar-message.component';
import { AppConfig } from '@/config';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  /**
   * Creates an instance of SnackBarService.
   *
   * @param {MatSnackBar} snackBar
   * @memberof SnackBarService
   */
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Open Material Snack Bar
   *
   * @param {string} messageKey
   * @memberof SnackBarService
   */
  public open(messageKey: string): void {
    this.snackBar.openFromComponent(SnackBarMessageComponent, {
      data: messageKey,
      duration: AppConfig.SNACK_BAR_DURATION
    });
  }
}
