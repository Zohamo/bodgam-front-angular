import { Component } from '@angular/core';
import {
  faDungeon,
  faUsers,
  faCalendarAlt,
  faUser,
  faMapMarked,
  faSignInAlt,
  faSignOutAlt,
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // Font Awesome
  faDungeon = faDungeon;
  faUsers = faUsers;
  faCalendarAlt = faCalendarAlt;
  faUser = faUser;
  faMapMarked = faMapMarked;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;
  faCaretDown = faCaretDown;

  public user: { id: number; name: string; isAuth: boolean };

  constructor() {
    this.user = {
      id: 28,
      name: 'Zohamo',
      isAuth: true
    };
  }
}
