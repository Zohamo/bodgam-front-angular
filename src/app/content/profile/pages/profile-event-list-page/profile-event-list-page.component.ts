import { Component, OnDestroy } from '@angular/core';
import { EventBg, Profile } from '@/models';
import { EventService, ProfileService } from '@/services';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-event-list-page',
  templateUrl: './profile-event-list-page.component.html',
  styleUrls: ['./profile-event-list-page.component.scss']
})
export class ProfileEventListPageComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public events$: Observable<EventBg[]>;

  /**
   * Creates an instance of ProfileEventListPageComponent.
   *
   * @param {EventService} eventService
   * @param {ProfileService} profileService
   * @memberof ProfileEventListPageComponent
   */
  constructor(private eventService: EventService, private profileService: ProfileService) {
    profileService.currentProfile$.pipe(takeUntil(this.destroy$)).subscribe((profile: Profile) => {
      if (profile && profile.id) {
        this.events$ = eventService.getEvents(profile.id);
      }
    });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof ProfileEventListPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
