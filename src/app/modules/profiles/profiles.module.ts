import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { ProfilesRoutingModule } from './profiles-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsModule } from '../events/events.module';
import { GamesModule } from '../games/games.module';
import { LocationsModule } from '../locations/locations.module';
import { SharedModule } from '@shared/shared.module';
// Components
import * as fromComponents from './components';
import * as fromPages from './pages';
// Entry Components
import { DialogConfirmComponent } from '@shared/components';
import { ProfileFormDialogComponent } from './components/profile-form-dialog/profile-form-dialog.component';
// UI
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    FontAwesomeModule,
    EventsModule,
    GamesModule,
    LocationsModule,
    SharedModule
  ],
  declarations: [...fromComponents.components, ...fromPages.components],
  entryComponents: [DialogConfirmComponent, ProfileFormDialogComponent]
})
export class ProfilesModule {}
