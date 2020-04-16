import { Component, Inject, OnDestroy } from '@angular/core';
import { faBuilding, faInfoCircle, faMap } from '@fortawesome/free-solid-svg-icons';
import { GeoCoordinates, Location } from '@/models';
import { LocationService, CountryService, AlertService } from '@/services';
import { Subject, forkJoin } from 'rxjs';
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
    forkJoin(locationService.getLocation(data.id), countryService.getCountries())
      .pipe(first())
      .subscribe(
        ([location, countries]) => {
          this.isLoading = false;
          if (location) {
            this.location = location;
            if (location.country && countries && countries.length) {
              this.location.country = countries.find((country) => this.location.country === country.isoCode).name;
            }
            this.buildCoords();
          }
        },
        (error) => {
          console.log('ERROR getting location', error);
          alertService.open('error');
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
