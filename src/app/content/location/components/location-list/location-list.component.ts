import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { faCheckSquare, faLock, faPenSquare, faTrash, faTree } from '@fortawesome/free-solid-svg-icons';
import { LocationItem, EventBg } from '@/models';
import { LocationService } from '@/services';
import moment from 'moment';
import { first } from 'rxjs/operators';

// Components
import { DialogConfirmComponent } from '@/components/dialog-confirm/dialog-confirm.component';
import { LocationDetailDialogComponent } from '../location-detail-dialog/location-detail-dialog.component';
import { LocationEventListDialogComponent } from '../location-event-list-dialog/location-event-list-dialog.component';
import { LocationFormDialogComponent } from '../location-form-dialog/location-form-dialog.component';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  public displayedColumns: string[] = ['default', 'privacy', 'name', 'location', 'icons'];
  public dataSource: MatTableDataSource<LocationItem>;

  // Font Awesome
  faCheckSquare = faCheckSquare;
  faLock = faLock;
  faPenSquare = faPenSquare;
  faTrash = faTrash;
  faTree = faTree;

  /**
   * Inputs
   */

  public isAdmin: boolean;
  @Input() set isUserAdmin(isUserAdmin: boolean) {
    this.isAdmin = isUserAdmin;
    if (isUserAdmin) {
      this.displayedColumns.push('actions');
    }
  }

  private locations: LocationItem[];
  @Input() set setLocations(locations: LocationItem[]) {
    console.log('Input locations', locations);
    if (locations) {
      this.locations = locations;
      this.dataSource = new MatTableDataSource(locations);
    }
  }

  /**
   * Outputs
   */

  @Output() deleteLocation = new EventEmitter<LocationItem>();

  /**
   * View Children
   */

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Creates an instance of LocationListComponent.
   *
   * @param {MatDialog} dialog
   * @memberof LocationListComponent
   */
  constructor(private dialog: MatDialog, private locationService: LocationService) {}

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties
   *
   * @memberof LocationListComponent
   */
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Open the dialog to display a location
   *
   * @param {number} locationId
   * @memberof LocationListComponent
   */
  public openLocationDetailDialog(locationId: number): void {
    this.dialog.open(LocationDetailDialogComponent, {
      data: { id: locationId }
    });
  }

  /**
   * Open a dialog to edit a location
   *
   * @param {number} locationId
   * @memberof LocationListComponent
   */
  public openLocationFormDialog(locationId: number): void {
    console.log('locationId', locationId);
    const dialogRef = this.dialog.open(LocationFormDialogComponent, {
      data: { id: locationId },
      panelClass: 'panel-location'
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((locationUpdated: LocationItem) => {
        if (locationUpdated) {
          this.updateLocationsDataSource(locationUpdated);
        }
      });
  }

  /**
   * Update the Location's Table Data Source.
   *
   * @private
   * @param {LocationItem} locationUpdated
   * @memberof LocationListComponent
   */
  private updateLocationsDataSource(locationUpdated: LocationItem): void {
    if (locationUpdated.isDefault) {
      this.locations
        .filter((location) => location.id !== locationUpdated.id && location.isDefault)
        .map((location) => {
          location.isDefault = false;
          return location;
        });
    }

    this.locations[this.locations.findIndex((item) => item.id === locationUpdated.id)] = locationUpdated;
    this.dataSource = new MatTableDataSource(this.locations);
  }

  /**
   * Delete a location
   *
   * @param {LocationItem} location
   * @memberof LocationListComponent
   */
  public onDeleteLocation(location: LocationItem): void {
    this.locationService
      .getLocationEvents(location.id)
      .pipe(first())
      .subscribe((events: EventBg[]) => {
        const eventsToCome = events.filter((event) => moment(event.startDatetime) > moment());
        eventsToCome.length
          ? this.openDialogCantDeleteWithEventsList(location, eventsToCome)
          : this.openDialogConfirmDelete(location);
      });
  }

  /**
   * Open a dialog saying the Location can't be deleted because of the list of Events that are related to it.
   *
   * @private
   * @param {LocationItem} location
   * @param {EventBg[]} events
   * @memberof LocationListComponent
   */
  private openDialogCantDeleteWithEventsList(location: LocationItem, events: EventBg[]): void {
    this.dialog.open(LocationEventListDialogComponent, {
      data: { locationName: location.name, events, preventDelete: true }
    });
  }

  /**
   * Open a dialog asking the confirmation to delete the Location.
   *
   * @private
   * @param {LocationItem} location
   * @memberof LocationListComponent
   */
  private openDialogConfirmDelete(location: LocationItem): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { message: 'delete-location', name: location.name }
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.deleteLocation.emit(location);
      }
    });
  }
}
