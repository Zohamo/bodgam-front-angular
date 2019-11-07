import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventLocationComponent } from './event-location/event-location.component';
import { LocationDetailIconsModule } from '../../../locations/components/location-detail/location-detail-icons/location-detail-icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [EventLocationComponent],
  imports: [CommonModule, LocationDetailIconsModule, FontAwesomeModule, MatButtonModule],
  exports: [EventLocationComponent]
})
export class EventLocationModule {}
