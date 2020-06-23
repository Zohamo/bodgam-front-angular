import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AlertService, AuthService } from '@/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-user-login',
  templateUrl: './dialog-user-login.component.html',
  styleUrls: ['./dialog-user-login.component.scss']
})
export class DialogUserLoginComponent {
  public loginForm: FormGroup;
  public isLoading = false;
  public isSubmitted = false;

  // Font Awesome
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;

  /**
   * Creates an instance of DialogUserLoginComponent.
   *
   * @param {MatDialogRef<DialogUserLoginComponent>} dialogRef
   * @param {FormBuilder} formBuilder
   * @param {AuthService} authService
   * @param {AlertService} alertService
   * @memberof DialogUserLoginComponent
   */
  constructor(
    private dialogRef: MatDialogRef<DialogUserLoginComponent>,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.createForm();
  }

  /**
   * Create form
   *
   * @memberof DialogUserLoginComponent
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
   * @memberof DialogUserLoginComponent
   */
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  /**
   * Close this and open Forgot Password dialog
   *
   * @memberof DialogUserLoginComponent
   */
  public onForgotPassword(): void {
    this.dialogRef.close({ forgotPassword: true });
  }

  /**
   * Submit form
   *
   * @memberof DialogUserLoginComponent
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
   * @memberof DialogUserLoginComponent
   */
  public onClose(): void {
    this.dialogRef.close();
  }
}
