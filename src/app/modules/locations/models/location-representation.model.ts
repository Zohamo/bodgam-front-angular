/**
 * Front End representation of a location, used only with an array of locations
 *
 * @export
 * @class LocationRepresentation
 */
export class LocationRepresentation {
  id: number;
  name: string;
  isDisabled: boolean;
  isDefault: boolean;
  isPublic: boolean;
  // Address
  district: string;
  city: string;
  country: string;
  // Details
  isAllowedSmoking: boolean;
  isAccessible: boolean;

  constructor() {
    this.id = null;
    this.name = '';
    this.isDisabled = true;
    this.isDefault = false;
    this.isPublic = false;
    // Address
    this.district = '';
    this.city = '';
    this.country = '';
    // Details
    this.isAllowedSmoking = true;
    this.isAccessible = true;
  }
}
