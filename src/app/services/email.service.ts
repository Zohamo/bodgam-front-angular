import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { User, NotificationEmail } from '@/models';
import { Observable } from 'rxjs';
// import { EmailRegisterConfirmComponent } from '@/components/email-register-confirm/email-register-confirm.component';
import { EmailRegistrationConfirmationComponent, EmailForgotPasswordComponent } from '@/auth/emails';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  /**
   * Creates an instance of EmailService.
   *
   * @param {ComponentFactoryResolver} componentFactoryResolver
   * @memberof EmailService
   */
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  /**
   * Get the registration confirmation email to verify email
   *
   * @param {ViewContainerRef} viewContainerRef
   * @param {User} user
   * @returns {Observable<Email>}
   * @memberof EmailService
   */
  public getRegistrationConfirmation(viewContainerRef: ViewContainerRef, user: User): Observable<NotificationEmail> {
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(EmailRegistrationConfirmationComponent)
    );
    (componentRef.instance as EmailRegistrationConfirmationComponent).user = user;

    return (componentRef.instance as EmailRegistrationConfirmationComponent).emailNotification;
  }

  /**
   * Get the forgot password email to reset password
   *
   * @param {ViewContainerRef} viewContainerRef
   * @param {User} user
   * @returns {Observable<Email>}
   * @memberof EmailService
   */
  public getForgotPassword(viewContainerRef: ViewContainerRef, user: User): Observable<NotificationEmail> {
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(EmailForgotPasswordComponent)
    );
    (componentRef.instance as EmailForgotPasswordComponent).user = user;

    return (componentRef.instance as EmailForgotPasswordComponent).emailNotification;
  }
}
