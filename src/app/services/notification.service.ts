import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { NotificationBg } from '@/models';
import { map } from 'rxjs/operators';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  /**
   * Creates an instance of NotificationService.
   *
   * @param {HttpClient} http
   * @memberof NotificationService
   */
  constructor(private http: HttpClient) {}

  /**
   * Call the API to get the User's Notifications.
   *
   * @returns {Observable<any>}
   * @memberof NotificationService
   */
  public getUserNotifications(): Observable<NotificationBg[]> {
    return this.http
      .get<any>(`${environment.apiPath}/user/notifications`)
      .pipe(map((notifications) => notifications.map((notification: any) => this.convert(notification))));
  }

  /**
   * Call the API to get the User's unread Notifications.
   *
   * @returns {Observable<any>}
   * @memberof NotificationService
   */
  public getUserUnreadNotifications(): Observable<NotificationBg[]> {
    return this.http
      .get<any>(`${environment.apiPath}/user/notifications/unread`)
      .pipe(map((notifications) => notifications.map((notification: any) => this.convert(notification))));
  }

  /**
   * Call the API to mark a notification as read.
   *
   * @param {number} notificationId
   * @returns {Observable<NotificationBg>}
   * @memberof NotificationService
   */
  public markNotificationRead(notificationId: number): Observable<NotificationBg> {
    return this.http
      .get<NotificationBg>(`${environment.apiPath}/user/notifications/${notificationId}/read`)
      .pipe(map((notification: any) => this.convert(notification)));
  }

  /**
   * Convert the Notification object received from BackEnd (or Pusher) to NotificationBg model.
   *
   * @private
   * @param {*} notification
   * @returns {NotificationBg}
   * @memberof NotificationService
   */
  public convert(notification: any): NotificationBg {
    return this.addLink({
      id: notification.id,
      createdAt: moment(notification.created_at).format('LLLL'),
      updatedAt: notification.updated_at,
      readAt: notification.read_at,
      type: notification.type.split('\\')[2],
      notifiableId: notification.notifiable_id,
      notifiableType: notification.notifiable_type.split('\\')[1],
      data: typeof notification.data === 'string' ? JSON.parse(notification.data) : notification.data
    });
  }

  /**
   * Build and add the link property to the notification.
   *
   * @private
   * @param {NotificationBg} notification
   * @returns {NotificationBg}
   * @memberof NotificationService
   */
  private addLink(notification: NotificationBg): NotificationBg {
    switch (notification.type) {
      case 'UserEventSubscription':
        notification.link = `/events/${notification.data.event.id}`;
    }
    return notification;
  }
}
