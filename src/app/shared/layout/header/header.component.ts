import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Models
import { User } from '@core/models/user.model';

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
export class HeaderComponent implements OnInit, OnDestroy {
  public user: User;
  public isAuth = false;

  // Subscriptions
  public userSubscription: Subscription;

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
   * A lifecycle hook that is called after Angular has initialized all data-bound properties
   *
   * @memberof HeaderComponent
   */
  ngOnInit(): void {
    this.userSubscription = this.authenticationWebService.currentUser$.subscribe((user) => {
      this.user = user;
      this.isAuth = Boolean(user);
    });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof HeaderComponent
   */
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

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
