import { Component, Inject } from '@angular/core';
import { LocationFullRepresentation } from '../../models/location-full-representation';
import { GeoCoordinates } from '@shared/models/geo-coordinates.model';
import { LocationsWebService } from '../../services/locations-web.service';

// UI
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-location-detail-dialog',
  templateUrl: './location-detail-dialog.component.html',
  styleUrls: ['./location-detail-dialog.component.scss']
})
export class LocationDetailDialogComponent {
  faBuilding = faBuilding;
  public location: LocationFullRepresentation;
  public address: string;
  public coords: GeoCoordinates = new GeoCoordinates();
  public triggerCenterMap = false;

  constructor(
    public dialogRef: MatDialogRef<LocationDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private locationsWebService: LocationsWebService
  ) {
    console.log('data', data);
    this.locationsWebService.getLocation(data.id).subscribe(
      (location: LocationFullRepresentation) => {
        if (location) {
          this.location = location;
          this.buildAddress();
          this.buildCoords();
        }
      },
      (error) => {
        console.log('ERROR getting location', error);
      }
    );
  }

  /**
   * Build the address to display
   *
   * @private
   * @memberof LocationDetailDialogComponent
   */
  private buildAddress(): void {
    const sep = ', ';
    this.address = `${this.location.addressField1}${
      this.location.addressField1 && this.location.addressDistrict ? sep : ''
    }${this.location.addressDistrict} ${this.location.addressZipCode} ${this.location.addressCity}${sep}${
      this.location.addressCountry
    }`.trim();
  }

  /**
   * Build the coords to display the map
   *
   * @private
   * @memberof LocationDetailDialogComponent
   */
  private buildCoords(): void {
    this.coords.accuracy = this.location.coordsAccuracy;
    this.coords.latitude = this.location.coordsLatitude;
    this.coords.longitude = this.location.coordsLongitude;
  }

  /**
   * Event to recenter the map
   *
   * @memberof LocationDetailDialogComponent
   */
  public onCenterMap(): void {
    this.triggerCenterMap = !this.triggerCenterMap;
  }
}
