import { Component, OnInit } from '@angular/core';
import { faTools, faUsersCog, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { User } from '@/models';
import { UserService } from '@/services';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  public isSuperAdmin: boolean;

  // UI
  faTools = faTools;
  faUsersCog = faUsersCog;
  faUserShield = faUserShield;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser$.subscribe((user: User) => {
      if (user) {
        this.isSuperAdmin = this.userService.isSuperAdmin;
      }
    });
  }
}
