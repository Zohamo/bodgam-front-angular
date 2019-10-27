import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { UiDateComponent } from './ui-date/ui-date.component';
import { UiSpinnerComponent } from './ui-spinner/ui-spinner.component';
// Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [UiDateComponent, UiSpinnerComponent],
  exports: [UiDateComponent, UiSpinnerComponent]
})
export class UiModule {}
