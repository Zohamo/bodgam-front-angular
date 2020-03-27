import { NgModule } from '@angular/core';
// Imports
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventsModule } from '../events/events.module';
import { GamesModule } from '../games/games.module';
import { LocationsModule } from '../locations/locations.module';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesUiModule } from './profiles-ui.module';
// Declarations
import * as fromComponents from './components';
import * as fromPages from './pages';
// Entry Components
import { DialogConfirmComponent } from '@/components/dialog-confirm/dialog-confirm.component';
import { ProfileFormDialogComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EventsModule,
    GamesModule,
    LocationsModule,
    ProfilesRoutingModule,
    ProfilesUiModule
  ],
  declarations: [...fromComponents.components, ...fromPages.components],
  entryComponents: [DialogConfirmComponent, ProfileFormDialogComponent]
})
export class ProfilesModule {}
