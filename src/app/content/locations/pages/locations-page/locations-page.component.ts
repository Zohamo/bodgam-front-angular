import { Component, OnDestroy } from '@angular/core';
import { LocationRepresentation } from '@/models';
import { AuthenticationWebService, LocationsWebService } from '@/services';
import { Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';

// Components
import { LocationFormDialogComponent } from '../../components';

// UI
import { faMapMarked, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-locations-page',
  templateUrl: './locations-page.component.html',
  styleUrls: ['./locations-page.component.scss']
})
export class LocationsPageComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public locations: LocationRepresentation[] = [];
  public userId: number;

  // UI
  faMapMarked = faMapMarked;
  faMapMarkedAlt = faMapMarkedAlt;

  /**
   * Creates an instance of LocationsPageComponent.
   *
   * @param {LocationsWebService} locationsWebService
   * @memberof LocationsPageComponent
   */
  constructor(
    private authenticationWebService: AuthenticationWebService,
    private locationsWebService: LocationsWebService,
    private dialog: MatDialog
  ) {
    this.getProfileLocations();
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof LocationsPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Call LocationsWebService to get the user's locations
   *
   * @memberof LocationsPageComponent
   */
  public getProfileLocations(): void {
    this.locationsWebService
      .getLocations(this.authenticationWebService.currentUserValue.id)
      .pipe(first())
      .subscribe(
        (locations) => {
          console.log('getProfileLocations OK', locations);
          if (locations) {
            this.locations = locations;
          }
        },
        (error) => {
          console.log('getProfileLocations ERROR', error);
        }
      );
  }

  /**
   * Open the dialog to create a location
   *
   * @memberof LocationsPageComponent
   */
  public openLocationFormDialog(): void {
    const dialogRef = this.dialog.open(LocationFormDialogComponent, {
      data: { id: null }
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((locationSaved: LocationRepresentation) => {
        console.log('locationSaved', locationSaved);
        if (locationSaved) {
          this.locations.push(locationSaved);
          this.locations = this.locations.concat();
        }
      });
  }

  /**
   * Call LocationsWebService to delete a location of this user
   *
   * @param {number} id
   * @memberof LocationsPageComponent
   */
  public deleteLocation(id: number): void {
    this.locationsWebService
      .deleteLocation(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log(`location ${id} successfully deleted`);
        this.locations = this.locations.filter((location) => location.id !== id);
      });
  }
}
