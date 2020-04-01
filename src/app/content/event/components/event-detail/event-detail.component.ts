import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EventBg } from '@/models';
import { EventService } from '@/services';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  public event: EventBg;

  // UI
  faEdit = faEdit;
  faTrash = faTrash;

  /**
   * Inputs
   */

  @Input() userId: number;

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
   * @memberof EventDetailComponent
   */
  constructor(private eventService: EventService) {}

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
