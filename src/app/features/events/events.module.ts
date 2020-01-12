import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from '@shared/shared.module';
// Components
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { LocationFormComponent } from '../locations/components/location-form/location-form.component';
// Modules
import { LocationDetailIconsModule } from '../locations/components/location-detail/location-detail-icons/location-detail-icons.module';
// UI
import { MatCardModule, MatExpansionModule, MatButtonModule, MatNativeDateModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as fromComponents from './components';
import * as fromPages from './pages';
import * as fromSharedComponents from './shared/components';
export const uiModules: any[] = [
  FontAwesomeModule,
  MatCardModule,
  MatExpansionModule,
  MatButtonModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [...fromComponents.components, ...fromPages.components, ...fromSharedComponents.components],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ...fromComponents.modules,
    ...fromSharedComponents.modules,
    LocationDetailIconsModule,
    ...uiModules,
    SharedModule
  ],
  exports: [EventsPageComponent, EventListComponent],
  entryComponents: [LocationFormComponent]
})
export class EventsModule {}
