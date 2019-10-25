import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationRepresentation } from '../models/location-representation.model';
import { LocationFullRepresentation } from '../models/location-full-representation';

// Stubs
import locations from 'src/assets/data/stubs/stub-locations.json';
import location from 'src/assets/data/stubs/stub-location-full.json';

@Injectable({
  providedIn: 'root'
})
export class LocationsWebService {
  private api = `${environment.apiPath}/locations`;

  constructor(private http: HttpClient) {}

  public getLocations(userId: number): Observable<LocationRepresentation[]> {
    // return this.http.get<LocationRepresentation[]>(`{$this.api}/user/{$userId}`);
    return of(locations);
  }

  public getLocation(id: number): Observable<LocationFullRepresentation> {
    // return this.http.get<LocationRepresentation>(`{$this.api}/{$id}`);
    return of(location);
  }
}
