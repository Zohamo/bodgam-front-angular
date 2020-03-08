import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthenticationWebService } from '@core/services/authentication-web.service';
import { MatDialog } from '@angular/material';
import { LoginFormDialogComponent } from '@core/components/auth/login-form-dialog/login-form-dialog.component';
import { AlertService } from '@core/services/alert.service';
import { User } from '@core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Creates an instance of AuthGuard.
   *
   * @param {AuthenticationWebService} authenticationWebService
   * @param {AlertService} alertService
   * @param {MatDialog} dialog
   * @memberof AuthGuard
   */
  constructor(
    private authenticationWebService: AuthenticationWebService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) {}

  /**
   * Can Activate if the user is authenticated
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof AuthGuard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard route', route);

    const currentUser: User = this.authenticationWebService.currentUserValue;
    if (currentUser) {
      // authorised so return true
      return true;
    }

    // not logged in so open the login dialog
    this.alertService.open('must-login');
    this.dialog.open(LoginFormDialogComponent);
    return false;
  }
}
