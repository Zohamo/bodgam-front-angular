import { Component } from '@angular/core';
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

  public user: { id: number; name: string; isAuth: boolean };

  constructor() {
    this.user = {
      id: 28,
      name: 'Zohamo',
      isAuth: true
    };
  }

  onLogin() {
    this.user.isAuth = true;
  }

  onLogout() {
    this.user.isAuth = false;
  }
}
