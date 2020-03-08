import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';

// Models
import { ProfileFullRepresentation } from '../models/profile-full-representation.model';
import { ProfileRepresentation } from '../models/profile-representation.model';
import { ProfilePrivacyRepresentation } from '../models/profile-privacy-representation.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilesWebService {
  /**
   * Creates an instance of ProfilesWebService.
   *
   * @param {HttpClient} http
   * @memberof ProfilesWebService
   */
  constructor(private http: HttpClient) {}

  /**
   * Call the BackEnd to retrieve the profiles list
   *
   * @returns {Observable<ProfileRepresentation[]>}
   * @memberof ProfilesWebService
   */
  public getProfiles(): Observable<ProfileRepresentation[]> {
    return this.http.get<ProfileRepresentation[]>(`${environment.apiPath}/profiles`);
  }

  /**
   * Call the BackEnd to retrieve a specific profile's data
   *
   * @param {number} id
   * @returns {Observable<ProfileFullRepresentation>}
   * @memberof ProfilesWebService
   */
  public getProfile(id: number): Observable<ProfileFullRepresentation> {
    return this.http.get<ProfileFullRepresentation>(`${environment.apiPath}/profiles/${id}`);
  }

  /**
   * Call the BackEnd to save the profile's data
   *
   * @param {ProfileFullRepresentation} profile
   * @returns {Observable<ProfileFullRepresentation>}
   * @memberof ProfilesWebService
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
   * @memberof ProfilesWebService
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
   * @memberof ProfilesWebService
   */
  public deleteProfile(id: number): Observable<ProfileFullRepresentation> {
    return this.http.delete<ProfileFullRepresentation>(`${environment.apiPath}/profiles/${id}`);
  }
}
