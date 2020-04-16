import { Component, Inject, OnDestroy } from '@angular/core';
import { faBuilding, faInfoCircle, faMap } from '@fortawesome/free-solid-svg-icons';
import { GeoCoordinates, Location, Country } from '@/models';
import { LocationService, CountryService, AlertService } from '@/services';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

// UI
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-location-detail-dialog',
  templateUrl: './location-detail-dialog.component.html',
  styleUrls: ['./location-detail-dialog.component.scss']
})
export class LocationDetailDialogComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public location: Location;
  public country: Country;
  public address: string;
  public coords: GeoCoordinates = new GeoCoordinates();
  public triggerCenterMap = false;
  public isLoading = true;

  // Font Awesome
  faBuilding = faBuilding;
  faInfoCircle = faInfoCircle;
  faMap = faMap;

  /**
   * Creates an instance of LocationDetailDialogComponent.
   *
   * @param {MatDialogRef<LocationDetailDialogComponent>} dialogRef
   * @param {*} data
   * @param {LocationService} locationService
   * @memberof LocationDetailDialogComponent
   */
  constructor(
    public dialogRef: MatDialogRef<LocationDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string },
    private locationService: LocationService,
    private countryService: CountryService,
    private alertService: AlertService
  ) {
    this.locationService
      .getLocation(data.id)
      .pipe(first())
      .subscribe(
        (location: Location) => {
          if (location) {
            if (location.country) {
              this.country = this.countryService.getCountry(location.country);
            }
            this.location = location;
            this.buildCoords();
          }
          this.isLoading = false;
        },
        (error) => {
          console.log('ERROR getting location', error);
          this.alertService.open('error');
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
   * Event to center the map
   *
   * @memberof LocationDetailDialogComponent
   */
  public onCenterMap(): void {
    this.triggerCenterMap = !this.triggerCenterMap;
  }
}
