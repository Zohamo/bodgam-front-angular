import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material';
import { SnackBarMessageComponent } from './snack-bar-message.component';

@NgModule({
  imports: [CommonModule, MatSnackBarModule],
  declarations: [SnackBarMessageComponent],
  exports: [SnackBarMessageComponent]
})
export class SnackBarMessageModule {}
