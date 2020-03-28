import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { ProfileFullRepresentation, ProfileRepresentation, ProfilePrivacyRepresentation } from '@/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private currentProfileSubject: BehaviorSubject<ProfileFullRepresentation>;
  public currentProfile: Observable<ProfileFullRepresentation>;

  /**
   * Creates an instance of ProfileService.
   *
   * @param {HttpClient} http
   * @memberof ProfileService
   */
  constructor(private http: HttpClient) {
    this.currentProfileSubject = new BehaviorSubject<ProfileFullRepresentation>(null);
    this.currentProfile = this.currentProfileSubject.asObservable();
  }

  /**
   * Get current Profile value
   *
   * @readonly
   * @type {ProfileFullRepresentation}
   * @memberof LocationService
   */
  public get value(): ProfileFullRepresentation {
    return this.currentProfileSubject.value;
  }

  /**
   * Call the BackEnd to retrieve the profiles list
   *
   * @returns {Observable<ProfileRepresentation[]>}
   * @memberof ProfileService
   */
  public getProfiles(): Observable<ProfileRepresentation[]> {
    return this.http.get<ProfileRepresentation[]>(`${environment.apiPath}/profiles`);
  }

  /**
   * Call the BackEnd to retrieve a specific profile's data
   *
   * @param {number} id
   * @returns {Observable<ProfileFullRepresentation>}
   * @memberof ProfileService
   */
  public getProfile(id: number): Observable<ProfileFullRepresentation> {
    console.log('value', this.value, id);
    return this.value && this.value.id === id
      ? this.currentProfile
      : this.http.get<ProfileFullRepresentation>(`${environment.apiPath}/profiles/${id}`).pipe(
          map((profileRes) => {
            this.currentProfileSubject.next(profileRes);
            return profileRes;
          })
        );
  }

  /**
   * Call the BackEnd to save the profile's data
   *
   * @param {ProfileFullRepresentation} profile
   * @returns {Observable<ProfileFullRepresentation>}
   * @memberof ProfileService
   */
  public saveProfile(profile: ProfileFullRepresentation): Observable<ProfileFullRepresentation> {
    return profile.id
      ? this.http.put<ProfileFullRepresentation>(`${environment.apiPath}/profiles/${profile.id}`, profile)
      : this.http.post<ProfileFullRepresentation>(`${environment.apiPath}/profiles`, profile);
  }

  /**
   * Call the BackEnd to save the profile's privacy
   *
   * @param {number} profileId
   * @param {ProfilePrivacyRepresentation} privacy
   * @returns {Observable<ProfilePrivacyRepresentation>}
   * @memberof ProfileService
   */
  public saveProfilePrivacy(
    profileId: number,
    privacy: ProfilePrivacyRepresentation
  ): Observable<ProfilePrivacyRepresentation> {
    return this.http.put<ProfilePrivacyRepresentation>(`${environment.apiPath}/profiles/${profileId}/privacy`, privacy);
  }

  /**
   * Call the BackEnd to delete a profile
   *
   * @param {number} id
   * @returns {Observable<ProfileFullRepresentation>}
   * @memberof ProfileService
   */
  public deleteProfile(id: number): Observable<ProfileFullRepresentation> {
    return this.http.delete<ProfileFullRepresentation>(`${environment.apiPath}/profiles/${id}`);
  }
}
