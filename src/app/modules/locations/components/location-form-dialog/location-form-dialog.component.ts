import { Component, Inject, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Models
import { LocationFullRepresentation } from '../../models/location-full-representation';
import { Country } from '@shared/models/country.model';
import { GeoCoordinates } from '@shared/models/geo-coordinates.model';
import { Geocode } from '@shared/models/geocode/geocode.model';
import { GeocodeResultLocation } from '@shared/models/geocode/geocode-result-location.model';

// Services
import { LocationsWebService } from '../../services/locations-web.service';
import { CountriesWebService } from '@shared/services/countries-web.service';
import { GeolocationWebService } from '@shared/services/geolocation-web.service';
import { SnackBarService } from '@shared/services/snack-bar.service';

// UI
import { faAngleDoubleDown, faAngleDoubleUp, faCheck, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-location-form-dialog',
  templateUrl: './location-form-dialog.component.html',
  styleUrls: ['./location-form-dialog.component.scss']
})
export class LocationFormDialogComponent {
  public isLoading = true;
  public locationForm: FormGroup;
  public location: LocationFullRepresentation;
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

  // View Children

  @ViewChild('description') description: CdkTextareaAutosize;

  /**
   * Creates an instance of LocationFormDialogComponent.
   *
   * @param {FormBuilder} fb
   * @param {MatSnackBar} snackBar
   * @param {GeolocationWebService} geolocationWebService
   * @memberof LocationFormDialogComponent
   */
  constructor(
    public dialogRef: MatDialogRef<LocationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private locationsWebService: LocationsWebService,
    private countriesWebService: CountriesWebService,
    private geolocationWebService: GeolocationWebService,
    private fb: FormBuilder,
    private snackBarService: SnackBarService
  ) {
    this.createForm();
    console.log('data', data);

    forkJoin(this.locationsWebService.getLocation(data.id), this.countriesWebService.getCountries()).subscribe(
      ([location, countries]) => {
        console.log('location', location);
        console.log('countries', countries);
        this.location = location;
        this.countries = countries;
        this.isLoading = false;

        this.populateForm();

        this.mapCircleRadius = this.location.coordsAccuracy;
        this.coords = {
          accuracy: this.location.coordsAccuracy,
          latitude: this.location.coordsLatitude,
          longitude: this.location.coordsLongitude
        };
      }
    );
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
      addressField1: [],
      addressField2: [],
      addressZipCode: [],
      addressDistrict: [],
      addressCity: [],
      addressCountry: ['', Validators.required],
      // Coordinates
      coordsLatitude: [],
      coordsLongitude: [],
      coordsAccuracy: [],
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
        addressField1: this.location.addressField1,
        addressField2: this.location.addressField2,
        addressZipCode: this.location.addressZipCode,
        addressDistrict: this.location.addressDistrict,
        addressCity: this.location.addressCity,
        addressCountry: this.location.addressCountry,
        // Coordinates
        coordsLatitude: this.location.coordsLatitude,
        coordsLongitude: this.location.coordsLongitude,
        coordsAccuracy: this.location.coordsAccuracy,
        // Details
        description: this.location.description,
        isAllowedSmoking: this.location.isAllowedSmoking,
        isAccessible: this.location.isAccessible,
        // Other
        showExactLocation: this.location.coordsAccuracy === null ? false : !Boolean(this.location.coordsAccuracy)
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
        addressField1: this.locationForm.value.showExactLocation ? geocodeLocation.street : '',
        addressField2: '',
        addressZipCode: geocodeLocation.postalCode,
        addressDistrict: geocodeLocation.adminArea6,
        addressCity: geocodeLocation.adminArea5,
        addressCountry: geocodeLocation.adminArea1
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
        coordsLatitude: coords.latitude,
        coordsLongitude: coords.longitude,
        coordsAccuracy: coords.accuracy
      });
    }
  }

  /**
   * Prepare the entity before submit
   *
   * @private
   * @returns {LocationFullRepresentation}
   * @memberof LocationFormDialogComponent
   */
  private prepareSaveEntity(): LocationFullRepresentation {
    this.locationForm.get('coordsAccuracy').enable();
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
      this.locationsWebService.saveLocation(this.prepareSaveEntity()).subscribe(
        (locationSaved) => {
          console.log('location saved', locationSaved);
          this.snackBarService.open('success-save-location');
          this.dialogRef.close(locationSaved);
        },
        (error) => {
          console.log('ERROR saving location', error);
          this.snackBarService.open('fail-save-location');
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
    if (this.locationForm.value.showExactLocation && this.locationForm.value.coordsAccuracy < 100) {
      this.locationForm.get('coordsAccuracy').setValue(100);
    }
  }

  /**
   * Call the reverse geocode API to retrieve the address from the map's coordinates
   *
   * @memberof LocationFormDialogComponent
   */
  public onReverseGeocode(): void {
    this.geolocationWebService
      .reverseGeocode(this.locationForm.value.coordsLatitude, this.locationForm.value.coordsLongitude)
      .subscribe(
        (geocode: Geocode) => {
          console.log('reverse geocode', geocode);
          if (geocode && geocode.results[0].locations.length) {
            this.populateAddress(geocode.results[0].locations[0]);
          } else {
            this.snackBarService.open('fail-reverse-geocode');
          }
        },
        (error) => {
          console.log('ERROR reverse geocode', error);
          this.snackBarService.open('fail-reverse-geocode');
        }
      );
  }

  /**
   * Call the geocode API to retrieve the coordinates of an address
   *
   * @memberof LocationFormDialogComponent
   */
  public onGeocode(): void {
    const address = `${this.locationForm.get('addressField1').value}, ${
      this.locationForm.get('addressZipCode').value
    } ${this.locationForm.get('addressCity').value}`;

    this.geolocationWebService.geocode(address).subscribe(
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
          this.snackBarService.open('fail-geocode');
        }
      },
      (error) => {
        console.log('ERROR geocode', error);
        this.snackBarService.open('fail-geocode');
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
