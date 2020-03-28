import { Component, Input } from '@angular/core';
import { BggGameRepresentation } from '@/models';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {
  @Input() games: BggGameRepresentation;
}
