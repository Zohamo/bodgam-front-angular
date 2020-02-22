import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationWebService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  /**
   * Creates an instance of AuthenticationWebService.
   *
   * @param {HttpClient} http
   * @memberof AuthenticationWebService
   */
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Get current user value
   *
   * @readonly
   * @type {User}
   * @memberof AuthenticationWebService
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Calls the API to register a new user and receives a JWT
   *
   * @param {string} email
   * @param {string} password
   * @returns {Observable<User>}
   * @memberof AuthenticationWebService
   */
  public register(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiPath}/users/register`, { email, password }).pipe(
      map((user: User) => {
        this.storeCurrentUser(user);
        return user;
      })
    );
  }

  /**
   * Calls the API to authenticate a user and receives a JWT
   *
   * @param {string} email
   * @param {string} password
   * @returns {Observable<User>}
   * @memberof AuthenticationWebService
   */
  public login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiPath}/users/authenticate`, { email, password }).pipe(
      map((user: User) => {
        this.storeCurrentUser(user);
        return user;
      })
    );
  }

  /**
   * Store user details and jwt token in local storage to keep user logged in between page refreshes
   *
   * @private
   * @param {User} user
   * @memberof AuthenticationWebService
   */
  private storeCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /**
   * Logout the user
   *
   * @memberof AuthenticationWebService
   */
  public logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
