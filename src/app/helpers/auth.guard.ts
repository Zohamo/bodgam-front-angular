import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AlertService, AuthService, DialogService } from '@/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Creates an instance of AuthGuard.
   *
   * @param {AuthService} authService
   * @param {AlertService} alertService
   * @param {DialogService} dialogService
   * @memberof AuthGuard
   */
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private dialogService: DialogService
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
    if (this.authService.value) {
      return true;
    }

    this.alertService.open('must-login');
    this.dialogService.open('register');

    return false;
  }
}
