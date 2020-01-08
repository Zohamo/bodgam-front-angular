import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationFormModule } from './components/location-form.module';

import { LocationEditPageComponent } from './pages/location-edit-page/location-edit-page.component';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';
import { LocationListComponent } from './components/location-list/location-list.component';

@NgModule({
  declarations: [LocationEditPageComponent, LocationDetailComponent, LocationListComponent],
  imports: [CommonModule, LocationsRoutingModule, LocationFormModule],
  exports: [LocationListComponent]
})
export class LocationsModule {}
