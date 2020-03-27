import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '@/models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// Stubs
import countriesStub from 'src/assets/data/stubs/stub-countries.json';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private lang = 'fr';

  // https://restcountries.eu/
  private bggApiPath = 'https://restcountries.eu/rest/v2';
  private api = `${this.bggApiPath}`;

  constructor(private http: HttpClient) {}

  public getCountries(): Observable<Country[]> {
    return of(countriesStub).pipe(
      map((countries) => {
        return countries.map((country: any) => new Country(country.alpha2Code, country.translations[this.lang]));
      })
    );
    return this.http.get<object[]>(`${this.api}/all?fields=alpha2Code;translations`).pipe(
      map((countries) => {
        return countries.map((country: any) => new Country(country.alpha2Code, country.translations[this.lang]));
      })
    );
  }
}
