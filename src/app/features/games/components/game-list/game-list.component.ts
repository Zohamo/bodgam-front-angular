import { Component, Input } from '@angular/core';
import { BggGameRepresentation } from '@shared/models/bgg/bgg-game-representation.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {
  @Input() games: BggGameRepresentation;
}
