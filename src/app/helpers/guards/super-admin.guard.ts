import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '@/services';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
  /**
   * Creates an instance of SuperAdminGuard.
   *
   * @param {AlertService} alertService
   * @param {AuthService} authService
   * @memberof SuperAdminGuard
   */
  constructor(private router: Router, private userService: UserService) {}

  /**
   * Can Activate if the User is Super Admin
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof SuperAdminGuard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isSuperAdmin) {
      return true;
    }

    this.router.navigate(['error', 401]);
    return false;
  }
}
