import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserRegisterDialogComponent } from '@/auth/components';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  /**
   * Creates an instance of HomePageComponent.
   *
   * @param {MatDialog} dialog
   * @memberof HomePageComponent
   */
  constructor(private dialog: MatDialog) {}

  /**
   * Event to register new user
   *
   * @memberof HomePageComponent
   */
  public onRegister(): void {
    this.dialog.open(UserRegisterDialogComponent);
  }
}
