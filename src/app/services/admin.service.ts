import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  /**
   * Creates an instance of AdminService.
   *
   * @param {HttpClient} http
   * @memberof AdminService
   */
  constructor(private http: HttpClient) {}

  /**
   * Call the API to receive a ping.
   *
   * @returns {Observable<boolean>}
   * @memberof AdminService
   */
  public ping(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiPath}/admin/ping`);
  }

  /**
   * Call the API to push a notification.
   *
   * @returns {Observable<boolean>}
   * @memberof AdminService
   */
  public push(data: any): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiPath}/admin/push`, data);
  }
}
