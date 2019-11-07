import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPlayersComponent } from './event-players/event-players.component';
import { EventLevelComponent } from './event-level/event-level.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [EventPlayersComponent, EventLevelComponent],
  imports: [CommonModule, FontAwesomeModule, MatButtonModule],
  exports: [EventPlayersComponent]
})
export class EventPlayersModule {}
