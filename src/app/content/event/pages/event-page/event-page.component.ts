import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EventBg } from '@/models';
import { AlertService, EventService, AuthService, PusherService } from '@/services';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent {
  public eventId$: Observable<number>;
  public event$: Observable<EventBg>;
  public event: EventBg;
  public userId: number;

  /**
   * Creates an instance of EventPageComponent.
   *
   * @param {ActivatedRoute} route
   * @param {AlertService} alertService
   * @param {EventService} eventService
   * @param {AuthService} authService
   * @param {Router} router
   * @memberof EventPageComponent
   */
  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser$.subscribe((user) => {
      this.userId = user ? user.id : null;

      this.event$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) => this.eventService.getEvent(+params.get('id')))
      );
    });
  }

  /**
   * Calls the EventService to delete an Event.
   *
   * @param {number} eventId
   * @memberof EventPageComponent
   */
  public deleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId).subscribe(
      (res) => {
        this.alertService.open('success-delete-event');
        this.router.navigate(['/events']);
      },
      (error) => {
        this.alertService.open('error-delete-event');
      }
    );
  }
}
