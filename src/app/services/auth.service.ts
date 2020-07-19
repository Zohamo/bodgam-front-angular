import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@env';
import { User, Email } from '@/models';
import { AlertService } from './alert.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Manage the authentication with JWT.
 *
 * @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  /**
   * Creates an instance of AuthService.
   *
   * @param {AlertService} alertService
   * @param {HttpClient} http
   * @param {Router} router
   * @memberof AuthService
   */
  constructor(private alertService: AlertService, private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /***************************************************************************
   *
   * CURRENT USER
   *
   ***************************************************************************/

  /**
   * Get current user observable
   *
   * @readonly
   * @type {Observable<User>}
   * @memberof AuthService
   */
  public get currentUser$(): Observable<User> {
    return this.currentUser;
  }

  /**
   * Get current User value
   *
   * @readonly
   * @type {User}
   * @memberof AuthService
   */
  public get value(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Store user details and JWT in local storage to keep User logged when page refreshes
   *
   * @private
   * @param {User} user
   * @memberof AuthService
   */
  private storeCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /***************************************************************************
   *
   * REGISTER & LOGIN/OUT
   *
   ***************************************************************************/

  /**
   * Call the API to register a new user and receive a JWT
   *
   * @param {User} user
   * @returns {Observable<User>}
   * @memberof AuthService
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
   * Call the API to authenticate a user and receives a JWT.
   *
   * @param {string} email
   * @param {string} password
   * @returns {Observable<User>}
   * @memberof AuthService
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
   * @memberof AuthService
   */
  public logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.alertService.open('success-logout');
    this.router.navigate(['/']);
  }

  /***************************************************************************
   *
   * EMAIL VERIFICATION
   *
   ***************************************************************************/

  /**
   * Call the API to check if User's email has been verified.
   *
   * @param {number} [userId=this.value.id]
   * @returns {Observable<boolean>}
   * @memberof AuthService
   */
  public isUserEmailVerified(userId: number = this.value.id): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiPath}/user/${userId}/email/verified`);
  }

  /**
   * Call the API to resend the verification email.
   *
   * @param {Email} email
   * @returns {Observable<boolean>}
   * @memberof AuthService
   */
  public resendVerificationEmail(email: Email): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiPath}/email/resend`, email);
  }

  /***************************************************************************
   *
   * PASSWORD RESET
   *
   ***************************************************************************/

  /**
   * Call the API to reset the password.
   *
   * @param {{ email: string }} email
   * @returns {Observable<boolean>}
   * @memberof AuthService
   */
  public resetPassword(email: { email: string }): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiPath}/password/reset`, email);
  }

  /**
   * Call the API to change the User's password after reset
   *
   * @param {User} userData
   * @returns {Observable<User>}
   * @memberof AuthService
   */
  public changePassword(userData: User): Observable<User> {
    return this.http.put<User>(`${environment.apiPath}/password/change`, userData).pipe(
      map((user: User) => {
        this.storeCurrentUser(user);
        return user;
      })
    );
  }
}
