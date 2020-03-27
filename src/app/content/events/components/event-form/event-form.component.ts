import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country, EventRepresentation, LocationRepresentation } from '@/models';
import moment from 'moment';
import { first } from 'rxjs/operators';

// Entry components
import { LocationFormDialogComponent } from '@/content/locations/components';

// UI
import { faCheck, faPlusSquare, faPenSquare, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {
  public eventForm: FormGroup;
  public today: Date;
  public hasNoLocation: boolean;

  // UI

  faCheck = faCheck;
  faPlusSquare = faPlusSquare;
  faPenSquare = faPenSquare;
  faTimesCircle = faTimesCircle;

  /**
   * Inputs
   */

  public event: EventRepresentation;
  @Input() set eventEditing(eventEditing: EventRepresentation) {
    this.event = eventEditing;
    this.populateForm();
    this.checkIfHasRegisteredLocation();
  }

  public locations: LocationRepresentation[];
  @Input() set userLocations(userLocations: LocationRepresentation[]) {
    console.log('EventFormComponent userLocations', userLocations);
    this.locations = userLocations;
    this.checkIfHasRegisteredLocation();
    if (this.event.location && this.event.location.id) {
      this.setDefaultLocation(this.event.location.id);
    } else if (!this.hasNoLocation) {
      const defaultLocation = this.locations.find((location) => location.isDefault);
      this.setDefaultLocation(defaultLocation ? defaultLocation.id : this.locations[0].id);
    }
  }

  public countries: Country[];
  @Input() set countryList(countryList: Country[]) {
    if (countryList) {
      this.countries = countryList;
    }
  }

  /**
   * Outputs
   */

  @Output() saveEvent = new EventEmitter<EventRepresentation>();

  /**
   * Creates an instance of EventFormComponent.
   *
   * @param {FormBuilder} fb
   * @param {MatDialog} dialog
   * @memberof EventFormComponent
   */
  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.today = new Date();
    this.createForm();
  }

  /**
   * Initialize the form
   *
   * @private
   * @memberof EventFormComponent
   */
  private createForm(): void {
    this.eventForm = this.fb.group({
      id: [],
      title: ['', [Validators.required, Validators.minLength(2)]],
      isPrivate: ['', Validators.required],
      // Datetime
      startDatetime: [this.today, Validators.required],
      startTimeHours: [18, Validators.required],
      startTimeMinutes: [30, Validators.required],
      endDatetime: [], // TODO : implement endDatetime
      // Location
      location: [{ value: '', disabled: true }, Validators.required],
      // Players
      host: [],
      minPlayers: ['', Validators.required], // TODO : cannot be superior to maxPlayers
      maxPlayers: ['', Validators.required], // TODO : cannot be inferior to minPlayers
      // Details
      description: [],
      level: ['', Validators.required],
      atmosphere: ['', Validators.required]
    });
  }

  /**
   * Populate the form
   *
   * @private
   * @memberof EventFormComponent
   */
  private populateForm(): void {
    if (this.event) {
      this.eventForm.setValue({
        id: this.event.id,
        title: this.event.title,
        isPrivate: this.event.isPrivate,
        // Datetime
        startDatetime: moment(this.event.startDatetime)
          .hours(0)
          .minutes(0)
          .format(),
        startTimeHours: moment(this.event.startDatetime).format('HH'),
        startTimeMinutes: moment(this.event.startDatetime).format('mm'),
        endDatetime: this.event.endDatetime,
        // Location
        location: this.event.location,
        // Players
        host: this.event.host,
        minPlayers: this.event.minPlayers,
        maxPlayers: this.event.maxPlayers,
        // Details
        description: this.event.description,
        level: this.event.level,
        atmosphere: this.event.atmosphere
      });

      if (this.event.location && this.event.location.id) {
        this.setDefaultLocation(this.event.location.id);
      }
    }
  }

  /**
   * Prepare the entity before submit
   *
   * @private
   * @returns {EventRepresentation}
   * @memberof EventFormComponent
   */
  private prepareSaveEntity(): EventRepresentation {
    const eventForm = Object.assign({}, this.eventForm.value);

    eventForm.startDatetime = moment(eventForm.startDatetime)
      .hours(eventForm.startTimeHours)
      .minutes(eventForm.startTimeMinutes)
      .valueOf();
    delete eventForm.startTimeHours;
    delete eventForm.startTimeMinutes;

    console.log('prepareSaveEntity event', eventForm);
    return eventForm;
  }

  /**
   * Submit event
   *
   * @memberof EventFormComponent
   */
  public onSubmit(): void {
    console.log('onSubmit event', this.eventForm);
    if (this.eventForm.valid) {
      this.saveEvent.emit(this.prepareSaveEntity());
    }
  }

  /**
   * Check if the user has registered locations
   *
   * @private
   * @memberof EventFormComponent
   */
  private checkIfHasRegisteredLocation(): void {
    this.hasNoLocation = !Array.isArray(this.locations) || this.locations.length === 0;
    this.hasNoLocation ? this.eventForm.get('location').disable() : this.eventForm.get('location').enable();
  }

  /**
   * Set the form control default location
   *
   * @private
   * @param {number} locationId
   * @memberof EventFormComponent
   */
  private setDefaultLocation(locationId: number) {
    if (this.locations && this.locations.length > 0) {
      this.eventForm
        .get('location')
        .setValue(
          this.locations.find((location) => (this.event.location ? location.id === locationId : location.isDefault))
        );
    }
    this.eventForm.get('level').setValue(this.event.level);
  }

  /**
   * Open the dialog to edit or create a location
   *
   * @param {number} [locationId=null]
   * @memberof EventFormComponent
   */
  public openLocationFormDialog(locationId: number = null): void {
    console.log('locationId', locationId);
    const dialogRef = this.dialog.open(LocationFormDialogComponent, {
      panelClass: 'dialog-location-form',
      data: { id: locationId }
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((locationSaved: LocationRepresentation) => {
        console.log('locationSaved', locationSaved);
        if (locationSaved) {
          if (locationId) {
            this.locations.map((location) => {
              if (location.id === locationSaved.id) {
                location = locationSaved;
              }
            });
          } else {
            this.locations.push(locationSaved);
            this.checkIfHasRegisteredLocation();
            this.setDefaultLocation(locationSaved.id);
          }
        }
      });
  }
}
