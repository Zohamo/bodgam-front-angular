import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

// Models
import { NavigatorGeolocationPosition } from '../../models/navigator/navigator-geolocation-position.model';

// Services
import { GeolocationService } from '../../services/geolocation.service';
import { AppConfig } from 'src/app/config/app.config';

@Component({
  selector: 'app-ui-map',
  templateUrl: './ui-map.component.html',
  styleUrls: ['./ui-map.component.scss']
})
export class UiMapComponent implements AfterViewInit {
  public isGeolocated = false;
  // Leaflet
  private map: any;
  public circle: any;
  public marker: any;
  // Position
  private position: NavigatorGeolocationPosition;
  public latitude: number;
  public longitude: number;
  public accuracy: number;
  // UI
  public circleColor = AppConfig.MAP_CIRCLE_COLOR;
  public circleOpacity = AppConfig.MAP_CIRCLE_OPACITY;

  /**
   * Creates an instance of UiMapComponent.
   *
   * @param {GeolocationService} geolocationService
   * @memberof UiMapComponent
   */
  constructor(private geolocationService: GeolocationService) {
    this.setPosition();
  }

  /**
   * Called after Angular has fully initialized a component's view.
   *
   * @memberof UiMapComponent
   */
  ngAfterViewInit(): void {
    this.createMap();

    this.geolocationService.getPosition().then((position: NavigatorGeolocationPosition) => {
      this.isGeolocated = true;
      this.setPosition(position);
      if (this.map) {
        this.map.setView([this.latitude, this.longitude], this.setZoom(this.accuracy));
      }
    });
  }

  /**
   * Populate this component position's values
   *
   * @private
   * @param {NavigatorGeolocationPosition} [position]
   * @memberof UiMapComponent
   */
  private setPosition(position?: NavigatorGeolocationPosition): void {
    this.position = position || new NavigatorGeolocationPosition();
    this.latitude = position && position.coords ? position.coords.latitude : this.position.coords.latitude;
    this.longitude = position && position.coords ? position.coords.longitude : this.position.coords.longitude;
    this.accuracy = position && position.coords ? position.coords.accuracy : this.position.coords.accuracy;
  }

  /**
   * Create the Leaflet map
   *
   * @private
   * @memberof UiMapComponent
   */
  private createMap(): void {
    if (!this.map) {
      this.map = L.map('map', {
        center: [this.latitude, this.longitude],
        zoom: this.setZoom(this.accuracy)
      });
      L.tileLayer(AppConfig.MAP_TILES_URL, { attribution: AppConfig.MAP_TILES_ATTRIBUTION }).addTo(this.map);
      this.map.on('click', (event: { latlng: { lat: number; lng: number } }) => {
        this.latitude = event.latlng.lat;
        this.longitude = event.latlng.lng;
        this.setMarker(this.latitude, this.longitude);
        this.map.setView([this.latitude, this.longitude]);
      });
    }
  }

  /**
   * Draw a circle on the map
   *
   * @private
   * @param {number} lat
   * @param {number} long
   * @param {number} rad
   * @memberof UiMapComponent
   */
  private drawCircle(lat: number, long: number, rad: number): void {
    if (this.map) {
      if (this.circle) {
        this.map.removeLayer(this.circle);
      }
      this.circle = L.circle([lat, long], {
        color: this.circleColor,
        fillColor: this.circleColor,
        fillOpacity: this.circleOpacity,
        radius: rad
      }).addTo(this.map);
    }
  }

  /**
   * Pin a marker on the map
   *
   * @private
   * @param {number} lat
   * @param {number} long
   * @memberof UiMapComponent
   */
  private setMarker(lat: number, long: number): void {
    if (this.map) {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker([lat, long]).addTo(this.map);
    }
  }

  /**
   * Adapat the map's zoom depending on the accuracy
   *
   * @private
   * @param {number} accuracy
   * @returns {number}
   * @memberof UiMapComponent
   */
  private setZoom(accuracy: number): number {
    if (accuracy < 500) {
      return 15;
    } else if (accuracy < 1000) {
      return 14;
    } else if (accuracy < 2000) {
      return 13;
    } else {
      return 10;
    }
  }
}
