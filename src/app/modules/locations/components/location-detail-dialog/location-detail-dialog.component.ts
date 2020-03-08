import { Component, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Models
import { LocationFullRepresentation } from '../../models/location-full-representation';
import { GeoCoordinates } from '@shared/models/geo-coordinates.model';

// Services
import { LocationsWebService } from '../../services/locations-web.service';

// UI
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-location-detail-dialog',
  templateUrl: './location-detail-dialog.component.html',
  styleUrls: ['./location-detail-dialog.component.scss']
})
export class LocationDetailDialogComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public location: LocationFullRepresentation;
  public address: string;
  public coords: GeoCoordinates = new GeoCoordinates();
  public triggerCenterMap = false;

  // UI
  faBuilding = faBuilding;

  /**
   * Creates an instance of LocationDetailDialogComponent.
   *
   * @param {MatDialogRef<LocationDetailDialogComponent>} dialogRef
   * @param {*} data
   * @param {LocationsWebService} locationsWebService
   * @memberof LocationDetailDialogComponent
   */
  constructor(
    public dialogRef: MatDialogRef<LocationDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private locationsWebService: LocationsWebService
  ) {
    console.log('data', data);
    this.locationsWebService
      .getLocation(data.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
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
   * Unsubscribe before component is destroyed
   *
   * @memberof LocationDetailDialogComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Build the address to display
   *
   * @private
   * @memberof LocationDetailDialogComponent
   */
  private buildAddress(): void {
    const sep = ', ';
    this.address = `${this.location.address1}${this.location.address1 && this.location.district ? sep : ''}${
      this.location.district
    } ${this.location.zipCode} ${this.location.city}${sep}${this.location.country}`.trim();
  }

  /**
   * Build the coords to display the map
   *
   * @private
   * @memberof LocationDetailDialogComponent
   */
  private buildCoords(): void {
    this.coords.accuracy = this.location.accuracy;
    this.coords.latitude = this.location.latitude;
    this.coords.longitude = this.location.longitude;
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
