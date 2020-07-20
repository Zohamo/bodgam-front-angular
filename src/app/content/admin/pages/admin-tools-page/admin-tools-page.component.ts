import { Component } from '@angular/core';
import { AdminService } from '@/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin-tools-page',
  templateUrl: './admin-tools-page.component.html',
  styleUrls: ['./admin-tools-page.component.scss']
})
export class AdminToolsPageComponent {
  public pingResult: boolean;
  public pingError: string;

  /**
   * Creates an instance of AdminToolsPageComponent.
   *
   * @param {AdminService} adminService
   * @memberof AdminToolsPageComponent
   */
  constructor(private adminService: AdminService) {}

  /**
   * Call the AdminService to send/receive a ping.
   *
   * @memberof AdminToolsPageComponent
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
