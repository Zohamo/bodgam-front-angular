import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { LocationFullRepresentation, LocationRepresentation } from '@/models';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private currentLocationSubject: BehaviorSubject<LocationFullRepresentation>;
  public currentLocation: Observable<LocationFullRepresentation>;
  /**
   * Creates an instance of LocationService.
   *
   * @param {HttpClient} http
   * @memberof LocationService
   */
  constructor(private http: HttpClient) {
    this.currentLocationSubject = new BehaviorSubject<LocationFullRepresentation>(null);
    this.currentLocation = this.currentLocationSubject.asObservable();
  }

  /**
   * Get current Location value
   *
   * @readonly
   * @type {LocationFullRepresentation}
   * @memberof LocationService
   */
  public get value(): LocationFullRepresentation {
    return this.currentLocationSubject.value;
  }

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
   * Call the API to get a locations's data
   *
   * @param {number} id
   * @returns {Observable<LocationFullRepresentation>}
   * @memberof LocationService
   */
  public getLocation(id: number): Observable<LocationFullRepresentation> {
    return !id
      ? of(new LocationFullRepresentation())
      : this.value && this.value.id === id
      ? this.currentLocation
      : this.http.get<LocationFullRepresentation>(`${environment.apiPath}/locations/${id}`).pipe(
          map((locationRes) => {
            this.currentLocationSubject.next(locationRes);
            return locationRes;
          })
        );
  }

  /**
   * Call the API to save a location
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
