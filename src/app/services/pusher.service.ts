import { Injectable } from '@angular/core';
import { AppKeys } from '@/config';
import { NotificationService } from './notification.service';
import Pusher from 'pusher-js';

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
      console.log('PusherService.subScribeToChannel forEach event', event);
      channel.bind(event, (notification: any) => {
        console.log('PusherService.subScribeToChannel channel.bind', notification);
        cb(this.notificationService.convert(notification));
      });
    });
  }
}
