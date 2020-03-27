import { Component, Input } from '@angular/core';
import { EventRepresentation } from '@/models';
import { AlertService, AuthenticationWebService, EventsWebService } from '@/services';

// UI
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  public userId: number;

  // UI
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

  /**
   * Inputs
   */

  @Input() events: EventRepresentation[];

  /**
   * Creates an instance of EventListComponent.
   *
   * @param {AlertService} alertService
   * @param {AuthenticationWebService} authenticationWebService
   * @param {EventsWebService} eventsWebService
   * @memberof EventListComponent
   */
  constructor(
    private alertService: AlertService,
    private authenticationWebService: AuthenticationWebService,
    private eventsWebService: EventsWebService
  ) {
    this.userId = this.authenticationWebService.currentUserValue
      ? this.authenticationWebService.currentUserValue.id
      : null;
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
   * @param {number} eventId
   * @memberof EventListComponent
   */
  public onDeleteEvent(event: EventRepresentation): void {
    this.eventsWebService.deleteEvent(event.id).subscribe(
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