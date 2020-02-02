import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { LocationsRoutingModule } from './locations-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
// Components
import * as fromComponents from './components';
import * as fromPages from './pages';
import { LocationListComponent } from './components/location-list/location-list.component';
import { LocationDetailDialogComponent } from './components/location-detail-dialog/location-detail-dialog.component';
import { LocationDetailIconsComponent } from './components/location-detail-icons/location-detail-icons.component';
// UI
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSliderModule,
  MatTableModule
} from '@angular/material';
import { SnackBarMessageComponent } from '@shared/components/snack-bar-message/snack-bar-message.component';

@NgModule({
  declarations: [...fromComponents.components, ...fromPages.components],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTableModule
  ],
  exports: [LocationListComponent, LocationDetailIconsComponent],
  entryComponents: [LocationDetailDialogComponent, SnackBarMessageComponent]
})
export class LocationsModule {}
