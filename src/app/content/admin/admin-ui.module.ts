import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from '@/components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, SpinnerModule, FontAwesomeModule, MatButtonModule],
  exports: [SpinnerModule, FontAwesomeModule, MatButtonModule]
})
export class AdminUiModule {}
