import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppApi } from 'src/app/config/app.api';
import { AppKeys } from 'src/app/config/app.keys';
import { Geocode } from '@shared/models/geocode/geocode.model';

@Injectable({
  providedIn: 'root'
})
export class GeolocationWebService {
  private apiPath = AppApi.GEOLOCATION;

  /**
   * Creates an instance of GeolocationWebService.
   *
   * @param {HttpClient} http
   * @memberof GeolocationWebService
   */
  constructor(private http: HttpClient) {}

  /**
   * The geocoding service enables you to take an address and get the associated latitude and longitude.
   * https://developer.mapquest.com/documentation/open/geocoding-api/address/get/
   *
   * @param {string} address
   * @returns {Observable<Geocode>}
   * @memberof GeolocationWebService
   */
  public geocode(address: string): Observable<Geocode> {
    return this.http.get<Geocode>(`${this.apiPath}/address?key=${AppKeys.MAPQUEST}&location=${address}`);
  }

  /**
   * The reverse geocoding service allows a latitude and longitude to be converted to a location.
   * https://developer.mapquest.com/documentation/geocoding-api/reverse/get/
   *
   * @param {number} latitude
   * @param {number} longitude
   * @returns {Observable<Geocode>}
   * @memberof GeolocationWebService
   */
  public reverseGeocode(latitude: number, longitude: number): Observable<Geocode> {
    return this.http.get<Geocode>(`${this.apiPath}/reverse?key=${AppKeys.MAPQUEST}&location=${latitude},${longitude}`);
  }
}
