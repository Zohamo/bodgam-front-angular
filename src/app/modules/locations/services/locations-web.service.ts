import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable, of } from 'rxjs';

// Models
import { LocationFullRepresentation } from '../models/location-full-representation';
import { LocationRepresentation } from '../models/location-representation.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsWebService {
  /**
   * Creates an instance of LocationsWebService.
   *
   * @param {HttpClient} http
   * @memberof LocationsWebService
   */
  constructor(private http: HttpClient) {}

  /**
   * Call the API to get all locations (of a specific Profile)
   *
   * @param {number} [profileId]
   * @returns {Observable<LocationRepresentation[]>}
   * @memberof LocationsWebService
   */
  public getLocations(profileId?: number): Observable<LocationRepresentation[]> {
    return profileId
      ? this.http.get<LocationRepresentation[]>(`${environment.apiPath}/profile/${profileId}/locations`)
      : this.http.get<LocationRepresentation[]>(`${environment.apiPath}/locations`);
  }

  /**
   * Call the BackEnd to get a locations's data
   *
   * @param {number} id
   * @returns {Observable<LocationFullRepresentation>}
   * @memberof LocationsWebService
   */
  public getLocation(id: number): Observable<LocationFullRepresentation> {
    return id
      ? this.http.get<LocationFullRepresentation>(`${environment.apiPath}/locations/${id}`)
      : of(new LocationFullRepresentation());
  }

  /**
   * Call the BackEnd to save a location
   *
   * @param {LocationFullRepresentation} location
   * @returns {Observable<LocationFullRepresentation>}
   * @memberof LocationsWebService
   */
  public saveLocation(location: LocationFullRepresentation): Observable<LocationFullRepresentation> {
    return location.id
      ? this.http.put<LocationFullRepresentation>(`${environment.apiPath}/locations/${location.id}`, location)
      : this.http.post<LocationFullRepresentation>(`${environment.apiPath}/locations`, location);
  }

  /**
   * Call the BackEnd to delete a location
   *
   * @param {number} id
   * @returns {Observable<LocationFullRepresentation>}
   * @memberof LocationsWebService
   */
  public deleteLocation(id: number): Observable<LocationFullRepresentation> {
    return this.http.delete<LocationFullRepresentation>(`${environment.apiPath}/locations/${id}`);
  }
}
