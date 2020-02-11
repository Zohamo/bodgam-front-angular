import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';

// Entry components
import { LocationDetailDialogComponent } from '../location-detail-dialog/location-detail-dialog.component';
import { LocationFormDialogComponent } from '../location-form-dialog/location-form-dialog.component';

// Models
import { LocationRepresentation } from '../../models/location-representation.model';

// UI
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  public displayedColumns: string[] = ['privacy', 'name', 'location', 'icons', 'actions'];
  public dataSource: MatTableDataSource<LocationRepresentation>;

  // UI
  faPenSquare = faPenSquare;
  faTrash = faTrash;

  // View Children

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Inputs

  @Input() set locations(locations: LocationRepresentation[]) {
    console.log('locations', locations);
    if (locations) {
      this.dataSource = new MatTableDataSource(locations);
    }
  }

  // Outputs

  @Output() deleteLocation = new EventEmitter<number>();

  /**
   * Creates an instance of LocationListComponent.
   *
   * @param {MatDialog} dialog
   * @memberof LocationListComponent
   */
  constructor(private dialog: MatDialog) {}

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
      data: { id: locationId }
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((locationSaved: LocationRepresentation) => {
        console.log('locationSaved', locationSaved);
        if (locationSaved) {
          this.locations.map((location) => {
            if (location.id === locationSaved.id) {
              location = locationSaved;
            }
          });
        }
      });
  }

  /**
   * Delete location by id
   *
   * @param {number} id
   * @memberof LocationListComponent
   */
  public onDeleteLocation(id: number): void {
    this.deleteLocation.emit(id);
  }
}
