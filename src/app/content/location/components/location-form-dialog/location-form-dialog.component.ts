import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, Geocode, GeocodeResultLocation, GeoCoordinates, Location } from '@/models';
import { CountryService, GeocodingService, LocationService, SnackBarService } from '@/services';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';

// UI
import { faAngleDoubleDown, faAngleDoubleUp, faCheck, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-location-form-dialog',
  templateUrl: './location-form-dialog.component.html',
  styleUrls: ['./location-form-dialog.component.scss']
})
export class LocationFormDialogComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public isLoading = true;
  public locationForm: FormGroup;
  public location: Location;
  public countries: Country[];
  public showExactLocation = false;
  public mapCircleRadius: number;
  public coords: GeoCoordinates;

  // Font Awesome
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleUp = faAngleDoubleUp;
  faCheck = faCheck;
  faTimes = faTimes;
  faTimesCircle = faTimesCircle;

  /**
   * Creates an instance of LocationFormDialogComponent.
   *
   * @param {FormBuilder} fb
   * @param {MatSnackBar} snackBar
   * @param {GeocodingService} geocodingService
   * @memberof LocationFormDialogComponent
   */
  constructor(
    public dialogRef: MatDialogRef<LocationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private locationService: LocationService,
    private countryService: CountryService,
    private geocodingService: GeocodingService,
    private fb: FormBuilder,
    private snackBarService: SnackBarService
  ) {
    this.createForm();
    console.log('data', data);

    forkJoin(this.locationService.getLocation(data.id), this.countryService.getCountries())
      .pipe(first())
      .subscribe(([location, countries]) => {
        console.log('location', location);
        console.log('countries', countries);
        this.location = location;
        this.countries = countries;
        this.isLoading = false;

        this.populateForm();

        this.mapCircleRadius = this.location.accuracy;
        this.coords = {
          accuracy: this.location.accuracy,
          latitude: this.location.latitude,
          longitude: this.location.longitude
        };
      });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof LocationFormDialogComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Initialize the form
   *
   * @private
   * @memberof LocationFormDialogComponent
   */
  private createForm(): void {
    this.locationForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      isDisabled: [false, Validators.required],
      isDefault: ['', Validators.required],
      isPublic: ['', Validators.required],
      // Address
      address1: [],
      address2: [],
      zipCode: [],
      district: [],
      city: [],
      country: ['', Validators.required],
      // Coordinates
      latitude: [],
      longitude: [],
      accuracy: [],
      // Details
      description: [],
      isAllowedSmoking: ['', Validators.required],
      isAccessible: ['', Validators.required],
      // Other
      showExactLocation: ['', Validators.required]
    });
  }

  /**
   * Populate the form
   *
   * @private
   * @memberof LocationFormDialogComponent
   */
  private populateForm(): void {
    if (this.location) {
      this.locationForm.setValue({
        id: this.location.id,
        name: this.location.name,
        isDisabled: false,
        isDefault: this.location.isDefault,
        isPublic: this.location.isPublic,
        // Address
        address1: this.location.address1 || '',
        address2: this.location.address2 || '',
        zipCode: this.location.zipCode || '',
        district: this.location.district || '',
        city: this.location.city,
        country: this.location.country,
        // Coordinates
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        accuracy: this.location.accuracy,
        // Details
        description: this.location.description ? this.location.description : '',
        isAllowedSmoking: this.location.isAllowedSmoking,
        isAccessible: this.location.isAccessible,
        // Other
        showExactLocation: this.location.accuracy === null ? false : !Boolean(this.location.accuracy)
      });
    }
  }

  /**
   * Populate the address from the map's coordinates
   *
   * @private
   * @param {GeocodeResultLocation} geocodeLocation
   * @memberof LocationFormDialogComponent
   */
  private populateAddress(geocodeLocation: GeocodeResultLocation): void {
    if (this.locationForm) {
      this.locationForm.patchValue({
        address1: this.locationForm.value.showExactLocation ? geocodeLocation.street : '',
        address2: '',
        zipCode: geocodeLocation.postalCode,
        district: geocodeLocation.adminArea6,
        city: geocodeLocation.adminArea5,
        country: geocodeLocation.adminArea1
      });
    }
  }

  /**
   * Populate coordinates
   *
   * @param {GeoCoordinates} coords
   * @memberof LocationFormDialogComponent
   */
  public populateCoords(coords: GeoCoordinates): void {
    if (coords) {
      this.locationForm.patchValue({
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy
      });
    }
  }

  /**
   * Prepare the entity before submit
   *
   * @private
   * @returns {Location}
   * @memberof LocationFormDialogComponent
   */
  private prepareSaveEntity(): Location {
    if (this.locationForm.value.showExactLocation) {
      this.locationForm.patchValue({ accuracy: 0 });
    }
    this.locationForm.get('showExactLocation').disable();
    return this.locationForm.value;
  }

  /**
   * Submit event
   *
   * @memberof LocationFormDialogComponent
   */
  public onSubmit(): void {
    if (this.locationForm.valid) {
      console.log('onSubmit location', this.prepareSaveEntity());
      this.isLoading = true;
      this.locationService
        .saveLocation(this.prepareSaveEntity())
        .pipe(first())
        .subscribe(
          (locationSaved) => {
            console.log('location saved', locationSaved);
            this.snackBarService.open('success-save-location');
            this.dialogRef.close(locationSaved);
          },
          (error) => {
            console.log('ERROR saving location', error);
            this.snackBarService.open('error-save-location');
            this.isLoading = false;
          }
        );
    }
  }

  /**
   * Close Dialog
   *
   * @memberof LocationFormDialogComponent
   */
  public onClose(): void {
    this.dialogRef.close();
  }

  /**
   * Set accuracy to 100 if showExactLocation becomes true and the previous accuracy was inferior to 100
   *
   * @memberof LocationFormDialogComponent
   */
  public onSetMinAccuracy(): void {
    if (this.locationForm.value.showExactLocation && this.locationForm.value.accuracy < 100) {
      this.locationForm.get('accuracy').setValue(100);
    }
  }

  /**
   * Call the reverse geocode API to retrieve the address from the map's coordinates
   *
   * @memberof LocationFormDialogComponent
   */
  public onReverseGeocode(): void {
    this.geocodingService
      .reverseGeocode(this.locationForm.value.latitude, this.locationForm.value.longitude)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (geocode: Geocode) => {
          console.log('reverse geocode', geocode);
          if (geocode && geocode.results[0].locations.length) {
            this.populateAddress(geocode.results[0].locations[0]);
          } else {
            this.snackBarService.open('error-reverse-geocode');
          }
        },
        (error) => {
          console.log('ERROR reverse geocode', error);
          this.snackBarService.open('error-reverse-geocode');
        }
      );
  }

  /**
   * Call the geocode API to retrieve the coordinates of an address
   *
   * @memberof LocationFormDialogComponent
   */
  public onGeocode(): void {
    const address = `${this.locationForm.value.address1}, ${this.locationForm.value.zipCode} ${
      this.locationForm.value.city
    }`;

    this.geocodingService
      .geocode(address)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (geocode: Geocode) => {
          console.log('geocode', geocode);
          if (geocode && geocode.results[0].locations.length) {
            // Set showExactLocation to true
            this.locationForm.get('showExactLocation').setValue(true);
            // Set this.coords
            this.coords = {
              accuracy: 0,
              latitude: geocode.results[0].locations[0].latLng.lat,
              longitude: geocode.results[0].locations[0].latLng.lng
            };
            // Patch form coords
            this.populateCoords(this.coords);
          } else {
            this.snackBarService.open('error-geocode');
          }
        },
        (error) => {
          console.log('ERROR geocode', error);
          this.snackBarService.open('error-geocode');
        }
      );
  }

  /**
   * Event to set a control value to false
   *
   * @param {string} controlName
   * @memberof LocationFormDialogComponent
   */
  public onSetControlToFalse(controlName: string): void {
    this.locationForm.get(controlName).setValue(false);
  }

  /**
   * Event to clear a form's field
   *
   * @param {string} controlName
   * @memberof LocationFormDialogComponent
   */
  public onClearField(controlName: string): void {
    this.locationForm.get(controlName).setValue('');
  }
}
