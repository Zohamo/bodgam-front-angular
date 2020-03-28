import { NgModule } from '@angular/core';
// Imports
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventModule } from '../event/event.module';
import { GameModule } from '../game/game.module';
import { LocationModule } from '../location/location.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileUiModule } from './profile-ui.module';
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
    EventModule,
    GameModule,
    LocationModule,
    ProfileRoutingModule,
    ProfileUiModule
  ],
  declarations: [...fromComponents.components, ...fromPages.components],
  entryComponents: [DialogConfirmComponent, ProfileFormDialogComponent]
})
export class ProfileModule {}
