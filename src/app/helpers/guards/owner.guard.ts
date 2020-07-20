import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '@/services';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
  /**
   * Creates an instance of OwnerGuard.
   *
   * @param {AlertService} alertService
   * @param {AuthService} authService
   * @memberof OwnerGuard
   */
  constructor(private router: Router, private userService: UserService) {}

  /**
   * Can Activate if the user is authenticated
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof OwnerGuard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.id === +route.parent.params.id) {
      return true;
    }

    this.router.navigate(['error', 401]);
    return false;
  }
}
