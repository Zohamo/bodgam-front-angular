import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EventBg } from '@/models';
import { EventService, UserService } from '@/services';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  public event: EventBg;
  public userId: number;

  // UI
  faEdit = faEdit;
  faTrash = faTrash;

  /**
   * Inputs
   */

  @Input() set eventDetail(eventDetail: EventBg) {
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
   * @param {EventBg} event
   * @memberof EventDetailComponent
   */
  public onDeleteEvent(event: EventBg): void {
    if (this.userId === event.host.id) {
      this.deleteEvent.emit(event.id);
    }
  }
}
