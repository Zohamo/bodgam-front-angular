import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationWebService } from '@core/services/authentication-web.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   * Creates an instance of JwtInterceptor.
   *
   * @param {AuthenticationWebService} authenticationWebService
   * @memberof JwtInterceptor
   */
  constructor(private authenticationWebService: AuthenticationWebService) {}

  /**
   * Add JWT to each http request
   *
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof JwtInterceptor
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authenticationWebService.currentUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}
