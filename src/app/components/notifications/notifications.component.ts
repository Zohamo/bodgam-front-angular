import { NotificationBg } from '@/models';
import { Component, Input } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  // UI
  faBell = faBell;

  @Input() notifications: NotificationBg[];

  /**
   * TrackBy the notifications's list
   *
   * @param {number} index
   * @param {*} item
   * @returns {(number | null)}
   * @memberof NotificationsComponent
   */
  public notificationTrackBy(index: number, item: any): number | null {
    return item ? item.id : null;
  }
}
