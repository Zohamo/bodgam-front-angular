import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EventBg } from '@/models';
import { EventService } from '@/services';
import { DialogConfirmComponent } from '@/components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  public event: EventBg;
  public showLocation: boolean;

  // UI
  faEdit = faEdit;
  faTrash = faTrash;

  /**
   * Inputs
   */

  @Input() userId: number;

  @Input() set eventDetail(event: EventBg) {
    this.event = event;
    this.setShowLocation();
  }

  /**
   * Outputs
   */

  @Output() deleteEvent = new EventEmitter<number>();

  /**
   * Creates an instance of EventDetailComponent.
   *
   * @param {EventService} eventService
   * @param {MatDialog} dialog
   * @memberof EventDetailComponent
   */
  constructor(private eventService: EventService, private dialog: MatDialog) {}

  /**
   * Define if the User can access the full Location
   *
   * @memberof EventDetailComponent
   */
  public setShowLocation(): void {
    this.showLocation =
      !this.event.location.deleted_at &&
      (this.event.location.isPublic ||
        this.event.host.id === this.userId ||
        (this.event.subscription && this.event.subscription.isAccepted));
  }

  /**
   * OnEvent delete event
   *
   * @param {EventBg} event
   * @memberof EventDetailComponent
   */
  public onDeleteEvent(event: EventBg): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { message: 'delete-event', name: event.title }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteEvent.emit(event.id);
      }
    });
  }
}
