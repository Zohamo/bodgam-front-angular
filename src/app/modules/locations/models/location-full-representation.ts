import { LocationRepresentation } from "./location-representation.model";

export class LocationFullRepresentation extends LocationRepresentation {
  // Coordinates
  coordsLatitude: number;
  coordsLongitude: number;
  coordsAccuracy: number;
  // Address
  addressField1: string;
  addressField2: string;
  addressZipCode: number;
  // Details
  description: string;

  constructor() {
    super();
    // Coordinates
    this.coordsLatitude = null;
    this.coordsLongitude = null;
    this.coordsAccuracy = null;
    // Address
    this.addressField1 = "";
    this.addressField2 = "";
    this.addressZipCode = null;
    // Details
    this.description = "";
  }
}
