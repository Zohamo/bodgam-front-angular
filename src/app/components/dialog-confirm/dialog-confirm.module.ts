import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatDialogModule],
  declarations: [DialogConfirmComponent],
  exports: [DialogConfirmComponent]
})
export class DialogConfirmModule {}
