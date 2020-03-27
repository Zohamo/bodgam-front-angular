import { GeocodeResultProvidedLocation } from './geocode-result-provided-location.model';
import { GeocodeResultLocation } from './geocode-result-location.model';

export class GeocodeResult {
  providedLocation: GeocodeResultProvidedLocation;
  locations: GeocodeResultLocation[];
}
