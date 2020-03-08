import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent {
  /**
   * Creates an instance of DialogConfirmComponent.
   *
   * @param {MatDialogRef<DialogConfirmComponent>} dialogRef
   * @param {string} data
   * @memberof DialogConfirmComponent
   */
  constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {}

  /**
   * On Event, close the Dialog and return true
   *
   * @memberof DialogConfirmComponent
   */
  public onConfirm(): void {
    this.dialogRef.close(true);
  }

  /**
   * On Event, close the Dialog and return false
   *
   * @memberof DialogConfirmComponent
   */
  onClose(): void {
    this.dialogRef.close(false);
  }
}
