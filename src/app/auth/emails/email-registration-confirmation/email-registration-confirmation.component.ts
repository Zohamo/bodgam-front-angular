import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { User, NotificationEmail } from '@/models';
import { AppInfo } from '@/config';

@Component({
  selector: 'app-email-registration-confirmation',
  templateUrl: './email-registration-confirmation.component.html',
  styleUrls: ['./email-registration-confirmation.component.scss']
})
export class EmailRegistrationConfirmationComponent implements AfterViewInit {
  public bodgamUrl: string = AppInfo.URL;

  @Input() user: User;
  @Output() emailNotification = new EventEmitter<NotificationEmail>();

  // View Children
  @ViewChild('subject', { read: ElementRef }) subject: ElementRef;

  @ViewChild('content', { read: ElementRef }) content: ElementRef;

  @ViewChild('greeting', { read: ElementRef }) greeting: ElementRef;
  @ViewChild('line1', { read: ElementRef }) line1: ElementRef;
  @ViewChild('line2', { read: ElementRef }) line2: ElementRef;
  @ViewChild('action', { read: ElementRef }) action: ElementRef;
  @ViewChild('salutation', { read: ElementRef }) salutation: ElementRef;

  /**
   * Called after Angular has fully initialized the view.
   *
   * @memberof EmailRegisterConfirmComponent
   */
  ngAfterViewInit(): void {
    this.emailNotification.emit({
      level: 'success',
      content: [
        {
          type: 'subject',
          text: this.subject.nativeElement.textContent.trim()
        },
        {
          type: 'line',
          text: this.line1.nativeElement.innerHTML
        },
        {
          type: 'line',
          text: this.line2.nativeElement.innerHTML
        },
        {
          type: 'action',
          text: this.action.nativeElement.innerHTML
        },
        {
          type: 'salutation',
          text: this.salutation.nativeElement.innerHTML
        }
      ]
    });
  }
}
