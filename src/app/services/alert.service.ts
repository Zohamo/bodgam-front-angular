import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackBarMessageComponent } from '@/components/snack-bar-message/snack-bar-message.component';
import { AppConfig } from 'src/app/config/app.config';

@Injectable({ providedIn: 'root' })
export class AlertService {
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
   * @param {string} message
   * @memberof SnackBarService
   */
  public open(message: string): void {
    this.snackBar.openFromComponent(SnackBarMessageComponent, {
      data: message,
      duration: AppConfig.SNACK_BAR_DURATION
    });
  }
}
