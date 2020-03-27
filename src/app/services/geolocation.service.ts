import { Injectable } from '@angular/core';
import { NavigatorGeolocationPosition } from '../models/navigator/navigator-geolocation-position.model';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  public getPosition(): Promise<NavigatorGeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('geolocation OK', position);
          resolve(position);
        },
        (error) => {
          console.log('geolocation ERROR', error);
          reject(error);
        }
      );
    });
  }
}
