/**
 * Front End representation of a location, used only with an array of locations
 *
 * @export
 * @class LocationItem
 */
export class LocationItem {
  id: number;
  name: string;
  isDefault: boolean;
  isPublic: boolean;
  // Address
  district: string;
  city: string;
  country: string;
  // Details
  isAllowedSmoking: boolean;
  isAccessible: boolean;
  // Timestamps
  deleted_at: string;

  constructor() {
    this.id = null;
    this.name = '';
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
