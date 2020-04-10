import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  faBuilding,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faClock,
  faMarker,
  faPlusSquare,
  faPenSquare,
  faTimesCircle,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { Country, EventBg, LocationItem } from '@/models';
import moment from 'moment';
import { first } from 'rxjs/operators';

// Entry components
import { LocationFormDialogComponent } from '@/content/location/components';

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

  faBuilding = faBuilding;
  faCheck = faCheck;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faClock = faClock;
  faMarker = faMarker;
  faPlusSquare = faPlusSquare;
  faPenSquare = faPenSquare;
  faTimesCircle = faTimesCircle;
  faUsers = faUsers;

  /**
   * Inputs
   */

  public event: EventBg;
  @Input() set eventEditing(eventEditing: EventBg) {
    this.event = eventEditing;
    this.populateForm();
    this.checkIfHasRegisteredLocation();
  }

  public locations: LocationItem[];
  @Input() set userLocations(userLocations: LocationItem[]) {
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

  @Output() saveEvent = new EventEmitter<EventBg>();

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
    this.adjustMinMaxPlayers();
  }

  /**
   * Convenience getter for easy access to form fields
   *
   * @readonly
   * @type {{ [key: string]: AbstractControl }}
   * @memberof EventFormComponent
   */
  get fc(): { [key: string]: AbstractControl } {
    return this.eventForm.controls;
  }

  /**
   * Convenience getter for easy access to form value
   *
   * @readonly
   * @type {*}
   * @memberof EventFormComponent
   */
  get fv(): any {
    return this.eventForm.value;
  }

  /**
   * Getter for start date formatted
   *
   * @readonly
   * @type {string}
   * @memberof EventFormComponent
   */
  get startDate(): string {
    return moment(this.fv.startDatetime).format('D/M/Y');
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
      minPlayers: [],
      maxPlayers: [],
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
    }
  }

  /**
   * Prepare the entity before submit
   *
   * @private
   * @returns {EventBg}
   * @memberof EventFormComponent
   */
  private prepareSaveEntity(): EventBg {
    const eventForm = Object.assign({}, this.eventForm.value);

    eventForm.startDatetime = moment(eventForm.startDatetime)
      .hours(eventForm.startTimeHours)
      .minutes(eventForm.startTimeMinutes)
      .format('YYYY-MM-DD HH:mm:ss');
    delete eventForm.startTimeHours;
    delete eventForm.startTimeMinutes;
    eventForm.endDatetime = null;

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
    this.hasNoLocation = !Array.isArray(this.locations) || !this.locations.length;
    this.hasNoLocation ? this.fc.location.disable() : this.fc.location.enable();
  }

  /**
   * Set the Locations select form control default location.
   *
   * @private
   * @param {number} [locationId]
   * @memberof EventFormComponent
   */
  private setDefaultLocation(locationId?: number) {
    if (this.locations && this.locations.length) {
      this.fc.location.setValue(
        this.locations.find((location) => (locationId ? location.id === locationId : location.isDefault)) ||
          this.locations[0]
      );
    }
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
      .subscribe((locationSaved: LocationItem) => {
        console.log('locationSaved', locationSaved);
        if (locationSaved) {
          locationId
            ? (this.locations[this.locations.findIndex((location) => location.id === locationSaved.id)] = locationSaved)
            : this.locations.push(locationSaved);

          this.checkIfHasRegisteredLocation();
          this.setDefaultLocation(locationSaved.id);
        }
      });
  }

  /**
   * Adjust the min/max Players value if input is invalid.
   *
   * @private
   * @memberof EventFormComponent
   */
  private adjustMinMaxPlayers(): void {
    this.fc.minPlayers.valueChanges.subscribe((val) => {
      if (val > this.fc.maxPlayers.value) {
        this.fc.maxPlayers.patchValue(val);
      }
    });
    this.fc.maxPlayers.valueChanges.subscribe((val) => {
      if (val < this.fc.minPlayers.value) {
        this.fc.minPlayers.patchValue(val);
      }
    });
  }
}
