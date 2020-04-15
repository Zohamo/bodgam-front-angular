import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { AppConfig } from '@/config';
import { GeoCoordinates, NavigatorGeolocationPosition } from '@/models';
import { GeolocationService } from '@/services';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  public isGeolocated = false;

  // Leaflet
  private map: any;
  public circle: any;
  public marker: any;

  // UI
  public circleColor = AppConfig.MAP_CIRCLE_COLOR;
  public circleOpacity = AppConfig.MAP_CIRCLE_OPACITY;

  /**
   * Inputs
   */

  @Input() isEditable = false;

  private coords: GeoCoordinates = new GeoCoordinates();
  @Input() set coordinates(coordinates: GeoCoordinates) {
    if (coordinates) {
      this.coords = coordinates;
      if (this.map) {
        this.resetViewMap();
        this.draw();
      }
    }
  }

  @Input() set autoGeolocate(autoGeolocate: boolean) {
    if (autoGeolocate) {
      this.geolocationService.getPosition().then((position: NavigatorGeolocationPosition) => {
        if (position && position.coords) {
          this.isGeolocated = true;
          this.coords = new GeoCoordinates(position.coords);
          this.sendPositionCoords.emit(this.coords);
          this.map ? this.resetViewMap() : this.createMap();
        }
      });
    }
  }

  private displayMarker = false;
  @Input() set dMarker(dMarker: boolean) {
    if (dMarker !== null) {
      this.displayMarker = dMarker;
      if (this.circle) {
        this.map.removeLayer(this.circle);
        this.circle = null;
      }
      if (this.marker) {
        this.map.removeLayer(this.marker);
        this.marker = null;
      }
      this.draw();
    }
  }

  @Input() set circleRadius(circleRadius: number) {
    if (circleRadius) {
      this.coords.accuracy = circleRadius;
      this.drawCircle(this.coords.latitude, this.coords.longitude, this.coords.accuracy);
    }
  }

  @Input() set centerMap(centerMap: boolean) {
    if (this.map) {
      this.resetViewMap();
    }
  }

  /**
   * Outputs
   */

  @Output() sendPositionCoords = new EventEmitter<GeoCoordinates>();

  /**
   * Creates an instance of MapComponent.
   *
   * @param {GeolocationService} geolocationService
   * @memberof MapComponent
   */
  constructor(private geolocationService: GeolocationService) {}

  /**
   * Called after Angular has fully initialized a component's view.
   *
   * @memberof MapComponent
   */
  ngAfterViewInit(): void {
    this.createMap();
    this.draw();
  }

  /**
   * Create the Leaflet map
   *
   * @private
   * @memberof MapComponent
   */
  private createMap(): void {
    if (!this.map && this.coords && this.coords.latitude && this.coords.longitude) {
      console.log('createMap coords', this.coords);
      // Map creation
      this.map = L.map('map', {
        center: [this.coords.latitude, this.coords.longitude],
        zoom: this.setZoom(this.coords.accuracy)
      });

      // Tiles
      L.tileLayer(AppConfig.MAP_TILES_URL, { attribution: AppConfig.MAP_TILES_ATTRIBUTION }).addTo(this.map);

      if (this.isEditable) {
        // OnClick
        this.map.on('click', (event: { latlng: { lat: number; lng: number } }) => {
          this.onClickMap(event.latlng.lat, event.latlng.lng);
        });
      }
    }
  }

  /**
   * Click on map event
   *
   * @private
   * @param {number} latitude
   * @param {number} longitude
   * @memberof MapComponent
   */
  private onClickMap(latitude: number, longitude: number): void {
    this.coords.latitude = latitude;
    this.coords.longitude = longitude;
    console.log('onclick coords', this.coords);
    this.draw();
    this.resetViewMap();
    this.sendPositionCoords.emit(this.coords);
  }

  /**
   * Reset the map's view
   *
   * @private
   * @memberof MapComponent
   */
  private resetViewMap(): void {
    console.log('resetViewMap', this.coords);
    this.map.setView([this.coords.latitude, this.coords.longitude], this.setZoom(this.coords.accuracy));
  }

  /**
   * Draw a circle or set a marker on the map
   *
   * @private
   * @memberof MapComponent
   */
  private draw(): void {
    this.displayMarker
      ? this.setMarker(this.coords.latitude, this.coords.longitude)
      : this.drawCircle(this.coords.latitude, this.coords.longitude, this.coords.accuracy);
  }

  /**
   * Draw a circle on the map
   *
   * @private
   * @param {number} lat
   * @param {number} lng
   * @param {number} rad
   * @memberof MapComponent
   */
  private drawCircle(lat: number, lng: number, rad: number): void {
    if (this.map) {
      if (!this.circle) {
        this.circle = L.circle([lat, lng], {
          color: this.circleColor,
          fillColor: this.circleColor,
          fillOpacity: this.circleOpacity,
          radius: rad
        }).addTo(this.map);
      } else {
        this.circle.setLatLng({ lat, lng });
        this.circle.setRadius(rad);
      }
    }
  }

  /**
   * Pin a marker on the map
   *
   * @private
   * @param {number} lat
   * @param {number} lng
   * @memberof MapComponent
   */
  private setMarker(lat: number, lng: number): void {
    if (this.map) {
      this.marker ? this.marker.setLatLng({ lat, lng }) : (this.marker = L.marker([lat, lng]).addTo(this.map));
    }
  }

  /**
   * Adapat the map's zoom depending on the accuracy
   *
   * @private
   * @param {number} accuracy
   * @returns {number}
   * @memberof MapComponent
   */
  private setZoom(accuracy: number): number {
    if (accuracy < 500) {
      return 16;
    } else if (accuracy < 1000) {
      return 15;
    } else if (accuracy < 2000) {
      return 14;
    } else {
      return 10;
    }
  }
}
