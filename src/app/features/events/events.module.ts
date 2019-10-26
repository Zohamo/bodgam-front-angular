import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Pages
import { EventEditPageComponent } from './pages/event-edit-page/event-edit-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
// Components
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventListItemComponent } from './components/event-list/event-list-item/event-list-item.component';
import { LocationFormComponent } from '../locations/components/location-form/location-form.component';
// Material
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatNativeDateModule,
  MatSelectModule,
  MatRadioModule,
  MatIconModule,
  MatCheckboxModule
} from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { EventLevelComponent } from './shared/components/event-level/event-level.component';
import { EventAtmosphereComponent } from './shared/components/event-atmosphere/event-atmosphere.component';
import { UiSpinnerComponent } from 'src/app/shared/ui/ui-spinner/ui-spinner.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocationDetailIconsModule } from '../locations/components/location-detail/location-detail-icons/location-detail-icons.module';

@NgModule({
  declarations: [
    EventsPageComponent,
    EventFormComponent,
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
    MatCardModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    LocationDetailIconsModule
  ],
  exports: [EventsPageComponent],
  entryComponents: [LocationFormComponent, UiSpinnerComponent]
})
export class EventsModule {}
