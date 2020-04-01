import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { EventSubscription } from '@/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventSubscriptionService {
  /**
   * Creates an instance of EventSubscriptionService.
   *
   * @param {HttpClient} http
   * @memberof EventSubscriptionService
   */
  constructor(private http: HttpClient) {}

  /**
   * Save a User's Subscription to an Event.
   *
   * @param {EventSubscription} eventSubscription
   * @returns {Observable<EventSubscription>}
   * @memberof EventSubscriptionService
   */
  public save(eventSubscription: EventSubscription): Observable<EventSubscription> {
    return this.http.put<EventSubscription>(
      `${environment.apiPath}/events/${eventSubscription.eventId}/users/${eventSubscription.userId}/subscription`,
      eventSubscription
    );
  }

  /**
   * Delete a User's Subscription to an Event.
   *
   * @param {number} eventId
   * @param {number} userId
   * @returns {Observable<boolean>}
   * @memberof EventSubscriptionService
   */
  public delete(eventId: number, userId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiPath}/events/${eventId}/users/${userId}/subscription`);
  }
}
