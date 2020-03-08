import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';

// Models
import { User } from '@core/models/user.model';

// Services
import { AlertService } from '@core/services/alert.service';
import { AuthenticationWebService } from '@core/services/authentication-web.service';

// Validators
import { MustMatch } from '@core/helpers/must-match.validator';

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
  private createForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'passwordConfirm')
      }
    );
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
   * Prepare the entity before submit
   *
   * @returns {User}
   * @memberof RegisterFormDialogComponent
   */
  private prepareSaveEntity(): User {
    return this.registerForm.value;
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
      console.log('submit', this.prepareSaveEntity());
      this.authenticationWebService
        .register(this.prepareSaveEntity())
        .pipe(first())
        .subscribe(
          (user) => {
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
