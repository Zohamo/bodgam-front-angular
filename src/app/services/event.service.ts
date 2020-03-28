import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { EventRepresentation } from '@/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private currentEventSubject: BehaviorSubject<EventRepresentation>;
  public currentEvent: Observable<EventRepresentation>;
  /**
   * Creates an instance of EventService.
   *
   * @param {HttpClient} http
   * @memberof EventService
   */
  constructor(private http: HttpClient) {
    this.currentEventSubject = new BehaviorSubject<EventRepresentation>(null);
    this.currentEvent = this.currentEventSubject.asObservable();
  }

  /**
   * Get current Event value
   *
   * @readonly
   * @type {EventRepresentation}
   * @memberof EventService
   */
  public get value(): EventRepresentation {
    return this.currentEventSubject.value;
  }

  /**
   * Edit the Event representation received
   *
   * @private
   * @param {EventRepresentation} event
   * @returns {EventRepresentation}
   * @memberof EventService
   */
  private eventEditor(event: EventRepresentation): EventRepresentation {
    if (!event.players) {
      event.players = [];
    }
    return event;
  }

  /**
   * Calls the API to get all events (of a specific Profile)
   *
   * @param {number} [profileId]
   * @returns {Observable<EventRepresentation[]>}
   * @memberof EventService
   */
  public getEvents(profileId?: number): Observable<EventRepresentation[]> {
    return profileId
      ? this.http.get<EventRepresentation[]>(`${environment.apiPath}/profile/${profileId}/events`).pipe(
          map((events) => {
            events.map((event) => this.eventEditor(event));
            return events;
          })
        )
      : this.http.get<EventRepresentation[]>(`${environment.apiPath}/events`).pipe(
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
   * @returns {Observable<EventRepresentation>}
   * @memberof EventService
   */
  public getEvent(id: number): Observable<EventRepresentation> {
    return this.value && this.value.id === id
      ? this.currentEvent
      : this.http.get<EventRepresentation>(`${environment.apiPath}/events/${id}`).pipe(
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
   * @param {EventRepresentation} event
   * @returns {Observable<EventRepresentation>}
   * @memberof EventService
   */
  public saveEvent(event: EventRepresentation): Observable<EventRepresentation> {
    return event.id
      ? this.http
          .put<EventRepresentation>(`${environment.apiPath}/events/${event.id}`, event)
          .pipe(map((eventRes) => this.eventEditor(eventRes)))
      : this.http
          .post<EventRepresentation>(`${environment.apiPath}/events`, event)
          .pipe(map((eventRes) => this.eventEditor(eventRes)));
  }

  /**
   * Call the BackEnd to delete an event
   *
   * @param {number} id
   * @returns {Observable<EventRepresentation>}
   * @memberof EventService
   */
  public deleteEvent(id: number): Observable<EventRepresentation> {
    return this.http.delete<EventRepresentation>(`${environment.apiPath}/events/${id}`);
  }
}
