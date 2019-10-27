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
import { EventLevelComponent } from './shared/components/event-level/event-level.component';
import { EventAtmosphereComponent } from './shared/components/event-atmosphere/event-atmosphere.component';
// Modules
import { EventFormModule } from './components/event-form.module';
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
import { UiSpinnerComponent } from 'src/app/shared/ui/ui-spinner/ui-spinner.component';

@NgModule({
  declarations: [
    EventsPageComponent,
    EventEditPageComponent,
    EventPageComponent,
    EventDetailComponent,
    EventListItemComponent,
    EventListComponent,
    EventLevelComponent,
    EventAtmosphereComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    LocationDetailIconsModule,
    EventFormModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatNativeDateModule,
    MatIconModule,
    FontAwesomeModule
  ],
  exports: [EventsPageComponent],
  entryComponents: [LocationFormComponent, UiSpinnerComponent]
})
export class EventsModule {}
