import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppApi } from '@/config';
import { BggGame } from '@/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardGameGeekService {
  private api = `${AppApi.BOARDGAMEGEEK}`;

  constructor(private http: HttpClient) {}

  /**
   * Get a game's collection from BGG
   *
   * @param {string} userName
   * @returns {Observable<BggGame[]>}
   * @memberof BoardGameGeekService
   */
  public getCollection(userName: string): Observable<BggGame[]> {
    return this.http.get<BggGame[]>(`${this.api}/collection/${userName}`).pipe(
      map((collection: BggGame[]) => {
        return collection.filter((game: BggGame) => game.owned);
      })
    );
  }

  /**
   * Get a thing (game,..) from BGG
   *
   * @param {number} thingId
   * @returns {Observable<BggGame>}
   * @memberof BoardGameGeekService
   */
  public getThing(thingId: number): Observable<BggGame> {
    return this.http.get<BggGame>(`${this.api}/thing/${thingId}`);
  }
}
