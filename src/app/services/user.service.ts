import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '@/models';
import { environment } from '@env';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Get current user observable
   *
   * @readonly
   * @type {Observable<User>}
   * @memberof UserService
   */
  public get currentUser$(): Observable<User> {
    return this.currentUser;
  }

  /**
   * Get current User value
   *
   * @readonly
   * @type {User}
   * @memberof UserService
   */
  public get value(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Get current user id
   *
   * @readonly
   * @type {number}
   * @memberof UserService
   */
  public get id(): number {
    return this.currentUserSubject.value ? this.currentUserSubject.value.id : null;
  }

  /**
   * Store user details and jwt token in local storage to keep user logged in between page refreshes
   *
   * @private
   * @param {User} user
   * @memberof UserService
   */
  private storeCurrentUser(user: User): void {
    console.log('currentUser', user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /**
   * Calls the API to register a new user and receives a JWT
   *
   * @param {User} user
   * @returns {Observable<User>}
   * @memberof UserService
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
   * @memberof UserService
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
   * Logout the user
   *
   * @memberof UserService
   */
  public logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  /**
   * Calls the API to delete the User/Profile
   *
   * @param {number} id
   * @returns {Observable<string>}
   * @memberof UserService
   */
  public deleteUser(id: number): Observable<string> {
    return this.http.delete<string>(`${environment.apiPath}/user/${id}`);
  }
}
