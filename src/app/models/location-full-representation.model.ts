import { LocationRepresentation } from './location-representation.model';

export class LocationFullRepresentation extends LocationRepresentation {
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
    // Coordinates
    this.latitude = null;
    this.longitude = null;
    this.accuracy = null;
    // Address
    this.address1 = '';
    this.address2 = '';
    this.zipCode = null;
    // Details
    this.description = '';
  }
}
