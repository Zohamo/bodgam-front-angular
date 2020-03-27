import { NgModule } from '@angular/core';
// Imports
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsUiModule } from './locations-ui.module';
// Declarations
import * as fromComponents from './components';
import * as fromPages from './pages';
// Entry Components
import { LocationDetailDialogComponent, LocationFormDialogComponent } from './components';
// Exports
import { LocationDetailIconsComponent, LocationListComponent } from './components';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LocationsRoutingModule, LocationsUiModule],
  declarations: [...fromComponents.components, ...fromPages.components],
  entryComponents: [LocationDetailDialogComponent, LocationFormDialogComponent],
  exports: [LocationListComponent, LocationDetailIconsComponent]
})
export class LocationsModule {}
