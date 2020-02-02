import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env';
import { EventRepresentation } from '../models/event-representation.model';

// Stubs
import eventsStub from 'src/assets/data/stubs/stub-events.json';
import eventStub from 'src/assets/data/stubs/stub-event.json';

@Injectable({
  providedIn: 'root'
})
export class EventsWebService {
  private api = `${environment.apiPath}/events`;

  /**
   * Creates an instance of EventsWebService.
   *
   * @param {HttpClient} http
   * @memberof EventsWebService
   */
  constructor(private http: HttpClient) {}

  /**
   * Calls the server to get all events
   *
   * @returns {Observable<EventRepresentation[]>}
   * @memberof EventsWebService
   */
  public getEvents(userId?: number): Observable<EventRepresentation[]> {
    return of(eventsStub);
    return userId
      ? this.http.get<EventRepresentation[]>(`${this.api}/${userId}`)
      : this.http.get<EventRepresentation[]>(`${this.api}`);
  }

  /**
   * Calls the server to get one event by its id
   *
   * @param {number} id
   * @returns {Observable<EventRepresentation>}
   * @memberof EventsWebService
   */
  public getEvent(id: number): Observable<EventRepresentation> {
    return of(eventStub);
    return this.http.get<EventRepresentation>(`{$this.api}/{$id}`);
  }

  /**
   * Call the BackEnd to save an event
   *
   * @param {EventRepresentation} event
   * @returns {Observable<EventRepresentation>}
   * @memberof EventsWebService
   */
  public saveEvent(event: EventRepresentation): Observable<EventRepresentation> {
    return of(eventStub);
    return event.id
      ? this.http.patch<EventRepresentation>(`${this.api}/${event.id}`, event)
      : this.http.post<EventRepresentation>(`${this.api}`, event);
  }

  /**
   * Call the BackEnd to delete an event
   *
   * @param {number} eventId
   * @returns {Observable<EventRepresentation>}
   * @memberof EventsWebService
   */
  public deleteLocation(eventId: number): Observable<EventRepresentation> {
    return of(eventStub);
    return this.http.delete<EventRepresentation>(`${this.api}/${eventId}`);
  }
}
