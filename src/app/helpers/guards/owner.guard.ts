import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UserService, AuthService } from '@/services';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
  /**
   * Creates an instance of OwnerGuard.
   *
   * @param {Router} router
   * @param {AuthService} authService
   * @memberof OwnerGuard
   */
  constructor(private router: Router, private authService: AuthService) {}

  /**
   * Can Activate if the user is the owner of the ressource.
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof OwnerGuard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.value && this.authService.value.id === +route.parent.params.id) {
      return true;
    }

    this.router.navigate(['error', 401]);
    return false;
  }
}
