import { Component, Input } from '@angular/core';
import { faBuilding, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { EventBg } from '@/models';
import { AlertService, AuthService, EventService } from '@/services';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  public userId: number;

  // UI
  faBuilding = faBuilding;
  faUsers = faUsers;
  faUserTie = faUserTie;

  /**
   * Inputs
   */

  @Input() events: EventBg[];

  /**
   * Creates an instance of EventListComponent.
   *
   * @param {AlertService} alertService
   * @param {AuthService} authService
   * @param {EventService} eventService
   * @memberof EventListComponent
   */
  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private eventService: EventService
  ) {
    this.userId = this.authService.id;
  }

  /**
   * TrackBy the events's list
   *
   * @param {*} index
   * @param {*} item
   * @returns {(number | null)}
   * @memberof EventListComponent
   */
  public eventTrackBy(index, item): number | null {
    return item ? item.id : null;
  }

  /**
   * OnEvent delete event
   *
   * @param {EventBg} event
   * @memberof EventListComponent
   */
  public onDeleteEvent(event: EventBg): void {
    this.eventService.deleteEvent(event.id).subscribe(
      (res) => {
        console.log('DELETE EVENT', res);
        this.events.splice(this.events.indexOf(event), 1);
        this.alertService.open('success-delete-event');
      },
      (error) => {
        console.log('ERROR DELETE EVENT', error);
        this.alertService.open('error-delete-event');
      }
    );
  }
}
