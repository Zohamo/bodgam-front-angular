import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { AdminService, AuthService } from '@/services';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  public isPinged = false;
  public isPingLoading = false;
  public pingResult: boolean;
  public pingError: string;

  /**
   * Creates an instance of AdminPageComponent.
   *
   * @param {AdminService} adminService
   * @param {AuthService} authService
   * @memberof AdminPageComponent
   */
  constructor(private adminService: AdminService, private authService: AuthService) {}

  /**
   * Call the AdminService to send/receive a ping.
   *
   * @memberof AdminPageComponent
   */
  public sendPing(): void {
    this.pingResult = null;
    this.adminService
      .ping()
      .pipe(first())
      .subscribe(
        (result: boolean) => {
          console.log('ping result', result);
          this.pingResult = true;
        },
        (error) => {
          console.log('ping error', error);
          this.pingResult = false;
          this.pingError = error;
        }
      );
  }
}
