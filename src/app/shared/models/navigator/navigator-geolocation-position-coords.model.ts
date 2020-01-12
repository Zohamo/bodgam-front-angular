import { AppConfig } from 'src/app/config/app.config';

export class NavigatorGeolocationPositionCoords {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;

  constructor(coords?: NavigatorGeolocationPositionCoords) {
    this.accuracy = coords ? coords.accuracy : AppConfig.MAP_INIT_ACCURACY;
    this.altitude = coords ? coords.altitude : null;
    this.altitudeAccuracy = coords ? coords.altitudeAccuracy : null;
    this.heading = coords ? coords.heading : null;
    this.latitude = coords ? coords.latitude : AppConfig.MAP_INIT_LATITUDE;
    this.longitude = coords ? coords.longitude : AppConfig.MAP_INIT_LONGITUDE;
    this.speed = coords ? coords.speed : null;
  }
}
