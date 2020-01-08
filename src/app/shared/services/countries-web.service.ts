import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesWebService {
  private lang = 'fr';

  // https://restcountries.eu/
  private bggApiPath = 'https://restcountries.eu/rest/v2';
  private api = `${this.bggApiPath}`;

  constructor(private http: HttpClient) {}

  public getCountries(): Observable<Country[]> {
    return this.http.get<object[]>(`${this.api}/all?fields=alpha2Code;translations`).pipe(
      map((countries) => {
        return countries.map((country: any) => new Country(country.alpha2Code, country.translations[this.lang]));
      })
    );
  }
}
