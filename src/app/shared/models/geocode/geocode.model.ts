import { GeocodeInfo } from './geocode-info.model';
import { GeocodeOptions } from './geocode-options.model';
import { GeocodeResult } from './geocode-result.model';

export class Geocode {
  info: GeocodeInfo;
  options: GeocodeOptions;
  results: GeocodeResult[];
}
