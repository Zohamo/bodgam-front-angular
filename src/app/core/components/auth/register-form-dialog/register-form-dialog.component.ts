import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';

// Services
import { AlertService } from '@core/services/alert.service';
import { AuthenticationWebService } from '@core/services/authentication-web.service';

// UI
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-register-form-dialog',
  templateUrl: './register-form-dialog.component.html',
  styleUrls: ['./register-form-dialog.component.scss']
})
export class RegisterFormDialogComponent {
  public registerForm: FormGroup;
  public isLoading = false;
  public isSubmitted = false;

  // Font Awesome
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;

  /**
   * Creates an instance of RegisterFormDialogComponent.
   *
   * @param {MatDialogRef<RegisterFormDialogComponent>} dialogRef
   * @param {FormBuilder} formBuilder
   * @param {UserService} userService
   * @param {AlertService} alertService
   * @memberof RegisterFormDialogComponent
   */
  constructor(
    private dialogRef: MatDialogRef<RegisterFormDialogComponent>,
    private formBuilder: FormBuilder,
    private authenticationWebService: AuthenticationWebService,
    private alertService: AlertService
  ) {
    this.createForm();
  }

  /**
   * Create form
   *
   * @memberof RegisterFormDialogComponent
   */
  createForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Convenience getter for easy access to form fields
   *
   * @readonly
   * @type {{ [key: string]: AbstractControl }}
   * @memberof RegisterFormDialogComponent
   */
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  /**
   * Submit form
   *
   * @memberof RegisterFormDialogComponent
   */
  public onSubmit() {
    this.isSubmitted = true;

    if (this.registerForm.valid) {
      this.isLoading = true;
      console.log('submit', this.f.email.value, this.f.password.value);
      this.authenticationWebService
        .register(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.alertService.open('success-register');
            this.dialogRef.close();
          },
          (error) => {
            this.alertService.open('error-register');
            this.isLoading = false;
          }
        );
    }
  }

  /**
   * Close dialog
   *
   * @memberof RegisterFormDialogComponent
   */
  public onClose(): void {
    this.dialogRef.close();
  }
}
