import { NgModule } from '@angular/core';
// Imports
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { EventsUiModule } from './events-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationsModule } from '@/content/locations/locations.module';
// Declarations
import * as fromComponents from './components';
import * as fromPages from './pages';
import * as fromSharedComponents from './shared/components';
// Exports
import { EventListComponent } from './components';
import { EventsPageComponent } from './pages';

@NgModule({
  declarations: [...fromComponents.components, ...fromPages.components, ...fromSharedComponents.components],
  imports: [CommonModule, EventsRoutingModule, EventsUiModule, FormsModule, ReactiveFormsModule, LocationsModule],
  exports: [EventsPageComponent, EventListComponent]
})
export class EventsModule {}
