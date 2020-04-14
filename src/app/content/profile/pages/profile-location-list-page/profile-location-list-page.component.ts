import { Component, OnDestroy } from '@angular/core';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { LocationItem, Profile, EventBg } from '@/models';
import { AlertService, LocationService, ProfileService, UserService } from '@/services';
import { Observable, Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { LocationFormDialogComponent } from '@/content/location/components';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-profile-location-list-page',
  templateUrl: './profile-location-list-page.component.html',
  styleUrls: ['./profile-location-list-page.component.scss']
})
export class ProfileLocationListPageComponent implements OnDestroy {
  public isAdmin: boolean;
  private profileId: number;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public locations$: Observable<LocationItem[]>;

  // Font Awesome
  faMapMarkedAlt = faMapMarkedAlt;

  /**
   * Creates an instance of ProfileLocationListPageComponent.
   *
   * @param {LocationService} locationService
   * @param {ProfileService} profileService
   * @memberof ProfileLocationListPageComponent
   */
  constructor(
    private alertService: AlertService,
    private locationService: LocationService,
    private profileService: ProfileService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    profileService.currentProfile$.pipe(takeUntil(this.destroy$)).subscribe((profile: Profile) => {
      if (profile && profile.id) {
        this.profileId = profile.id;
        this.locations$ = locationService.getLocations(profile.id);
        this.userService.currentUser$.subscribe((user) => {
          if (user) {
            this.isAdmin = profile.id === user.id;
          }
        });
      }
    });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof ProfileLocationListPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Open the dialog to create a location
   *
   * @memberof ProfileLocationListPageComponent
   */
  public openLocationFormDialog(): void {
    const dialogRef = this.dialog.open(LocationFormDialogComponent, {
      data: { id: null },
      panelClass: 'panel-location'
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(
        (locationSaved: LocationItem) => {
          console.log('locationSaved', locationSaved);
          if (locationSaved) {
            this.locations$ = this.locationService.getLocations(this.profileId);
            this.alertService.open('success-save-location', locationSaved.name);
          }
        },
        (error) => {
          this.alertService.open('error-save-location');
        }
      );
  }

  /**
   * Call LocationService to delete the Location.
   *
   * @param {LocationItem} location
   * @memberof ProfileLocationListPageComponent
   */
  public deleteLocation(location: LocationItem): void {
    this.locationService
      .deleteLocation(location.id)
      .pipe(first())
      .subscribe(
        (result) => {
          if (result) {
            console.log('result', result);
            // this.locations.splice(this.locations.indexOf(location), 1);
            this.locations$ = this.locationService.getLocations(this.profileId);
            this.alertService.open('success-delete-location', location.name);
          }
        },
        (error) => {
          console.log('ERROR delete Location', error);
          this.alertService.open('error-delete-location', location.name);
        }
      );
  }
}
