import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-atmosphere',
  templateUrl: './event-atmosphere.component.html',
  styleUrls: ['./event-atmosphere.component.scss']
})
export class EventAtmosphereComponent {
  @Input() value: number;
}
