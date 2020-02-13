import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';

// Models
import { UserFullRepresentation } from '../models/user-full-representation.model';
import { UserRepresentation } from '../models/user-representation.model';

@Injectable({
  providedIn: 'root'
})
export class UsersWebService {
  /**
   * Creates an instance of UsersWebService.
   *
   * @param {HttpClient} http
   * @memberof UsersWebService
   */
  constructor(private http: HttpClient) {}

  /**
   * Call the BackEnd to retrieve the users list
   *
   * @returns {Observable<UserRepresentation[]>}
   * @memberof UsersWebService
   */
  public getUsers(): Observable<UserRepresentation[]> {
    return this.http.get<UserRepresentation[]>(`${environment.apiPath}/users`);
  }

  /**
   * Call the BackEnd to retrieve a specific user's data
   *
   * @param {number} id
   * @returns {Observable<UserFullRepresentation>}
   * @memberof UsersWebService
   */
  public getUser(id: number): Observable<UserFullRepresentation> {
    return this.http.get<UserFullRepresentation>(`${environment.apiPath}/users/${id}`);
  }

  /**
   * Call the BackEnd to save the user's data
   *
   * @param {UserFullRepresentation} user
   * @returns {Observable<UserFullRepresentation>}
   * @memberof UsersWebService
   */
  public saveUser(user: UserFullRepresentation): Observable<UserFullRepresentation> {
    return user.id
      ? this.http.put<UserFullRepresentation>(`${environment.apiPath}/users/${user.id}`, user)
      : this.http.post<UserFullRepresentation>(`${environment.apiPath}/users`, user);
  }

  /**
   * Call the BackEnd to delete a user
   *
   * @param {number} id
   * @returns {Observable<UserFullRepresentation>}
   * @memberof UsersWebService
   */
  public deleteUser(id: number): Observable<UserFullRepresentation> {
    return this.http.delete<UserFullRepresentation>(`${environment.apiPath}/users/${id}`);
  }
}
