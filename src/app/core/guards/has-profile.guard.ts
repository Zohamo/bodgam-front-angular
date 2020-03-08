import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileCommentListComponent } from 'src/app/modules/profiles/components';
import { ProfilesWebService } from 'src/app/modules/profiles/services/profiles-web.service';
import { AuthenticationWebService } from '@core/services/authentication-web.service';
import { AlertService } from '@core/services/alert.service';
import { User } from '@core/models/user.model';
import { first } from 'rxjs/operators';
import { LoginFormDialogComponent } from '@core/components/auth/login-form-dialog/login-form-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class HasProfileGuard implements CanActivate {
  /**
   * Creates an instance of HasProfileGuard.
   *
   * @param {AuthenticationWebService} authenticationWebService
   * @param {ProfilesWebService} profilesWebService
   * @param {AlertService} alertService
   * @param {MatDialog} dialog
   * @param {Router} router
   * @memberof HasProfileGuard
   */
  constructor(
    private authenticationWebService: AuthenticationWebService,
    private profilesWebService: ProfilesWebService,
    private alertService: AlertService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  /**
   * Can activate if the user has a profile
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof HasProfileGuard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('HasProfileGuard route', route);
    // TODO : save profile in local storage to avoid subscribe
    // that cause issue with canActivate
    return true;

    const currentUser: User = this.authenticationWebService.currentUserValue;
    if (currentUser && currentUser.id) {
      this.profilesWebService
        .getProfile(currentUser.id)
        .pipe(first())
        .subscribe((profile) => {
          if (profile) {
            console.log('HasProfileGuard profile', profile);
            return true;
          }
          this.alertService.open('must-create-profile');
          this.router.navigate(['/players', currentUser.id]);
          return false;
        });
    } else {
      this.alertService.open('must-login');
      this.dialog.open(LoginFormDialogComponent);
      return false;
    }
  }
}
