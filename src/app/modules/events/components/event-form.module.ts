import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventFormComponent } from './event-form/event-form.component';
import { LocationsModule } from '../../locations/locations.module';
// UI
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
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
    LocationsModule,
    FontAwesomeModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  exports: [EventFormComponent]
})
export class EventFormModule {}
