import { Injectable } from '@angular/core';
import { NavigatorGeolocationPosition } from '@/models';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  /**
   * Get current user's position with Navigator
   *
   * @returns {Promise<NavigatorGeolocationPosition>}
   * @memberof GeolocationService
   */
  public getPosition(): Promise<NavigatorGeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('geolocation OK', position);
          resolve(position);
        },
        (error) => {
          console.log('geolocation ERROR', error);
          // reject(error);
        }
      );
    });
  }
}
