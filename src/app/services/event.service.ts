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
    this.currentEventSubject = new BehaviorSubject<EventBg>(new EventBg());
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
   * Update the Event observable value from the API result.
   *
   * @private
   * @param {EventBg} value
   * @returns {EventBg}
   * @memberof EventService
   */
  private updateValue(value: EventBg): EventBg {
    const newValue = Object.assign(this.value, this.eventFormatter(value));
    this.currentEventSubject.next(newValue);
    return newValue;
  }

  /**
   * Format the Event model received
   *
   * @private
   * @param {EventBg} event
   * @returns {EventBg}
   * @memberof EventService
   */
  private eventFormatter(event: EventBg): EventBg {
    if (!event.players) {
      event.players = [];
    }
    return event;
  }

  /**
   * Call the API to get all events.
   *
   * @param {number} [profileId]
   * @returns {Observable<EventBg[]>}
   * @memberof EventService
   */
  public getEvents(profileId?: number): Observable<EventBg[]> {
    return (profileId
      ? this.http.get<EventBg[]>(`${environment.apiPath}/profile/${profileId}/events`)
      : this.http.get<EventBg[]>(`${environment.apiPath}/events`)
    ).pipe(
      map((events) => {
        events.map((event) => this.eventFormatter(event));
        return events;
      })
    );
  }

  /**
   * Call the API to get one Event
   *
   * @param {number} id
   * @returns {Observable<EventBg>}
   * @memberof EventService
   */
  public getEvent(id: number): Observable<EventBg> {
    return this.value && this.value.id === id
      ? this.currentEvent
      : this.http
          .get<EventBg>(`${environment.apiPath}/events/${id}`)
          .pipe(map((eventRes) => this.updateValue(eventRes)));
  }

  /**
   * Call the API to save an Event
   *
   * @param {EventBg} event
   * @returns {Observable<EventBg>}
   * @memberof EventService
   */
  public saveEvent(event: EventBg): Observable<EventBg> {
    return (event.id
      ? this.http.put<EventBg>(`${environment.apiPath}/events/${event.id}`, event)
      : this.http.post<EventBg>(`${environment.apiPath}/events`, event)
    ).pipe(map((eventRes) => this.updateValue(eventRes)));
  }

  /**
   * Call the API to delete an Event
   *
   * @param {number} id
   * @returns {Observable<EventBg>}
   * @memberof EventService
   */
  public deleteEvent(id: number): Observable<EventBg> {
    return this.http.delete<EventBg>(`${environment.apiPath}/events/${id}`);
  }
}
