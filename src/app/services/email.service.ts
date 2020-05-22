import { Injectable, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { User, Email } from '@/models';
import { Observable } from 'rxjs';
import { EmailRegisterConfirmComponent } from '@/components/email-register-confirm/email-register-confirm.component';

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
   * Build the Email verification to confirm register.
   *
   * @param {ViewContainerRef} viewContainerRef
   * @param {User} user
   * @returns {Observable<Email>}
   * @memberof EmailService
   */
  public buildRegisterConfirmEmail(viewContainerRef: ViewContainerRef, user: User): Observable<Email> {
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(EmailRegisterConfirmComponent)
    );
    (componentRef.instance as EmailRegisterConfirmComponent).user = user;

    return (componentRef.instance as EmailRegisterConfirmComponent).email;
  }
}
