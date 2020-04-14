import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  declarations: [DialogConfirmComponent],
  exports: [DialogConfirmComponent]
})
export class DialogConfirmModule {}
