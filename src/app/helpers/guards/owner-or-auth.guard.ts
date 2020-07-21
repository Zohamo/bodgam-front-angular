import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AlertService, AuthService } from '@/services';

@Injectable({
  providedIn: 'root'
})
export class OwnerOrAuthGuard implements CanActivate {
  /**
   * Creates an instance of OwnerOrAuthGuard.
   *
   * @param {Router} router
   * @param {AlertService} alertService
   * @param {AuthService} authService
   * @memberof OwnerOrAuthGuard
   */
  constructor(private router: Router, private alertService: AlertService, private authService: AuthService) {}

  /**
   * Can Activate if the user is authenticated or is the owner of the ressource.
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof OwnerOrAuthGuard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let alertMessage = 'access-forbidden';

    if (this.authService.value) {
      if (this.authService.value.id === +route.parent.params.id || this.authService.value.emailVerified) {
        return true;
      }
      alertMessage = 'must-verify-email';
    } else {
      alertMessage = 'must-login';
    }
    this.alertService.open(alertMessage);
    return false;
  }
}
