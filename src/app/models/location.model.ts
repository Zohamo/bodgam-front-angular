import { LocationItem } from './location-item.model';
import { GeoCoordinates } from './geo-coordinates.model';

export class Location extends LocationItem {
  // Coordinates
  latitude: number;
  longitude: number;
  accuracy: number;
  // Address
  address1: string;
  address2: string;
  zipCode: number;
  // Details
  description: string;

  constructor() {
    super();
    const coords: GeoCoordinates = new GeoCoordinates();
    // Coordinates
    this.latitude = coords.latitude;
    this.longitude = coords.longitude;
    this.accuracy = coords.accuracy;
    // Address
    this.address1 = '';
    this.address2 = '';
    this.zipCode = null;
    // Details
    this.description = '';
  }
}
