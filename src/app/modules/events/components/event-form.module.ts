import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventFormComponent } from './event-form/event-form.component';
// UI
import { LocationDetailIconsModule } from 'src/app/modules/locations/components/location-detail/location-detail-icons/location-detail-icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [EventFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LocationDetailIconsModule,
    FontAwesomeModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  exports: [EventFormComponent]
})
export class EventFormModule {}
