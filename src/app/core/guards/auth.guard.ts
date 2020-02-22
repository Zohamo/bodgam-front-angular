import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthenticationWebService } from '@core/services/authentication-web.service';
import { MatDialog } from '@angular/material';
import { LoginFormDialogComponent } from '@core/components/auth/login-form-dialog/login-form-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authenticationWebService: AuthenticationWebService, private dialog: MatDialog) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationWebService.currentUserValue;
    if (currentUser) {
      // authorised so return true
      return true;
    }

    // not logged in so open the login dialog
    this.dialog.open(LoginFormDialogComponent);
    return false;
  }
}
