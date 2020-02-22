import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationWebService } from '@core/services/authentication-web.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * Creates an instance of ErrorInterceptor.
   *
   * @param {AuthenticationWebService} authenticationWebService
   * @memberof ErrorInterceptor
   */
  constructor(private authenticationWebService: AuthenticationWebService) {}

  /**
   * Intercept API errors
   *
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof ErrorInterceptor
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationWebService.logout();
          location.reload(); // deprecated : location.reload(true);
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
