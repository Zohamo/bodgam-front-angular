import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { EventRepresentation } from '../models/event-representation.model';

@Injectable({
  providedIn: 'root'
})
export class EventsWebService {
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
    return userId
      ? this.http.get<EventRepresentation[]>(`${environment.apiPath}/users/${userId}/events`)
      : this.http.get<EventRepresentation[]>(`${environment.apiPath}/events`);
  }

  /**
   * Calls the server to get one event by its id
   *
   * @param {number} id
   * @returns {Observable<EventRepresentation>}
   * @memberof EventsWebService
   */
  public getEvent(id: number): Observable<EventRepresentation> {
    return this.http.get<EventRepresentation>(`${environment.apiPath}/events/${id}`);
  }

  /**
   * Call the BackEnd to save an event
   *
   * @param {EventRepresentation} event
   * @returns {Observable<EventRepresentation>}
   * @memberof EventsWebService
   */
  public saveEvent(event: EventRepresentation): Observable<EventRepresentation> {
    return event.id
      ? this.http.put<EventRepresentation>(`${environment.apiPath}/events/${event.id}`, event)
      : this.http.post<EventRepresentation>(`${environment.apiPath}`, event);
  }

  /**
   * Call the BackEnd to delete an event
   *
   * @param {number} id
   * @returns {Observable<EventRepresentation>}
   * @memberof EventsWebService
   */
  public deleteEvent(id: number): Observable<EventRepresentation> {
    return this.http.delete<EventRepresentation>(`${environment.apiPath}/events/${id}`);
  }
}
