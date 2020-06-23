import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { MustMatch } from '@/helpers';
import { PasswordReset } from '@/models';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.scss']
})
export class PasswordResetFormComponent {
  public passwordResetForm: FormGroup;

  // UI
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;

  /**
   * Inputs
   */

  @Input() isLoading = false;

  /**
   * Outputs
   */

  @Output() changePassword = new EventEmitter<PasswordReset>();

  /**
   * Creates an instance of PasswordResetFormComponent.
   *
   * @param {FormBuilder} formBuilder
   * @memberof PasswordResetFormComponent
   */
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  /**
   * Create form
   *
   * @memberof PasswordResetFormComponent
   */
  private createForm(): void {
    this.passwordResetForm = this.formBuilder.group(
      {
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
   * @memberof PasswordResetFormComponent
   */
  get f(): { [key: string]: AbstractControl } {
    return this.passwordResetForm.controls;
  }

  /**
   * Prepare the entity before submit
   *
   * @private
   * @returns {{ email: string; password: string }}
   * @memberof PasswordResetFormComponent
   */
  private prepareSaveEntity(): PasswordReset {
    const passwordResetForm = Object.assign({}, this.passwordResetForm.value);
    delete passwordResetForm.passwordConfirm;
    return passwordResetForm;
  }

  /**
   * Submit form
   *
   * @memberof PasswordResetFormComponent
   */
  public onSubmit() {
    if (this.passwordResetForm.valid) {
      this.isLoading = true;
      this.changePassword.emit(this.prepareSaveEntity());
    }
  }
}
