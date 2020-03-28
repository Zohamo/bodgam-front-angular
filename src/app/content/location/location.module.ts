import { NgModule } from '@angular/core';
// Imports
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationRoutingModule } from './location-routing.module';
import { LocationUiModule } from './location-ui.module';
// Declarations
import * as fromComponents from './components';
import * as fromPages from './pages';
// Entry Components
import { LocationDetailDialogComponent, LocationFormDialogComponent } from './components';
// Exports
import { LocationDetailIconsComponent, LocationListComponent } from './components';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LocationRoutingModule, LocationUiModule],
  declarations: [...fromComponents.components, ...fromPages.components],
  entryComponents: [LocationDetailDialogComponent, LocationFormDialogComponent],
  exports: [LocationListComponent, LocationDetailIconsComponent]
})
export class LocationModule {}
