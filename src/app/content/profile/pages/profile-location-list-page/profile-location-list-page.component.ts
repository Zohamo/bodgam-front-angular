import { Component } from '@angular/core';
import { LocationRepresentation } from '@/models';
import { LocationService, ProfileService } from '@/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-location-list-page',
  templateUrl: './profile-location-list-page.component.html',
  styleUrls: ['./profile-location-list-page.component.scss']
})
export class ProfileLocationListPageComponent {
  public profileId: number;
  public locations$: Observable<LocationRepresentation[]>;

  /**
   * Creates an instance of ProfileLocationListPageComponent.
   *
   * @param {LocationService} locationService
   * @param {ProfileService} profileService
   * @memberof ProfileLocationListPageComponent
   */
  constructor(private locationService: LocationService, private profileService: ProfileService) {
    this.profileId = this.profileService.value.id;
    this.locations$ = this.locationService.getLocations(this.profileId);
  }
}
