import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { MustMatch } from '@/helpers';
import { User, Email } from '@/models';
import { AlertService, EmailService, AuthService } from '@/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-register-dialog',
  templateUrl: './user-register-dialog.component.html',
  styleUrls: ['./user-register-dialog.component.scss']
})
export class UserRegisterDialogComponent {
  public registerForm: FormGroup;
  public isLoading = false;
  public isSubmitted = false;

  @ViewChild('emailRegisterConfirm', { read: ViewContainerRef }) emailRegisterConfirm: ViewContainerRef;

  // UI
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;

  /**
   * Creates an instance of UserRegisterDialogComponent.
   *
   * @param {MatDialogRef<UserRegisterDialogComponent>} dialogRef
   * @param {FormBuilder} formBuilder
   * @param {AuthService} authService
   * @param {AlertService} alertService
   * @memberof UserRegisterDialogComponent
   */
  constructor(
    private dialogRef: MatDialogRef<UserRegisterDialogComponent>,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private emailService: EmailService
  ) {
    this.createForm();
  }

  /**
   * Create form
   *
   * @memberof UserRegisterDialogComponent
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
   * @memberof UserRegisterDialogComponent
   */
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  /**
   * Close this and open Login dialog
   *
   * @memberof UserRegisterDialogComponent
   */
  public onHasAccount(): void {
    this.dialogRef.close({ hasAccount: true });
  }

  /**
   * Prepare the entity before submit
   *
   * @returns {User}
   * @memberof UserRegisterDialogComponent
   */
  private prepareSaveEntity(): User {
    return this.registerForm.value;
  }

  /**
   * Submit form
   *
   * @memberof UserRegisterDialogComponent
   */
  public onSubmit() {
    this.isSubmitted = true;

    if (this.registerForm.valid) {
      this.isLoading = true;
      const user: User = Object.assign({}, this.prepareSaveEntity());

      this.authService
        .register(user)
        .pipe(first())
        .subscribe(
          (userResponse: User) => {
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
   * @memberof UserRegisterDialogComponent
   */
  public onClose(): void {
    this.dialogRef.close();
  }
}
