import { Component, Input } from '@angular/core';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { LocationRepresentation } from 'src/app/modules/locations/models/location-representation.model';

@Component({
  selector: 'app-event-location',
  templateUrl: './event-location.component.html',
  styleUrls: ['./event-location.component.scss']
})
export class EventLocationComponent {
  faBuilding = faBuilding;
  @Input() location: LocationRepresentation;
}
