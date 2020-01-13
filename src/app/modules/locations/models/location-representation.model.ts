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
  addressDistrict: string;
  addressCity: string;
  addressCountry: string;
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
    this.addressDistrict = '';
    this.addressCity = '';
    this.addressCountry = '';
    // Details
    this.isAllowedSmoking = true;
    this.isAccessible = true;
  }
}
