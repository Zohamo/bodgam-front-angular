import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LocationDetailIconsComponent } from './location-detail-icons.component';

@NgModule({
  declarations: [LocationDetailIconsComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [LocationDetailIconsComponent]
})
export class LocationDetailIconsModule {}
