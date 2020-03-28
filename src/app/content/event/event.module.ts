import { NgModule } from '@angular/core';
// Imports
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { EventUiModule } from './event-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationModule } from '@/content/location/location.module';
// Declarations
import * as fromComponents from './components';
import * as fromPages from './pages';
import * as fromSharedComponents from './shared/components';
// Exports
import { EventListComponent } from './components';
import { EventsPageComponent } from './pages';

@NgModule({
  declarations: [...fromComponents.components, ...fromPages.components, ...fromSharedComponents.components],
  imports: [CommonModule, EventRoutingModule, EventUiModule, FormsModule, ReactiveFormsModule, LocationModule],
  exports: [EventsPageComponent, EventListComponent]
})
export class EventModule {}
