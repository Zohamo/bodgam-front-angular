import { NavigatorGeolocationPositionCoords } from './navigator/navigator-geolocation-position-coords.model';
import { AppConfig } from 'src/app/config/app.config';

export class GeoCoordinates {
  public accuracy: number;
  public latitude: number;
  public longitude: number;

  constructor(coords?: NavigatorGeolocationPositionCoords) {
    this.accuracy = coords && coords.accuracy ? coords.accuracy : AppConfig.MAP_INIT_ACCURACY;
    this.latitude = coords && coords.latitude ? coords.latitude : AppConfig.MAP_INIT_LATITUDE;
    this.longitude = coords && coords.longitude ? coords.longitude : AppConfig.MAP_INIT_LONGITUDE;
  }
}
