import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { UiDateComponent } from './ui-date/ui-date.component';
import { UiFormHelperComponent } from './ui-form-helper/ui-form-helper.component';
import { UiRatingComponent } from './ui-rating/ui-rating.component';
import { UiSpinnerComponent } from './ui-spinner/ui-spinner.component';
import { UiVisibilityComponent } from './ui-visibility/ui-visibility.component';
// UI
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { UiMapComponent } from './ui-map/ui-map.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  declarations: [
    UiDateComponent,
    UiFormHelperComponent,
    UiMapComponent,
    UiRatingComponent,
    UiSpinnerComponent,
    UiVisibilityComponent
  ],
  exports: [
    UiDateComponent,
    UiFormHelperComponent,
    UiMapComponent,
    UiRatingComponent,
    UiSpinnerComponent,
    UiVisibilityComponent
  ]
})
export class UiModule {}
