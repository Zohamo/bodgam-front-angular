import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import {
  PasswordForgotDialogComponent,
  UserLoginDialogComponent,
  UserRegisterDialogComponent
} from '@/auth/components';
import { MatDialog, MatDialogRef } from '@angular/material';
import { first, takeUntil } from 'rxjs/operators';
import { DialogService } from './services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * Creates an instance of AppComponent.
   *
   * @param {MatDialog} dialog
   * @param {DialogService} dialogService
   * @memberof AppComponent
   */
  constructor(private dialog: MatDialog, private dialogService: DialogService) {
    this.dialogService.open$.pipe(takeUntil(this.destroy$)).subscribe((dialogName: string) => {
      const dialogRef: MatDialogRef<any> = this.dialog.open(this.getComponent(dialogName));

      dialogRef
        .afterClosed()
        .pipe(first())
        .subscribe((data: any) => {
          this.dialogService.setAfterClosedData(data);
        });
    });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof EventEditPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Get the component from the dialog's name
   *
   * @private
   * @param {string} dialogName
   * @returns {(ComponentType<any> | TemplateRef<any>)}
   * @memberof AppComponent
   */
  private getComponent(dialogName: string): ComponentType<any> | TemplateRef<any> {
    switch (dialogName) {
      case 'password-forgot':
        return PasswordForgotDialogComponent;
      case 'user-login':
        return UserLoginDialogComponent;
      case 'user-register':
        return UserRegisterDialogComponent;
    }
  }
}
