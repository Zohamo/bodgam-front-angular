import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
   * @param {Router} router
   * @memberof AuthenticationWebService
   */
  constructor(private http: HttpClient, private router: Router) {
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
   * Get current user stream
   *
   * @readonly
   * @type {Observable<User>}
   * @memberof AuthenticationWebService
   */
  public get currentUser$(): Observable<User> {
    return this.currentUser;
  }

  /**
   * Calls the API to register a new user and receives a JWT
   *
   * @param {User} user
   * @returns {Observable<User>}
   * @memberof AuthenticationWebService
   */
  public register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiPath}/register`, user).pipe(
      map((currentUser: User) => {
        this.storeCurrentUser(currentUser);
        return currentUser;
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
    return this.http.post<User>(`${environment.apiPath}/login`, { email, password }).pipe(
      map((user: User) => {
        this.storeCurrentUser(user);
        return user;
      })
    );
  }

  /**
   * Calls the API to delete the User/Profile
   *
   * @param {number} id
   * @returns {Observable<string>}
   * @memberof AuthenticationWebService
   */
  public delete(id: number): Observable<string> {
    return this.http.delete<string>(`${environment.apiPath}/user/${id}`);
  }

  /**
   * Store user details and jwt token in local storage to keep user logged in between page refreshes
   *
   * @private
   * @param {User} user
   * @memberof AuthenticationWebService
   */
  private storeCurrentUser(user: User): void {
    console.log('currentUser', user);
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
    this.router.navigate(['/']);
  }
}
