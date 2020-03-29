import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { EventBg } from '@/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private currentEventSubject: BehaviorSubject<EventBg>;
  public currentEvent: Observable<EventBg>;
  /**
   * Creates an instance of EventService.
   *
   * @param {HttpClient} http
   * @memberof EventService
   */
  constructor(private http: HttpClient) {
    this.currentEventSubject = new BehaviorSubject<EventBg>(null);
    this.currentEvent = this.currentEventSubject.asObservable();
  }

  /**
   * Get current Event value
   *
   * @readonly
   * @type {EventBg}
   * @memberof EventService
   */
  public get value(): EventBg {
    return this.currentEventSubject.value;
  }

  /**
   * Edit the Event model received
   *
   * @private
   * @param {EventBg} event
   * @returns {EventBg}
   * @memberof EventService
   */
  private eventEditor(event: EventBg): EventBg {
    if (!event.players) {
      event.players = [];
    }
    return event;
  }

  /**
   * Calls the API to get all events (of a specific Profile)
   *
   * @param {number} [profileId]
   * @returns {Observable<EventBg[]>}
   * @memberof EventService
   */
  public getEvents(profileId?: number): Observable<EventBg[]> {
    return profileId
      ? this.http.get<EventBg[]>(`${environment.apiPath}/profile/${profileId}/events`).pipe(
          map((events) => {
            events.map((event) => this.eventEditor(event));
            return events;
          })
        )
      : this.http.get<EventBg[]>(`${environment.apiPath}/events`).pipe(
          map((events) => {
            events.map((event) => this.eventEditor(event));
            return events;
          })
        );
  }

  /**
   * Calls the server to get one event by its id
   *
   * @param {number} id
   * @returns {Observable<EventBg>}
   * @memberof EventService
   */
  public getEvent(id: number): Observable<EventBg> {
    return this.value && this.value.id === id
      ? this.currentEvent
      : this.http.get<EventBg>(`${environment.apiPath}/events/${id}`).pipe(
          map((eventRes) => {
            const event = this.eventEditor(eventRes);
            this.currentEventSubject.next(event);
            return event;
          })
        );
  }

  /**
   * Call the BackEnd to save an event
   *
   * @param {EventBg} event
   * @returns {Observable<EventBg>}
   * @memberof EventService
   */
  public saveEvent(event: EventBg): Observable<EventBg> {
    return event.id
      ? this.http
          .put<EventBg>(`${environment.apiPath}/events/${event.id}`, event)
          .pipe(map((eventRes) => this.eventEditor(eventRes)))
      : this.http
          .post<EventBg>(`${environment.apiPath}/events`, event)
          .pipe(map((eventRes) => this.eventEditor(eventRes)));
  }

  /**
   * Call the BackEnd to delete an event
   *
   * @param {number} id
   * @returns {Observable<EventBg>}
   * @memberof EventService
   */
  public deleteEvent(id: number): Observable<EventBg> {
    return this.http.delete<EventBg>(`${environment.apiPath}/events/${id}`);
  }
}
