import { Injectable } from '@angular/core';
import { AppKeys } from '@/config';
import { NotificationService } from './notification.service';
import Pusher from 'pusher-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  private pusher: any;

  /**
   * Creates an instance of PusherService.
   *
   * @memberof PusherService
   */
  constructor(private notificationService: NotificationService) {
    this.pusher = new Pusher(AppKeys.PUSHER_API_KEY, {
      cluster: AppKeys.PUSHER_API_CLUSTER,
      forceTLS: true
    });
  }

  /**
   * Subscribe to Pusher channel events.
   *
   * @param {string} channelName
   * @param {string[]} events
   * @param {(data: any) => void} cb
   * @memberof PusherService
   */
  public subscribeToChannel(channelName: string, events: string[], cb: (data: any) => void) {
    const channel = this.pusher.subscribe(channelName);
    events.forEach((event) => {
      channel.bind(event, (notification: any) => {
        console.log('PusherService.subScribeToChannel channel.bind', notification);
        cb(this.notificationService.convert(notification));
      });
    });
  }

  /**
   * Subscribe to Pusher channel events.
   *
   * @param {string} channelName
   * @param {string[]} events
   * @returns {Observable<any>}
   * @memberof PusherService
   */
  public subscribeToChannelObs(channelName: string, events: string[]): Observable<any> {
    return new Observable((observer) => {
      const channel = this.pusher.subscribe(channelName);
      events.forEach((event) => {
        channel.bind(event, (notification: any) => {
          console.log('PusherService.subscribeToChannelObs channel.bind', notification);
          notification = this.notificationService.convert(notification);
          if (notification && notification.data) {
            console.log('PusherService subscribeToChannelObs NOTIFICATION', notification);
            observer.next(notification.data);
          }
        });
      });
    });
  }
}
