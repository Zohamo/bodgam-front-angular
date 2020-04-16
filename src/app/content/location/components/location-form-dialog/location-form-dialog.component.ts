import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faCheck,
  faCheckSquare,
  faChevronLeft,
  faChevronRight,
  faInfoCircle,
  faLock,
  faMap,
  faSmoking,
  faSmokingBan,
  faSquare,
  faTimes,
  faTimesCircle,
  faTree,
  faWheelchair
} from '@fortawesome/free-solid-svg-icons';
import { Country, Geocode, GeocodeResultLocation, GeoCoordinates, Location } from '@/models';
import { AlertService, CountryService, GeocodingService, LocationService } from '@/services';
import { first } from 'rxjs/operators';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-location-form-dialog',
  templateUrl: './location-form-dialog.component.html',
  styleUrls: ['./location-form-dialog.component.scss']
})
export class LocationFormDialogComponent {
  public isLoading = true;
  public locationForm: FormGroup;
  public location: Location;
  public countries: Country[];
  public showExactLocation = false;
  public mapCircleRadius: number;
  public coords: GeoCoordinates;

  // Font Awesome
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  faCheck = faCheck;
  faCheckSquare = faCheckSquare;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faInfoCircle = faInfoCircle;
  faLock = faLock;
  faMap = faMap;
  faSmoking = faSmoking;
  faSmokingBan = faSmokingBan;
  faSquare = faSquare;
  faTimes = faTimes;
  faTimesCircle = faTimesCircle;
  faTree = faTree;
  faWheelchair = faWheelchair;

  /**
   * View Children
   */

  @ViewChild('stepper') private stepper: MatStepper;

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
    private alertService: AlertService
  ) {
    this.createForm();
    this.countries = this.countryService.getCountries();

    this.locationService
      .getLocation(data.id)
      .pipe(first())
      .subscribe((location: Location) => {
        if (location) {
          this.location = location;
          this.populateForm();
          this.mapCircleRadius = location.accuracy;
          this.coords = {
            accuracy: location.accuracy,
            latitude: location.latitude,
            longitude: location.longitude
          };
          this.isLoading = false;
        }
      });
  }

  /**
   * Convenience getter for easy access to form fields
   *
   * @readonly
   * @type {{ [key: string]: AbstractControl }}
   * @memberof LocationFormDialogComponent
   */
  get fc(): { [key: string]: AbstractControl } {
    return this.locationForm.controls;
  }

  /**
   * Convenience getter for easy access to form value
   *
   * @readonly
   * @type {*}
   * @memberof LocationFormDialogComponent
   */
  get fv(): any {
    return this.locationForm.value;
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
      name: ['', [Validators.required, Validators.maxLength(128)]],
      isDisabled: [false, Validators.required],
      isDefault: ['', Validators.required],
      isPublic: ['', Validators.required],
      // Address
      address1: ['', Validators.maxLength(64)],
      address2: ['', Validators.maxLength(32)],
      zipCode: ['', Validators.maxLength(8)],
      district: ['', Validators.maxLength(64)],
      city: ['', Validators.maxLength(64)],
      country: ['', Validators.required],
      // Coordinates
      latitude: [],
      longitude: [],
      accuracy: [],
      // Details
      description: ['', Validators.maxLength(255)],
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
        address1: this.fv.showExactLocation ? geocodeLocation.street : '',
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
    const location = { ...this.fv };
    if (location.showExactLocation) {
      location.accuracy = 0;
    }
    delete location.showExactLocation;
    return location;
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
          (locationSaved: Location) => {
            console.log('location saved', locationSaved);
            this.alertService.open('success-save-location', locationSaved.name);
            this.dialogRef.close(locationSaved);
          },
          (error) => {
            console.log('ERROR saving location', error);
            this.alertService.open('error-save-location');
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
    if (this.fv.showExactLocation && this.fv.accuracy < 100) {
      this.fc.accuracy.patchValue(100);
    }
  }

  /**
   * Call the reverse geocode API to retrieve the address from the map's coordinates.
   *
   * @param {boolean} [navToAddress=false]
   * @memberof LocationFormDialogComponent
   */
  public onReverseGeocode(navToAddress = false): void {
    this.geocodingService
      .reverseGeocode(this.fv.latitude, this.fv.longitude)
      .pipe(first())
      .subscribe(
        (geocode: Geocode) => {
          console.log('reverse geocode', geocode);
          if (geocode && geocode.results[0].locations.length) {
            this.populateAddress(geocode.results[0].locations[0]);
            if (navToAddress) {
              this.stepper.next();
            }
          } else {
            this.alertService.open('error-reverse-geocode');
          }
        },
        (error) => {
          console.log('ERROR reverse geocode', error);
          this.alertService.open('error-reverse-geocode');
        }
      );
  }

  /**
   * Call the geocode API to retrieve the coordinates of an address
   *
   * @memberof LocationFormDialogComponent
   */
  public onGeocode(): void {
    const address = `${this.fv.address1}, ${this.fv.zipCode} ${this.fv.city}`;

    this.geocodingService
      .geocode(address)
      .pipe(first())
      .subscribe(
        (geocode: Geocode) => {
          console.log('geocode', geocode);
          if (geocode && geocode.results[0].locations.length) {
            // Set showExactLocation to true
            this.fc.showExactLocation.patchValue(true);
            // Set this.coords
            this.coords = {
              accuracy: 0,
              latitude: geocode.results[0].locations[0].latLng.lat,
              longitude: geocode.results[0].locations[0].latLng.lng
            };
            // Patch form coords
            this.populateCoords(this.coords);
            // Go to "Map" step
            this.stepper.previous();
          } else {
            this.alertService.open('error-geocode');
          }
        },
        (error) => {
          console.log('ERROR geocode', error);
          this.alertService.open('error-geocode');
        }
      );
  }

  /**
   * OnEvent toggle a boolean control's value
   *
   * @param {AbstractControl} control
   * @memberof LocationFormDialogComponent
   */
  public onToggleValue(control: AbstractControl): void {
    control.patchValue(!control.value);
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
