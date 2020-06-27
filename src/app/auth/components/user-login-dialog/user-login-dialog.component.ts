import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AlertService, AuthService } from '@/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-login-dialog',
  templateUrl: './user-login-dialog.component.html',
  styleUrls: ['./user-login-dialog.component.scss']
})
export class UserLoginDialogComponent {
  public loginForm: FormGroup;
  public isLoading = false;
  public isSubmitted = false;

  // Font Awesome
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;

  /**
   * Creates an instance of UserLoginDialogComponent.
   *
   * @param {MatDialogRef<UserLoginDialogComponent>} dialogRef
   * @param {FormBuilder} formBuilder
   * @param {AuthService} authService
   * @param {AlertService} alertService
   * @memberof UserLoginDialogComponent
   */
  constructor(
    private dialogRef: MatDialogRef<UserLoginDialogComponent>,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.createForm();
  }

  /**
   * Create form
   *
   * @memberof UserLoginDialogComponent
   */
  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Convenience getter for easy access to form fields
   *
   * @readonly
   * @type {{ [key: string]: AbstractControl }}
   * @memberof UserLoginDialogComponent
   */
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  /**
   * Close this and open Forgot Password dialog
   *
   * @memberof UserLoginDialogComponent
   */
  public onForgotPassword(): void {
    this.dialogRef.close({ forgotPassword: true });
  }

  /**
   * Submit form
   *
   * @memberof UserLoginDialogComponent
   */
  public onSubmit(): void {
    this.isSubmitted = true;

    if (this.loginForm.valid) {
      this.isSubmitted = true;
      this.authService
        .login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          (user) => {
            this.alertService.open('success-login');
            this.dialogRef.close();
          },
          (error) => {
            this.alertService.open('error-login');
            this.isLoading = false;
          }
        );
    }
  }

  /**
   * Close dialog
   *
   * @memberof UserLoginDialogComponent
   */
  public onClose(): void {
    this.dialogRef.close();
  }
}
