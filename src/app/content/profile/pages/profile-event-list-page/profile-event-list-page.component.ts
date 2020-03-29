import { Component } from '@angular/core';
import { EventRepresentation } from '@/models';
import { EventService, ProfileService } from '@/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-event-list-page',
  templateUrl: './profile-event-list-page.component.html',
  styleUrls: ['./profile-event-list-page.component.scss']
})
export class ProfileEventListPageComponent {
  public profileId: number;
  public events$: Observable<EventRepresentation[]>;

  /**
   * Creates an instance of ProfileEventListPageComponent.
   *
   * @param {EventService} eventService
   * @param {ProfileService} profileService
   * @memberof ProfileEventListPageComponent
   */
  constructor(private eventService: EventService, private profileService: ProfileService) {
    this.profileId = this.profileService.value.id;
    this.events$ = this.eventService.getEvents(this.profileId);
  }
}
