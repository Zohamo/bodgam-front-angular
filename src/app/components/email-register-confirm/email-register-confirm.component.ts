import { Component, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { User, Email } from '@/models';

@Component({
  selector: 'app-email-register-confirm',
  templateUrl: './email-register-confirm.component.html',
  styleUrls: ['./email-register-confirm.component.scss']
})
export class EmailRegisterConfirmComponent implements AfterViewInit {
  @Input() user: User;
  @Output() email = new EventEmitter<Email>();

  // View Children
  @ViewChild('subject', { read: ElementRef }) subject: ElementRef;
  @ViewChild('content', { read: ElementRef }) content: ElementRef;

  /**
   * Hook that is called after Angular has fully initialized a component's view.
   *
   * @memberof EmailRegisterConfirmComponent
   */
  ngAfterViewInit(): void {
    this.email.emit({
      subject: this.subject.nativeElement.textContent.trim(),
      content: this.content.nativeElement.innerHTML
    });
  }
}
