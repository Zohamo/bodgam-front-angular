import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faExclamationTriangle, faHandPointUp, faLightbulb, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.scss']
})
export class PushComponent {
  public isPushed = false;
  public isPushLoading = false;
  public pushResult: boolean;
  public pushError: string;
  public pushCounter: number;
  public pushCount: number;

  // UI
  faExclamationTriangle = faExclamationTriangle;
  faHandPointUp = faHandPointUp;
  faLightbulb = faLightbulb;
  faSpinner = faSpinner;

  /**
   * Inputs
   */

  @Input() set pushRes(pushRes: boolean) {
    if (pushRes !== null) {
      this.pushResult = pushRes;
      if (this.isPushLoading && this.isPushed) {
        clearInterval(this.pushCounter);
        this.isPushLoading = false;
      }
    }
  }

  @Input() set pushErr(pushErr: string) {
    this.pushError = pushErr;
  }

  /**
   * Outputs
   */

  @Output() sendPush = new EventEmitter<boolean>();

  /**
   * Event when click on push button
   *
   * @memberof PushComponent
   */
  public onPush(): void {
    this.isPushed = true;
    this.isPushLoading = true;
    this.pushCount = 0;
    this.sendPush.emit();
    this.pushCounter = window.setInterval(() => {
      this.pushCount++;
    }, 1);
  }
}
