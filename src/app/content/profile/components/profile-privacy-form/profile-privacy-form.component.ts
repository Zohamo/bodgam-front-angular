import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilePrivacy } from '@/models';

// UI
import { faCheck, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-privacy-form',
  templateUrl: './profile-privacy-form.component.html',
  styleUrls: ['./profile-privacy-form.component.scss']
})
export class ProfilePrivacyFormComponent {
  public profilePrivacyForm: FormGroup;
  public hasFormChanged: boolean;

  // Font Awesome
  faCheck = faCheck;
  faEye = faEye;

  // Inputs

  public privacy: ProfilePrivacy;
  @Input() set profilePrivacy(profilePrivacy: ProfilePrivacy) {
    this.privacy = profilePrivacy;
    this.populateForm();
  }

  // Outputs

  @Output() saveProfilePrivacy = new EventEmitter<ProfilePrivacy>();

  /**
   * Creates an instance of ProfilePrivacyFormComponent.
   *
   * @param {FormBuilder} fb
   * @memberof ProfilePrivacyFormComponent
   */
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  /**
   * Initialize the form
   *
   * @private
   * @memberof profilePrivacyFormComponent
   */
  private createForm(): void {
    this.profilePrivacyForm = this.fb.group({
      showEmail: ['', Validators.required],
      showPhoneNumber: ['', Validators.required],
      showBirthdate: ['', Validators.required],
      showBggName: ['', Validators.required],
      showWebsite: ['', Validators.required]
    });
  }

  /**
   * Populate the form
   *
   * @private
   * @memberof profilePrivacyFormComponent
   */
  private populateForm(): void {
    if (this.privacy) {
      this.profilePrivacyForm.setValue({
        showEmail: this.privacy.showEmail,
        showPhoneNumber: this.privacy.showPhoneNumber,
        showBirthdate: this.privacy.showBirthdate,
        showBggName: this.privacy.showBggName,
        showWebsite: this.privacy.showWebsite
      });
    }
  }

  /**
   * Prepare the entity before submit
   *
   * @private
   * @returns {ProfilePrivacy}
   * @memberof profilePrivacyFormComponent
   */
  private prepareSaveEntity(): ProfilePrivacy {
    return this.profilePrivacyForm.value;
  }

  /**
   * Submit event
   *
   * @memberof profilePrivacyFormComponent
   */
  public onSubmit(): void {
    if (this.profilePrivacyForm.valid) {
      console.log('profilePrivacyForm', this.prepareSaveEntity());
      this.saveProfilePrivacy.emit(this.prepareSaveEntity());
    }
  }
}
