import { Component, Input } from '@angular/core';
import { LocationRepresentation } from '../../models/location-representation.model';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent {
  @Input() locations: LocationRepresentation;
}
