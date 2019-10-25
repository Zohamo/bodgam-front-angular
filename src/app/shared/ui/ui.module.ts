import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { UiSpinnerComponent } from './ui-spinner/ui-spinner.component';
// Material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [UiSpinnerComponent],
  exports: [UiSpinnerComponent]
})
export class UiModule {}
