import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventTimeslotComponent } from './event-timeslot/event-timeslot.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [EventTimeslotComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [EventTimeslotComponent]
})
export class EventTimeslotModule {}
