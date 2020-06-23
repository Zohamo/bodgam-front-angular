import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@/services';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  /**
   * Creates an instance of AdminGuard.
   *
   * @param {AlertService} alertService
   * @param {AuthService} authService
   * @memberof AdminGuard
   */
  constructor(private router: Router, private authService: AuthService) {}

  /**
   * Can Activate if the user is authenticated
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof AdminGuard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.id === +route.parent.params.id) {
      return true;
    }

    this.router.navigate(['error', 401]);
    return false;
  }
}
