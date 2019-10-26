import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';

import { LocationEditPageComponent } from './pages/location-edit-page/location-edit-page.component';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, LocationsRoutingModule, LocationEditPageComponent, LocationDetailComponent]
})
export class LocationsModule {}
