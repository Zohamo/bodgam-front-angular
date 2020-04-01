import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faCalendarAlt, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { EventBg, Profile } from '@/models';
import { EventService, ProfileService } from '@/services';
import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-profile-agenda-page',
  templateUrl: './profile-agenda-page.component.html',
  styleUrls: ['./profile-agenda-page.component.scss']
})
export class ProfileAgendaPageComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public events$: Observable<EventBg[]>;
  public filteredEvents$: Observable<EventBg[]>;

  // Font Awesome
  faCalendarAlt = faCalendarAlt;
  faCalendarPlus = faCalendarPlus;

  /**
   * Creates an instance of ProfileAgendaPageComponent.
   *
   * @param {EventService} eventService
   * @param {ProfileService} profileService
   * @memberof ProfileAgendaPageComponent
   */
  constructor(private eventService: EventService, private profileService: ProfileService) {
    profileService.currentProfile$.pipe(takeUntil(this.destroy$)).subscribe((profile: Profile) => {
      if (profile && profile.id) {
        this.events$ = eventService.getEventsSubscribed(profile.id);
      }
    });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof ProfileAgendaPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Set the filtered events from the EventsFiltersComponent.
   *
   * @param {Observable<EventBg[]>} filteredEvents$
   * @memberof ProfileAgendaPageComponent
   */
  public setFilteredEvents(filteredEvents$: Observable<EventBg[]>): void {
    this.filteredEvents$ = filteredEvents$;
  }
}
