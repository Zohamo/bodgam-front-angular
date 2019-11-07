import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
// Pages
import { EventEditPageComponent } from './pages/event-edit-page/event-edit-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
// Components
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventListItemComponent } from './components/event-list/event-list-item/event-list-item.component';
import { LocationFormComponent } from '../locations/components/location-form/location-form.component';
// Modules
import { EventFormModule } from './components/event-form.module';
import { EventLocationModule } from './shared/components/event-location.module';
import { EventPlayersModule } from './shared/components/event-players.module';
import { EventTimeslotModule } from './shared/components/event-timeslot.module';
import { LocationDetailIconsModule } from '../locations/components/location-detail/location-detail-icons/location-detail-icons.module';
// UI
import {
  MatCardModule,
  MatExpansionModule,
  MatButtonModule,
  MatNativeDateModule,
  MatIconModule
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UiModule } from 'src/app/shared/ui/ui.module';

@NgModule({
  declarations: [
    EventsPageComponent,
    EventEditPageComponent,
    EventPageComponent,
    EventDetailComponent,
    EventListItemComponent,
    EventListComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    EventFormModule,
    EventLocationModule,
    EventPlayersModule,
    EventTimeslotModule,
    LocationDetailIconsModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatNativeDateModule,
    MatIconModule,
    FontAwesomeModule,
    UiModule
  ],
  exports: [EventsPageComponent],
  entryComponents: [LocationFormComponent]
})
export class EventsModule {}
