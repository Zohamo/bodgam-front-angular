import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsModule } from '../events/events.module';
import { GamesModule } from '../games/games.module';
import { LocationsModule } from '../locations/locations.module';
import { SharedModule } from '@shared/shared.module';
// Components
import * as fromComponents from './components';
import * as fromPages from './pages';
// Entry Components
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
  declarations: [...fromComponents.components, ...fromPages.components],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
  entryComponents: [ProfileFormDialogComponent]
})
export class UsersModule {}
