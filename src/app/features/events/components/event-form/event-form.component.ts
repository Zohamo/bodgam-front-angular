import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';

import { EventRepresentation } from '../../models/event-representation.model';
import { LocationFormComponent } from 'src/app/features/locations/components/location-form/location-form.component';
import { LocationRepresentation } from 'src/app/features/locations/models/location-representation.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {
  public eventForm: FormGroup;
  public today: Date;
  public hasNoLocation: boolean;

  // Inputs

  public event: EventRepresentation;
  @Input() set eventEditing(eventEditing: EventRepresentation) {
    this.event = eventEditing;
    this.populateForm();
    this.checkIfHasRegisteredLocation();
  }

  public locations: LocationRepresentation[];
  @Input() set userLocations(userLocations: LocationRepresentation[]) {
    this.locations = userLocations;
    this.checkIfHasRegisteredLocation();
    if (this.event.location && this.event.location.id) {
      this.setDefaultLocation(this.event.location.id);
    }
  }

  // Outputs

  @Output() saveEvent = new EventEmitter<EventRepresentation>();

  /**
   * Creates an instance of EventFormComponent.
   *
   * @param {FormBuilder} fb
   * @param {MatDialog} dialog
   * @memberof EventFormComponent
   */
  constructor(private fb: FormBuilder, public dialog: MatDialog) {
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
      // Datetime
      startDatetime: [this.today, Validators.required],
      startTimeHours: [18, Validators.required],
      startTimeMinutes: [30, Validators.required],
      endDatetime: ['', Validators.required],
      // Location
      location: [{ value: '', disabled: true }, Validators.required],
      // Players
      host: [],
      minPlayers: ['', Validators.required],
      maxPlayers: ['', Validators.required],
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
        // Datetime
        startDatetime: moment
          .unix(this.event.startDatetime)
          .hours(0)
          .minutes(0)
          .format(),
        startTimeHours: moment.unix(this.event.startDatetime).format('HH'),
        startTimeMinutes: moment.unix(this.event.startDatetime).format('mm'),
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

      // Set select values
      /* this.eventForm.get('level').setValue(this.event.level);
      this.eventForm.get('atmosphere').setValue(this.event.atmosphere); */

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
    const eventForm = this.eventForm.value;
    eventForm.startDatetime = moment(eventForm.startDatetime)
      .hours(eventForm.startTimeHours)
      .minutes(eventForm.startTimeMinutes)
      .valueOf();
    delete eventForm.startTimeHours;
    delete eventForm.startTimeMinutes;
    console.log('event', eventForm);
    return eventForm;
  }

  /**
   * Submit event
   *
   * @memberof EventFormComponent
   */
  public onSubmit(): void {
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
   * @param {boolean} [isEditing=false]
   * @memberof EventFormComponent
   */
  public openLocationFormDialog(isEditing = false): void {
    const dialogRef = this.dialog.open(LocationFormComponent, {
      width: 'calc(100% - 2rem)',
      maxWidth: '950px',
      data: { location: isEditing ? this.eventForm.get('location').value : new LocationRepresentation() }
    });

    dialogRef.afterClosed().subscribe((locationEdited: LocationRepresentation) => {
      if (locationEdited) {
        if (isEditing) {
          this.locations.map((location) => {
            if (location.id === locationEdited.id) {
              location = locationEdited;
            }
          });
        } else {
          this.locations.push(locationEdited);
          this.checkIfHasRegisteredLocation();
          this.setDefaultLocation(locationEdited.id);
        }
      }
    });
  }
}
