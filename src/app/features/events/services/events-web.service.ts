import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env';
import { EventRepresentation } from '../models/event-representation.model';

// Stubs
import events from 'src/assets/data/stubs/stub-events.json';
import event from 'src/assets/data/stubs/stub-event.json';

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
    /* return userId
      ? this.http.get<EventRepresentation[]>(`${this.api}/${userId}`)
      : this.http.get<EventRepresentation[]>(`${this.api}`); */
    return of(events);
  }

  /**
   * Calls the server to get one event by its id
   *
   * @param {number} id
   * @returns {Observable<EventRepresentation>}
   * @memberof EventsWebService
   */
  public getEvent(id: number): Observable<EventRepresentation> {
    // return this.http.get<EventRepresentation>(`{$this.api}/{$id}`);
    return of(event);
  }
}
