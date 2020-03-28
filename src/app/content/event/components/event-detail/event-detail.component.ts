import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EventRepresentation } from '@/models';
import { EventService, UserService } from '@/services';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  public event: EventRepresentation;
  public userId: number;

  // UI
  faEdit = faEdit;
  faTrash = faTrash;

  /**
   * Inputs
   */

  @Input() set eventDetail(eventDetail: EventRepresentation) {
    this.event = eventDetail;
  }

  /**
   * Outputs
   */

  @Output() deleteEvent = new EventEmitter<number>();

  /**
   * Creates an instance of EventDetailComponent.
   *
   * @param {EventService} eventService
   * @param {UserService} userService
   * @memberof EventDetailComponent
   */
  constructor(private eventService: EventService, private userService: UserService) {
    this.userId = this.userService.id;
  }

  /**
   * OnEvent delete event
   *
   * @param {EventRepresentation} event
   * @memberof EventDetailComponent
   */
  public onDeleteEvent(event: EventRepresentation): void {
    if (this.userId === event.host.id) {
      this.deleteEvent.emit(event.id);
    }
  }
}
