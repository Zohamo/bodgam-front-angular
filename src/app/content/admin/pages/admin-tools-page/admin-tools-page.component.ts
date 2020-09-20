import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService, NotificationService, PusherService } from '@/services';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-tools-page',
  templateUrl: './admin-tools-page.component.html',
  styleUrls: ['./admin-tools-page.component.scss']
})
export class AdminToolsPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  // Ping
  public pingResult: boolean;
  public pingError: string;
  // Push
  public pushResult: boolean;
  public pushError: string;

  /**
   * Creates an instance of AdminToolsPageComponent.
   *
   * @param {AdminService} adminService
   * @memberof AdminToolsPageComponent
   */
  constructor(private adminService: AdminService, private pusherService: PusherService) {}

  ngOnInit() {
    this.pusherService.subscribeToChannel('admin', ['admin.push'], (data) => {
      console.log('ADMIN pusherService.subScribeToChannel', data);
    });
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof AdminToolsPageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

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

  /**
   * Call the AdminService to send a push.
   *
   * @memberof AdminToolsPageComponent
   */
  public sendPush(): void {
    this.pushResult = null;
    this.adminService
      .push('hello')
      .pipe(first())
      .subscribe(
        (result: boolean) => {
          console.log('RESULT push', result);
          this.pushResult = true;
        },
        (error) => {
          console.log('ERROR push', error);
          this.pushResult = false;
          this.pushError = error;
        }
      );
  }
}
