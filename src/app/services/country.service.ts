import { Injectable } from '@angular/core';
import { Country } from '@/models';
import countryList from 'src/assets/data/fr/country-list.json';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  /**
   * Get the Country list.
   *
   * @returns {Country[]}
   * @memberof CountryService
   */
  public getCountries(): Country[] {
    return countryList;
  }

  /**
   * Return a Country from its isoCode.
   *
   * @param {string} isoCode
   * @returns {Country}
   * @memberof CountryService
   */
  public getCountry(isoCode: string): Country {
    return countryList.find((country) => country.isoCode === isoCode);
  }
}
