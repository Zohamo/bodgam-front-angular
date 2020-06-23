import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { DialogUserLoginComponent } from '@/components/dialog-user-login/dialog-user-login.component';
import { User } from '@/models';
import { AlertService, AuthService } from '@/services';

// UI
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Creates an instance of AuthGuard.
   *
   * @param {AuthService} authService
   * @param {AlertService} alertService
   * @param {MatDialog} dialog
   * @memberof AuthGuard
   */
  constructor(private authService: AuthService, private alertService: AlertService, private dialog: MatDialog) {}

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

    if (this.authService.value) {
      return true;
    }

    this.alertService.open('must-login');
    this.dialog.open(DialogUserLoginComponent);
    return false;
  }
}
