import { NavigatorGeolocationPositionCoords } from './navigator-geolocation-position-coords.model';

export class NavigatorGeolocationPosition {
  coords: NavigatorGeolocationPositionCoords;
  timestamp: number;

  constructor(position?: NavigatorGeolocationPosition) {
    this.coords =
      position && position.coords
        ? new NavigatorGeolocationPositionCoords(position.coords)
        : new NavigatorGeolocationPositionCoords();
    this.timestamp = position ? position.timestamp : null;
  }
}
