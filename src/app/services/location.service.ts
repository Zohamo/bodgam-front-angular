import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { LocationFullRepresentation, LocationRepresentation } from '@/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  /**
   * Creates an instance of LocationService.
   *
   * @param {HttpClient} http
   * @memberof LocationService
   */
  constructor(private http: HttpClient) {}

  /**
   * Call the API to get all locations (of a specific Profile)
   *
   * @param {number} [profileId]
   * @returns {Observable<LocationRepresentation[]>}
   * @memberof LocationService
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
   * @memberof LocationService
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
   * @memberof LocationService
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
   * @memberof LocationService
   */
  public deleteLocation(id: number): Observable<LocationFullRepresentation> {
    return this.http.delete<LocationFullRepresentation>(`${environment.apiPath}/locations/${id}`);
  }
}
