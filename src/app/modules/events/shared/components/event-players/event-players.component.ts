import { Component, Input } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { EventRepresentation } from '../../../models/event-representation.model';

@Component({
  selector: 'app-event-players',
  templateUrl: './event-players.component.html',
  styleUrls: ['./event-players.component.scss']
})
export class EventPlayersComponent {
  faUsers = faUsers;
  @Input() event: EventRepresentation;
}
