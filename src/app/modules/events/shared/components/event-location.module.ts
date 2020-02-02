import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventLocationComponent } from './event-location/event-location.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material';
import { LocationsModule } from 'src/app/modules/locations/locations.module';

@NgModule({
  declarations: [EventLocationComponent],
  imports: [CommonModule, LocationsModule, FontAwesomeModule, MatButtonModule],
  exports: [EventLocationComponent]
})
export class EventLocationModule {}
