import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  faCalendarAlt,
  faCalendarCheck,
  faCalendarPlus,
  faCaretDown,
  faClipboardList,
  faDungeon,
  faMapMarked,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUsers,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { DialogUserLoginComponent } from '@/components/dialog-user-login/dialog-user-login.component';
import { DialogUserRegisterComponent } from '@/components/dialog-user-register/dialog-user-register.component';
import { AppConfig } from '@/config';
import { User } from '@/models';
import { UserService } from '@/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public title = AppConfig.TITLE;
  public user: User;
  public isAuth = false;

  // Subscriptions
  public userSubscription: Subscription;

  // Font Awesome
  faCalendarAlt = faCalendarAlt;
  faCalendarCheck = faCalendarCheck;
  faCalendarPlus = faCalendarPlus;
  faCaretDown = faCaretDown;
  faClipboardList = faClipboardList;
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
   * @param {UserService} userService
   * @memberof HeaderComponent
   */
  constructor(private dialog: MatDialog, private userService: UserService) {}

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties
   *
   * @memberof HeaderComponent
   */
  ngOnInit(): void {
    this.userSubscription = this.userService.currentUser$.subscribe((user) => {
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
    this.dialog.open(DialogUserRegisterComponent);
  }

  /**
   * Event for user login
   *
   * @memberof HeaderComponent
   */
  public onLogin(): void {
    this.dialog.open(DialogUserLoginComponent);
  }

  /**
   * Event fot user logout
   *
   * @memberof HeaderComponent
   */
  public onLogout(): void {
    this.userService.logout();
  }
}
