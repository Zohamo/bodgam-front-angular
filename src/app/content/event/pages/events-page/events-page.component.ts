import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventBg } from '@/models';
import { UserService, EventService } from '@/services';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// UI
import { faCalendarAlt, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public events$: Observable<EventBg[]>;

  public isUserList: boolean;

  faCalendarAlt = faCalendarAlt;
  faCalendarPlus = faCalendarPlus;

  /**
   * Creates an instance of EventsPageComponent.
   *
   * @param {EventService} eventService
   * @memberof EventsPageComponent
   */
  constructor(private route: ActivatedRoute, private eventService: EventService, private userService: UserService) {}

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties
   *
   * @memberof EventsPageComponent
   */
  ngOnInit(): void {
    this.getEvents();
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof EventsPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Call EventService to get the events
   *
   * @private
   * @memberof EventsPageComponent
   */
  private getEvents(): void {
    if (this.route) {
      this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
        switch (data.name) {
          case 'listAll':
            this.isUserList = false;
            this.events$ = this.eventService.getEvents();
            break;
          case 'userList':
            this.isUserList = true;
            this.events$ = this.eventService.getEvents(this.userService.id);
            break;
        }
      });
    }
  }
}