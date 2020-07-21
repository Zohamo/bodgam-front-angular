import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { UserRegisterDialogComponent } from '@/auth/components';
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
   * @param {AlertService} alertService
   * @param {AuthService} authService
   * @param {MatDialog} dialog
   * @memberof AuthGuard
   */
  constructor(private alertService: AlertService, private authService: AuthService, private dialog: MatDialog) {}

  /**
   * Can Activate if the user is authenticated
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof AuthGuard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.value) {
      if (this.authService.value.emailVerified) {
        return true;
      }
      this.alertService.open('must-verify-email');
    } else {
      this.alertService.open('must-login');
      // WARNING in Circular dependency :
      // this.dialog.open(UserRegisterDialogComponent);
    }
    return false;
  }
}
