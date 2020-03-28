import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BggGameRepresentation } from '@/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardGameGeekService {
  // http://bgg-json.azurewebsites.net/
  private bggApiPath = 'http://bgg-json.azurewebsites.net';
  private api = `${this.bggApiPath}`;

  constructor(private http: HttpClient) {}

  /**
   * Get a game's collection from BGG
   *
   * @param {string} userName
   * @returns {Observable<BggGameRepresentation[]>}
   * @memberof BoardGameGeekService
   */
  public getCollection(userName: string): Observable<BggGameRepresentation[]> {
    return this.http.get<BggGameRepresentation[]>(`${this.api}/collection/${userName}`).pipe(
      map((collection: BggGameRepresentation[]) => {
        return collection.filter((game: BggGameRepresentation) => game.owned);
      })
    );
  }

  /**
   * Get a thing (game,..) from BGG
   *
   * @param {number} thingId
   * @returns {Observable<BggGameRepresentation>}
   * @memberof BoardGameGeekService
   */
  public getThing(thingId: number): Observable<BggGameRepresentation> {
    return this.http.get<BggGameRepresentation>(`${this.api}/thing/${thingId}`);
  }
}