import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faExclamationTriangle, faLightbulb, faSpinner, faTableTennis } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.scss']
})
export class PingComponent {
  public isPinged = false;
  public isPingLoading = false;
  public pingResult: boolean;
  public pingError: string;
  public pingCounter: number;
  public pingCount: number;

  // UI
  faExclamationTriangle = faExclamationTriangle;
  faLightbulb = faLightbulb;
  faSpinner = faSpinner;
  faTableTennis = faTableTennis;

  /**
   * Inputs
   */

  @Input() set pingRes(pingRes: boolean) {
    if (pingRes !== null) {
      this.pingResult = pingRes;
      if (this.isPingLoading && this.isPinged) {
        clearInterval(this.pingCounter);
        this.isPingLoading = false;
      }
    }
  }

  @Input() set pingErr(pingErr: string) {
    this.pingError = pingErr;
  }

  /**
   * Outputs
   */

  @Output() sendPing = new EventEmitter<boolean>();

  /**
   * Event when click on ping button
   *
   * @memberof PingComponent
   */
  public onPing(): void {
    this.isPinged = true;
    this.isPingLoading = true;
    this.pingCount = 0;
    this.sendPing.emit();
    this.pingCounter = window.setInterval(() => {
      this.pingCount++;
    }, 1);
  }
}
