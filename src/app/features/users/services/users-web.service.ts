import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// Models
import { UserFullRepresentation } from '../models/user-full-representation.model';
import { UserRepresentation } from '../models/user-representation.model';

// Stubs
import userStub from 'src/assets/data/stubs/stub-user.json';
import usersStub from 'src/assets/data/stubs/stub-users.json';

@Injectable({
  providedIn: 'root'
})
export class UsersWebService {
  private api = `${environment.apiPath}/users`;

  /**
   * Creates an instance of UsersWebService.
   *
   * @param {HttpClient} http
   * @memberof UsersWebService
   */
  constructor(private http: HttpClient) {}

  /**
   * Call the BackEnd to retrieve the users's list
   *
   * @returns {Observable<UserRepresentation[]>}
   * @memberof UsersWebService
   */
  public getUsers(): Observable<UserRepresentation[]> {
    // return this.http.get<UserRepresentation[]>(`${this.api}`);
    return of(usersStub).pipe(
      map((users: UserRepresentation[]) => {
        return users.filter((user: UserRepresentation) => user.isActive);
      })
    );
  }

  /**
   * Call the BackEnd to retrieve a specific user's data
   *
   * @param {number} id
   * @returns {Observable<UserFullRepresentation>}
   * @memberof UsersWebService
   */
  public getUser(id: number): Observable<UserFullRepresentation> {
    // return this.http.get<UserFullRepresentation[]>(`${this.api}/${id}`);
    return of(userStub);
  }

  /**
   * Call the BackEnd to create a new user
   *
   * @param {UserFullRepresentation} user
   * @returns {Observable<UserFullRepresentation>}
   * @memberof UsersWebService
   */
  public createUser(user: UserFullRepresentation): Observable<UserFullRepresentation> {
    return this.http.post<UserFullRepresentation>(`${this.api}/${user.id}`, user);
  }

  /**
   * Call the BackEnd to edit a user's data
   *
   * @param {UserFullRepresentation} user
   * @returns {Observable<UserFullRepresentation>}
   * @memberof UsersWebService
   */
  public updateUser(user: UserFullRepresentation): Observable<UserFullRepresentation> {
    return this.http.patch<UserFullRepresentation>(`${this.api}/${user.id}`, user);
  }

  /**
   * Call the BackEnd to edit a user's privacy data
   *
   * @param {UserFullRepresentation} user
   * @returns {Observable<UserFullRepresentation>}
   * @memberof UsersWebService
   */
  public updateUserPrivacy(user: UserFullRepresentation): Observable<UserFullRepresentation> {
    return this.http.put<UserFullRepresentation>(`${this.api}/${user.id}/privacy`, user.privacy);
  }
}
