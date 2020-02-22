﻿import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';

// Services
import { AlertService } from '@core/services/alert.service';
import { AuthenticationWebService } from '@core/services/authentication-web.service';

// UI
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-form-dialog',
  templateUrl: './login-form-dialog.component.html',
  styleUrls: ['./login-form-dialog.component.scss']
})
export class LoginFormDialogComponent {
  public loginForm: FormGroup;
  public isLoading = false;
  public isSubmitted = false;

  // Font Awesome
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;

  /**
   * Creates an instance of LoginFormDialogComponent.
   *
   * @param {MatDialogRef<LoginFormDialogComponent>} dialogRef
   * @param {FormBuilder} formBuilder
   * @param {AuthenticationWebService} authenticationWebService
   * @param {AlertService} alertService
   * @memberof LoginFormDialogComponent
   */
  constructor(
    private dialogRef: MatDialogRef<LoginFormDialogComponent>,
    private formBuilder: FormBuilder,
    private authenticationWebService: AuthenticationWebService,
    private alertService: AlertService
  ) {
    this.createForm();
  }

  /**
   * Create form
   *
   * @memberof LoginFormDialogComponent
   */
  createForm(): void {
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
   * @memberof LoginFormDialogComponent
   */
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  /**
   * Submit form
   *
   * @memberof LoginFormDialogComponent
   */
  onSubmit(): void {
    this.isSubmitted = true;

    if (this.loginForm.valid) {
      this.isSubmitted = true;
      console.log('submit', this.f.email.value, this.f.password.value);
      this.authenticationWebService
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
   * @memberof LoginFormDialogComponent
   */
  onClose(): void {
    this.dialogRef.close();
  }
}
