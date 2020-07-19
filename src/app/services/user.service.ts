import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { AuthService } from './auth.service';

/**
 * Contain the User's details retrieved from the API.
 *
 * @export
 * @class UserService
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  /**
   * Creates an instance of UserService.
   *
   * @param {AuthService} authService
   * @param {HttpClient} http
   * @memberof UserService
   */
  constructor(private authService: AuthService, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    this.authService.currentUser$.subscribe((userAuth: User) => {
      if (userAuth) {
        this.getUser().subscribe((user: User) => {
          this.currentUserSubject.next(user);
        });
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  /***************************************************************************
   *
   * GETTERS
   *
   ***************************************************************************/

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
   * Get current User value
   *
   * @readonly
   * @type {boolean}
   * @memberof UserService
   */
  public get isAdmin(): boolean {
    return this.value && this.value.role && (this.value.role === 'ADMIN' || this.value.role === 'SUPER_ADMIN');
  }

  /***************************************************************************
   *
   * USER CRUD
   *
   ***************************************************************************/

  /**
   * Call the API to get the User's data
   *
   * @returns {Observable<User>}
   * @memberof UserService
   */
  public getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiPath}/user`);
  }

  /**
   * Call the API to delete the User & Profile
   *
   * @param {number} id
   * @returns {Observable<string>}
   * @memberof UserService
   */
  public deleteUser(id: number): Observable<string> {
    return this.http.delete<string>(`${environment.apiPath}/user/${id}`);
  }
}
