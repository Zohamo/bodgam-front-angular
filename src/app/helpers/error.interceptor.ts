import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '@/services';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * Creates an instance of ErrorInterceptor.
   *
   * @param {Router} router
   * @memberof ErrorInterceptor
   */
  constructor(private router: Router) {}

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
        /* if (err.status === 404) {
          this.router.navigate([err.status]);
        } */

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
