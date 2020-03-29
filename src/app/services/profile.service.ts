import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Profile, ProfileItem, ProfilePrivacy } from '@/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private currentProfileSubject: BehaviorSubject<Profile>;
  public currentProfile: Observable<Profile>;

  /**
   * Creates an instance of ProfileService.
   *
   * @param {HttpClient} http
   * @memberof ProfileService
   */
  constructor(private http: HttpClient) {
    this.currentProfileSubject = new BehaviorSubject<Profile>(new Profile());
    this.currentProfile = this.currentProfileSubject.asObservable();
  }

  /**
   * Get current Profile observable
   *
   * @readonly
   * @type {Observable<Profile>}
   * @memberof ProfileService
   */
  public get currentProfile$(): Observable<Profile> {
    return this.currentProfile;
  }

  /**
   * Get current Profile value
   *
   * @readonly
   * @type {Profile}
   * @memberof ProfileService
   */
  public get value(): Profile {
    return this.currentProfileSubject.value;
  }

  /**
   * Update the Profile observable value from the API result.
   *
   * @private
   * @param {Profile} value
   * @returns {Profile}
   * @memberof ProfileService
   */
  private updateValue(value: Profile): Profile {
    this.currentProfileSubject.next(value);
    return value;
  }

  /**
   * Call the API to get the Profile list
   *
   * @returns {Observable<ProfileItem[]>}
   * @memberof ProfileService
   */
  public getProfiles(): Observable<ProfileItem[]> {
    return this.http.get<ProfileItem[]>(`${environment.apiPath}/profiles`);
  }

  /**
   * Call the API to get one Profile
   *
   * @param {number} id
   * @returns {Observable<Profile>}
   * @memberof ProfileService
   */
  public getProfile(id: number): Observable<Profile> {
    return this.value && this.value.id === id
      ? this.currentProfile
      : this.http
          .get<Profile>(`${environment.apiPath}/profiles/${id}`)
          .pipe(map((profileRes) => this.updateValue(profileRes)));
  }

  /**
   * Call the API to save a Profile
   *
   * @param {Profile} profile
   * @returns {Observable<Profile>}
   * @memberof ProfileService
   */
  public saveProfile(profile: Profile): Observable<Profile> {
    return (profile.id
      ? this.http.put<Profile>(`${environment.apiPath}/profiles/${profile.id}`, profile)
      : this.http.post<Profile>(`${environment.apiPath}/profiles`, profile)
    ).pipe(map((profileRes) => this.updateValue(profileRes)));
  }

  /**
   * Call the API to save a profile's privacy
   *
   * @param {number} profileId
   * @param {ProfilePrivacy} privacy
   * @returns {Observable<ProfilePrivacy>}
   * @memberof ProfileService
   */
  public saveProfilePrivacy(profileId: number, privacy: ProfilePrivacy): Observable<ProfilePrivacy> {
    return this.http.put<ProfilePrivacy>(`${environment.apiPath}/profile/${profileId}/privacy`, privacy).pipe(
      map((privacyRes) => {
        this.currentProfileSubject.next(Object.assign(this.value, { privacy: privacyRes }));
        return privacyRes;
      })
    );
  }

  /**
   * Call the BackEnd to delete a profile
   *
   * @param {number} id
   * @returns {Observable<Profile>}
   * @memberof ProfileService
   */
  public deleteProfile(id: number): Observable<Profile> {
    return this.http.delete<Profile>(`${environment.apiPath}/profiles/${id}`);
  }
}
