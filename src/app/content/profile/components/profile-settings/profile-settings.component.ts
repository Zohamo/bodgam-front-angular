import { Component, Output, EventEmitter } from '@angular/core';

// Components
import { DialogConfirmComponent } from '@/components/dialog-confirm/dialog-confirm.component';

// UI
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent {
  // UI
  faTrash = faTrash;

  /**
   * Outputs
   */
  @Output() deleteProfile = new EventEmitter();

  /**
   * Creates an instance of ProfileSettingsComponent.
   *
   * @param {MatDialog} dialog
   * @memberof ProfileSettingsComponent
   */
  constructor(private dialog: MatDialog) {}

  /**
   * Open a Dialog to confirm the deletion of the profile
   *
   * @memberof ProfileSettingsComponent
   */
  public onDeleteProfile(): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { message: 'delete-profile' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteProfile.emit();
      }
    });
  }
}
