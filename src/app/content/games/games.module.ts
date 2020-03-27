import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { GameListComponent } from './components/game-list/game-list.component';

@NgModule({
  declarations: [GameListComponent],
  imports: [CommonModule, GamesRoutingModule],
  exports: [GameListComponent]
})
export class GamesModule {}
