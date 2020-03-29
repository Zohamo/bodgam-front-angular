import { Component, Input } from '@angular/core';
import { EventBg } from '@/models';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-players',
  templateUrl: './event-players.component.html',
  styleUrls: ['./event-players.component.scss']
})
export class EventPlayersComponent {
  faUsers = faUsers;
  @Input() event: EventBg;
}
