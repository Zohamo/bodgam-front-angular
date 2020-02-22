import { Component } from '@angular/core';

// Entry Components
import { LoginFormDialogComponent } from '@core/components/auth/login-form-dialog/login-form-dialog.component';
import { RegisterFormDialogComponent } from '@core/components/auth/register-form-dialog/register-form-dialog.component';

// Services
import { AuthenticationWebService } from '@core/services/authentication-web.service';

// UI
import {
  faCalendarAlt,
  faCaretDown,
  faDungeon,
  faMapMarked,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUsers,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // Font Awesome
  faCalendarAlt = faCalendarAlt;
  faCaretDown = faCaretDown;
  faDungeon = faDungeon;
  faMapMarked = faMapMarked;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faUser = faUser;
  faUsers = faUsers;
  faUserPlus = faUserPlus;

  /**
   * Creates an instance of HeaderComponent.
   *
   * @param {MatDialog} dialog
   * @param {AuthenticationWebService} authenticationWebService
   * @memberof HeaderComponent
   */
  constructor(private dialog: MatDialog, private authenticationWebService: AuthenticationWebService) {}

  /**
   * Event to register new user
   *
   * @memberof HeaderComponent
   */
  public onRegister(): void {
    this.dialog.open(RegisterFormDialogComponent);
  }

  /**
   * Event for user login
   *
   * @memberof HeaderComponent
   */
  public onLogin(): void {
    this.dialog.open(LoginFormDialogComponent);
  }

  /**
   * Event fot user logout
   *
   * @memberof HeaderComponent
   */
  public onLogout(): void {
    this.authenticationWebService.logout();
  }
}
