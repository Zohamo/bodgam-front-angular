import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { MustMatch } from '@/helpers';
import { User, Email } from '@/models';
import { AlertService, EmailService, UserService } from '@/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-user-register',
  templateUrl: './dialog-user-register.component.html',
  styleUrls: ['./dialog-user-register.component.scss']
})
export class DialogUserRegisterComponent {
  public registerForm: FormGroup;
  public isLoading = false;
  public isSubmitted = false;

  @ViewChild('emailRegisterConfirm', { read: ViewContainerRef }) emailRegisterConfirm: ViewContainerRef;

  // UI
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;

  /**
   * Creates an instance of DialogUserRegisterComponent.
   *
   * @param {MatDialogRef<DialogUserRegisterComponent>} dialogRef
   * @param {FormBuilder} formBuilder
   * @param {UserService} userService
   * @param {AlertService} alertService
   * @memberof DialogUserRegisterComponent
   */
  constructor(
    private dialogRef: MatDialogRef<DialogUserRegisterComponent>,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private userService: UserService,
    private emailService: EmailService
  ) {
    this.createForm();
  }

  /**
   * Create form
   *
   * @memberof DialogUserRegisterComponent
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
   * @memberof DialogUserRegisterComponent
   */
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  /**
   * Prepare the entity before submit
   *
   * @returns {User}
   * @memberof DialogUserRegisterComponent
   */
  private prepareSaveEntity(): User {
    return this.registerForm.value;
  }

  /**
   * Submit form
   *
   * @memberof DialogUserRegisterComponent
   */
  public onSubmit() {
    this.isSubmitted = true;

    if (this.registerForm.valid) {
      this.isLoading = true;
      const user: User = Object.assign({}, this.prepareSaveEntity());

      this.emailService
        .buildRegisterConfirmEmail(this.emailRegisterConfirm, user)
        .subscribe((verificationEmail: Email) => {
          user.verificationEmail = verificationEmail;

          this.userService
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
        });
    }
  }

  /**
   * Close dialog
   *
   * @memberof DialogUserRegisterComponent
   */
  public onClose(): void {
    this.dialogRef.close();
  }
}
