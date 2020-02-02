import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@env';
import { LocationRepresentation } from '../models/location-representation.model';
import { LocationFullRepresentation } from '../models/location-full-representation';

// Stubs
import locationsStub from 'src/assets/data/stubs/stub-locations.json';
import locationStub from 'src/assets/data/stubs/stub-location-full.json';

@Injectable({
  providedIn: 'root'
})
export class LocationsWebService {
  private api = `${environment.apiPath}/locations`;

  /**
   * Creates an instance of LocationsWebService.
   *
   * @param {HttpClient} http
   * @memberof LocationsWebService
   */
  constructor(private http: HttpClient) {}

  /**
   * Call the BackEnd to get a user's locations
   *
   * @param {number} userId
   * @returns {Observable<LocationRepresentation[]>}
   * @memberof LocationsWebService
   */
  public getLocations(): Observable<LocationRepresentation[]> {
    // return this.http.get<LocationRepresentation[]>(`{$this.api}`);
    return of(locationsStub);
  }

  /**
   * Call the BackEnd to get a locations's data
   *
   * @param {number} id
   * @returns {Observable<LocationFullRepresentation>}
   * @memberof LocationsWebService
   */
  public getLocation(id: number): Observable<LocationFullRepresentation> {
    console.log('getLocation', id);
    return of(id ? locationStub : new LocationFullRepresentation());
    return id ? this.http.get<LocationFullRepresentation>(`{$this.api}/{$id}`) : of(new LocationFullRepresentation());
  }

  /**
   * Call the BackEnd to create a new location
   *
   * @param {LocationFullRepresentation} location
   * @returns {Observable<LocationFullRepresentation>}
   * @memberof LocationsWebService
   */
  public createLocation(location: LocationFullRepresentation): Observable<LocationFullRepresentation> {
    // return this.http.post<LocationFullRepresentation>(`${this.api}`, location);
    return of(locationStub);
  }

  /**
   * Call the BackEnd to edit a location's data
   *
   * @param {LocationFullRepresentation} location
   * @returns {Observable<LocationFullRepresentation>}
   * @memberof LocationsWebService
   */
  public updateLocation(location: LocationFullRepresentation): Observable<LocationFullRepresentation> {
    // return this.http.patch<LocationFullRepresentation>(`${this.api}/${location.id}`, location);
    return of(locationStub);
  }

  /**
   * Call the BackEnd to save a location's data
   *
   * @param {LocationFullRepresentation} location
   * @returns {Observable<LocationFullRepresentation>}
   * @memberof LocationsWebService
   */
  public saveLocation(location: LocationFullRepresentation): Observable<LocationFullRepresentation> {
    return of(locationStub);
    return location.id
      ? this.http.patch<LocationFullRepresentation>(`${this.api}/${location.id}`, location)
      : this.http.post<LocationFullRepresentation>(`${this.api}`, location);
  }

  /**
   * Call the BackEnd to delete a location
   *
   * @param {number} locationId
   * @returns {Observable<LocationFullRepresentation>}
   * @memberof LocationsWebService
   */
  public deleteLocation(locationId: number): Observable<LocationFullRepresentation> {
    // return this.http.delete<LocationFullRepresentation>(`${this.api}/${locationId}`);
    return of(locationStub);
  }
}
