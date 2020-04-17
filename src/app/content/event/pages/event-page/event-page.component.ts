import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EventBg } from '@/models';
import { AlertService, EventService, UserService } from '@/services';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent {
  public event$: Observable<EventBg>;
  public userId: number;

  /**
   * Creates an instance of EventPageComponent.
   *
   * @param {ActivatedRoute} route
   * @param {AlertService} alertService
   * @param {EventService} eventService
   * @param {UserService} userService
   * @param {Router} router
   * @memberof EventPageComponent
   */
  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private eventService: EventService,
    private userService: UserService,
    private router: Router
  ) {
    this.userService.currentUser$.subscribe((user) => {
      this.userId = user ? user.id : null;
      this.getEvent();
    });
  }

  /**
   * Calls the EventService to get an event by its id
   *
   * @private
   * @memberof EventPageComponent
   */
  private getEvent(): void {
    this.event$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.eventService.getEvent(+params.get('id')))
    );
  }

  /**
   * Call the EventService to delete the Event
   *
   * @param {number} eventId
   * @memberof EventPageComponent
   */
  public deleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId).subscribe(
      (res) => {
        console.log('DELETE EVENT', res);
        this.alertService.open('success-delete-event');
        this.router.navigate(['/events']);
      },
      (error) => {
        console.log('ERROR DELETE EVENT', error);
        this.alertService.open('error-delete-event');
      }
    );
  }
}
