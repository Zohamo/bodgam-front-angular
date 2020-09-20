import { NotificationBg } from '@/models';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-notifications',
  templateUrl: './profile-notifications.component.html',
  styleUrls: ['./profile-notifications.component.scss']
})
export class ProfileNotificationsComponent {
  @Input() notifications: NotificationBg[];
  @Output() readNotification = new EventEmitter<string>();

  /**
   * TrackBy the notifications's list.
   *
   * @param {number} index
   * @param {*} item
   * @returns {(number | null)}
   * @memberof ProfileNotificationsComponent
   */
  public notificationTrackBy(index: number, item: any): number | null {
    return item ? item.id : null;
  }

  /**
   * On event mark a notification as read.
   *
   * @param {number} notificationId
   * @memberof ProfileNotificationsComponent
   */
  public onRead(notificationId: string): void {
    this.readNotification.emit(notificationId);
  }
}
