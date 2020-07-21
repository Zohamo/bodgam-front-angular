import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Location, LocationItem, EventBg } from '@/models';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private currentLocationSubject: BehaviorSubject<Location>;
  public currentLocation: Observable<Location>;
  /**
   * Creates an instance of LocationService.
   *
   * @param {HttpClient} http
   * @memberof LocationService
   */
  constructor(private http: HttpClient) {
    this.currentLocationSubject = new BehaviorSubject<Location>(null);
    this.currentLocation = this.currentLocationSubject.asObservable();
  }

  /**
   * Get current Location value
   *
   * @readonly
   * @type {Location}
   * @memberof LocationService
   */
  public get value(): Location {
    return this.currentLocationSubject.value;
  }

  /**
   * Call the API to get all locations (of a specific Profile)
   *
   * @param {number} [profileId]
   * @returns {Observable<LocationItem[]>}
   * @memberof LocationService
   */
  public getLocations(profileId?: number): Observable<LocationItem[]> {
    return profileId
      ? this.http.get<LocationItem[]>(`${environment.apiPath}/profiles/${profileId}/locations`)
      : this.http.get<LocationItem[]>(`${environment.apiPath}/locations`);
  }

  /**
   * Call the API to get a locations's data
   *
   * @param {number} id
   * @returns {Observable<Location>}
   * @memberof LocationService
   */
  public getLocation(id: number): Observable<Location> {
    return !id
      ? of(new Location())
      : this.value && this.value.id === id
      ? of(this.value)
      : this.http.get<Location>(`${environment.apiPath}/locations/${id}`).pipe(
          map((locationRes) => {
            this.currentLocationSubject.next(locationRes);
            return locationRes;
          })
        );
  }

  /**
   * Call the API to get the Events related to the Location.
   *
   * @param {number} id
   * @returns {Observable<EventBg[]>}
   * @memberof LocationService
   */
  public getLocationEvents(id: number): Observable<EventBg[]> {
    return this.http.get<EventBg[]>(`${environment.apiPath}/locations/${id}/events`);
  }

  /**
   * Call the API to save a location
   *
   * @param {Location} location
   * @returns {Observable<Location>}
   * @memberof LocationService
   */
  public saveLocation(location: Location): Observable<Location> {
    return location.id
      ? this.http.put<Location>(`${environment.apiPath}/locations/${location.id}`, location)
      : this.http.post<Location>(`${environment.apiPath}/locations`, location);
  }

  /**
   * Call the BackEnd to delete a location
   *
   * @param {number} id
   * @returns {Observable<Location>}
   * @memberof LocationService
   */
  public deleteLocation(id: number): Observable<Location> {
    return this.http.delete<Location>(`${environment.apiPath}/locations/${id}`);
  }
}
