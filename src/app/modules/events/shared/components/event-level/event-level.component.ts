import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-level',
  templateUrl: './event-level.component.html',
  styleUrls: ['./event-level.component.scss']
})
export class EventLevelComponent {
  @Input() value: number;
}
