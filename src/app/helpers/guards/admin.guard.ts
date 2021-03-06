import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '@/services';

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
  constructor(private router: Router, private userService: UserService) {}

  /**
   * Can Activate if the User is Admin
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof AdminGuard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.isAdmin) {
      return true;
    }

    this.router.navigate(['error', 401]);
    return false;
  }
}
