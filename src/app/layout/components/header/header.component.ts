import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  faBolt,
  faCalendarAlt,
  faCalendarCheck,
  faCalendarPlus,
  faCaretDown,
  faClipboardList,
  faDungeon,
  faGlobe,
  faMapMarked,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUsers,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import {
  PasswordForgotDialogComponent,
  UserRegisterDialogComponent,
  UserLoginDialogComponent
} from '@/auth/components';
import { AppInfo } from '@/config';
import { User } from '@/models';
import { AuthService, UserService } from '@/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public title = AppInfo.TITLE;
  public user: User;
  public isAdmin = false;

  // Subscriptions
  public userSubscription: Subscription;

  // Font Awesome
  faBolt = faBolt;
  faCalendarAlt = faCalendarAlt;
  faCalendarCheck = faCalendarCheck;
  faCalendarPlus = faCalendarPlus;
  faCaretDown = faCaretDown;
  faClipboardList = faClipboardList;
  faDungeon = faDungeon;
  faGlobe = faGlobe;
  faMapMarked = faMapMarked;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faUser = faUser;
  faUsers = faUsers;
  faUserPlus = faUserPlus;

  /**
   * Creates an instance of HeaderComponent.
   *
   * @param {AuthService} authService
   * @param {MatDialog} dialog
   * @param {UserService} userService
   * @memberof HeaderComponent
   */
  constructor(private authService: AuthService, private dialog: MatDialog, private userService: UserService) {}

  /**
   * Called after Angular has initialized all data-bound properties
   *
   * @memberof HeaderComponent
   */
  ngOnInit(): void {
    this.userSubscription = this.userService.currentUser$.subscribe((user: User) => {
      this.user = user;
      this.isAdmin = this.userService.isAdmin;
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
    const dialogRef = this.dialog.open(UserRegisterDialogComponent);

    dialogRef.afterClosed().subscribe((res: { hasAccount: boolean }) => {
      if (res && res.hasAccount) {
        this.onLogin();
      }
    });
  }

  /**
   * Event for user login
   *
   * @memberof HeaderComponent
   */
  public onLogin(): void {
    const dialogRef = this.dialog.open(UserLoginDialogComponent);

    dialogRef.afterClosed().subscribe((res: { forgotPassword: boolean }) => {
      if (res && res.forgotPassword) {
        this.dialog.open(PasswordForgotDialogComponent);
      }
    });
  }

  /**
   * Event for user logout
   *
   * @memberof HeaderComponent
   */
  public onLogout(): void {
    this.authService.logout();
  }
}
