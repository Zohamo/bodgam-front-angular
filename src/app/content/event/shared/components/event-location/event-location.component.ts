import { Component, Input } from '@angular/core';
import { LocationRepresentation } from '@/models';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-location',
  templateUrl: './event-location.component.html',
  styleUrls: ['./event-location.component.scss']
})
export class EventLocationComponent {
  faBuilding = faBuilding;
  @Input() location: LocationRepresentation;
}
