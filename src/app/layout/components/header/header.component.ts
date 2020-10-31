import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import {
  faBell,
  faBolt,
  faCalendarAlt,
  faCalendarCheck,
  faCalendarPlus,
  faCaretDown,
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
import { NotificationBg, User } from '@/models';
import { AuthService, UserService, NotificationService, PusherService } from '@/services';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  public title = AppInfo.TITLE;
  public user: User;
  public userIsAdmin: boolean;
  public userHasEmailVerified: boolean;

  // Notifications
  public notifications: NotificationBg[] = [];

  // Subscriptions
  public userSubscription: Subscription;

  // Font Awesome
  faBell = faBell;
  faBolt = faBolt;
  faCalendarAlt = faCalendarAlt;
  faCalendarCheck = faCalendarCheck;
  faCalendarPlus = faCalendarPlus;
  faCaretDown = faCaretDown;
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
   * @param {NotificationService} notificationService
   * @param {PusherService} pusherService
   * @memberof HeaderComponent
   */
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private userService: UserService,
    private notificationService: NotificationService,
    private pusherService: PusherService
  ) {
    this.userSubscription = this.userService.currentUser$.subscribe((user: User) => {
      this.user = user;
      this.userIsAdmin = this.userService.isAdmin;
      this.userHasEmailVerified = this.userService.hasEmailVerified;
      if (user) {
        // Get the notifications list
        this.notificationService
          .getUserUnreadNotifications()
          .pipe(first())
          .subscribe((notifications: NotificationBg[]) => {
            this.notifications = notifications || [];
          });

        // Subscription to pusher's notifications
        this.pusherService.subscribeToChannel('user-notifications', [`user-${user.id}`], (notification) => {
          this.notifications.unshift(notification);
        });
      }
    });
  }

  /**
   * Unsubscribes before component is destroyed.
   *
   * @memberof HeaderComponent
   */
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  /**
   * On event, registers a new user.
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
   * On event, signs in user.
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
   * On event, signs out user.
   *
   * @memberof HeaderComponent
   */
  public onLogout(): void {
    this.authService.logout();
  }
}
