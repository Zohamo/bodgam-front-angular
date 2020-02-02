import { Component } from '@angular/core';
import { LocationRepresentation } from '../../models/location-representation.model';
import { LocationsWebService } from '../../services/locations-web.service';

// Entry components
import { LocationFormDialogComponent } from '../../components/location-form-dialog/location-form-dialog.component';

// UI
import { faMapMarked, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-locations-page',
  templateUrl: './locations-page.component.html',
  styleUrls: ['./locations-page.component.scss']
})
export class LocationsPageComponent {
  faMapMarked = faMapMarked;
  faMapMarkedAlt = faMapMarkedAlt;

  public locations: LocationRepresentation[];

  /**
   * Creates an instance of LocationsPageComponent.
   *
   * @param {LocationsWebService} locationsWebService
   * @memberof LocationsPageComponent
   */
  constructor(private locationsWebService: LocationsWebService, private dialog: MatDialog) {
    this.getLocations();
  }

  /**
   * Call LocationsWebService to get the user's locations
   *
   * @private
   * @memberof LocationsPageComponent
   */
  private getLocations(): void {
    this.locationsWebService.getLocations().subscribe(
      (locations) => {
        if (locations) {
          this.locations = locations;
        }
      },
      (error) => {
        console.log('getLocations ERROR', error);
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

    dialogRef.afterClosed().subscribe((locationSaved: LocationRepresentation) => {
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
    this.locationsWebService.deleteLocation(id).subscribe(() => {
      console.log(`location ${id} successfully deleted`);
      this.locations = this.locations.filter((location) => location.id !== id);
    });
  }
}
