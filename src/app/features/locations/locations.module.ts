import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { LocationsRoutingModule } from './locations-routing.module';
import { SharedModule } from '@shared/shared.module';
// Components
import * as fromComponents from './components';
import * as fromPages from './pages';
import { LocationListComponent } from './components/location-list/location-list.component';

@NgModule({
  declarations: [...fromComponents.components, ...fromPages.components],
  imports: [CommonModule, LocationsRoutingModule, SharedModule],
  exports: [LocationListComponent]
})
export class LocationsModule {}
