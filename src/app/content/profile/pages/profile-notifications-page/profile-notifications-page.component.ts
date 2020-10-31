import { NotificationBg, Profile } from '@/models';
import { NotificationService, ProfileService, PusherService } from '@/services';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-notifications-page',
  templateUrl: './profile-notifications-page.component.html',
  styleUrls: ['./profile-notifications-page.component.scss']
})
export class ProfileNotificationsPageComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public notifications: NotificationBg[] = [];

  constructor(
    private notificationService: NotificationService,
    private profileService: ProfileService,
    private pusherService: PusherService
  ) {
    this.profileService.currentProfile$.pipe(takeUntil(this.destroy$)).subscribe((profile: Profile) => {
      if (profile && profile.id) {
        // Subscription to pusher's notifications
        this.pusherService.subscribeToChannel('user-notifications', [`user-${profile.id}`], (notification) => {
          console.log('pusherService.subscribeToChannel', notification);
          this.notifications.unshift(notification);
        });
      }
    });

    // Get the notifications list
    this.notificationService
      .getUserNotifications()
      .pipe(first())
      .subscribe((notifications: NotificationBg[]) => {
        console.log('notificationService.getNotifications', notifications);
        this.notifications = notifications || [];
      });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof ProfileNotificationsPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Mark a notification as read.
   *
   * @param {number} notificationId
   * @memberof ProfileNotificationsPageComponent
   */
  public readNotification(notificationId: number): void {
    this.notificationService.markNotificationRead(notificationId).subscribe((notificationRead) => {
      console.log('réponse de lecture', notificationRead);
      const index = this.notifications.findIndex((notification) => notification.id === notificationId);
      const newArray = [...this.notifications];
      newArray[index] = { ...newArray[index], readAt: notificationRead.readAt };
      this.notifications = newArray;
      console.log('newArray', newArray);
      console.log('notifications', this.notifications);
    });
  }
}
