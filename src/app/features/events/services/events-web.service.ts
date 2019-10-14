import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Event } from "../models/event.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class EventsWebService {
  private eventsUrl = "http://localhost:3000/events";

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl);
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`{$this.eventsUrl}/{$id}`);
  }
}
