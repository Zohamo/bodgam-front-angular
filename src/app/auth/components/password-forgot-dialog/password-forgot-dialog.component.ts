import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AlertService, AuthService } from '@/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-password-forgot-dialog',
  templateUrl: './password-forgot-dialog.component.html',
  styleUrls: ['./password-forgot-dialog.component.scss']
})
export class PasswordForgotDialogComponent {
  public forgotPasswordForm: FormGroup;
  public isLoading = false;

  // Font Awesome
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;

  /**
   * Creates an instance of PasswordForgotDialogComponent.
   *
   * @param {MatDialogRef<PasswordForgotDialogComponent>} dialogRef
   * @param {FormBuilder} formBuilder
   * @param {AuthService} authService
   * @param {AlertService} alertService
   * @memberof PasswordForgotDialogComponent
   */
  constructor(
    private dialogRef: MatDialogRef<PasswordForgotDialogComponent>,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.createForm();
  }

  /**
   * Create form
   *
   * @memberof PasswordForgotDialogComponent
   */
  private createForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  /**
   * Convenience getter for easy access to form fields
   *
   * @readonly
   * @type {{ [key: string]: AbstractControl }}
   * @memberof PasswordForgotDialogComponent
   */
  get f(): { [key: string]: AbstractControl } {
    return this.forgotPasswordForm.controls;
  }

  /**
   * Submit form
   *
   * @memberof PasswordForgotDialogComponent
   */
  public onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      this.authService
        .resetPassword({ email: this.f.email.value })
        .pipe(first())
        .subscribe(
          (result) => {
            this.alertService.open('success-reset-password');
            this.dialogRef.close();
          },
          (error) => {
            this.alertService.open('error-reset-password');
            this.isLoading = false;
          }
        );
    }
  }

  /**
   * Close dialog
   *
   * @memberof PasswordForgotDialogComponent
   */
  public onClose(): void {
    this.dialogRef.close();
  }
}
