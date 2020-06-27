import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackBarMessageComponent } from '@/components/snack-bar-message/snack-bar-message.component';
import { AppConfig } from '@/config';

@Injectable({ providedIn: 'root' })
export class AlertService {
  /**
   * Creates an instance of AlertService.
   *
   * @param {MatSnackBar} snackBar
   * @memberof AlertService
   */
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Open Material Snack Bar
   *
   * @param {string} message
   * @param {*} [input]
   * @memberof AlertService
   */
  public open(message: string, data?: any, type?: any): void {
    this.snackBar.openFromComponent(SnackBarMessageComponent, {
      data: { message, data, type },
      duration: AppConfig.SNACK_BAR_DURATION
    });
  }
}
