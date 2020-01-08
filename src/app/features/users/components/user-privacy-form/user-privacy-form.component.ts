import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models
import { UserFullRepresentation } from '../../models/user-full-representation.model';

// UI
import { faCheck, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-privacy-form',
  templateUrl: './user-privacy-form.component.html',
  styleUrls: ['./user-privacy-form.component.scss']
})
export class UserPrivacyFormComponent {
  public userPrivacyForm: FormGroup;
  public hasFormChanged: boolean;

  // Font Awesome
  faCheck = faCheck;
  faEye = faEye;

  // Inputs

  public user: UserFullRepresentation;
  @Input() set userDetail(userDetail: UserFullRepresentation) {
    this.user = userDetail;
    this.populateForm();
  }

  // Outputs

  @Output() saveUserPrivacy = new EventEmitter<UserFullRepresentation>();

  /**
   * Creates an instance of UserPrivacyFormComponent.
   *
   * @param {FormBuilder} fb
   * @memberof UserPrivacyFormComponent
   */
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  /**
   * Initialize the form
   *
   * @private
   * @memberof userPrivacyFormComponent
   */
  private createForm(): void {
    this.userPrivacyForm = this.fb.group({
      id: [],
      name: [''],
      district: [],
      city: [],
      country: [''],
      email: [''],
      gender: [],
      birthdate: [],
      bggName: [],
      phoneNumber: [],
      privacy: this.fb.group({
        showEmail: ['', Validators.required],
        showPhoneNumber: ['', Validators.required],
        showBirthdate: ['', Validators.required],
        showBggName: ['', Validators.required],
        showWebsite: ['', Validators.required]
      })
    });
  }

  /**
   * Populate the form
   *
   * @private
   * @memberof userPrivacyFormComponent
   */
  private populateForm(): void {
    if (this.user) {
      this.userPrivacyForm.setValue({
        id: this.user.id,
        name: this.user.name,
        district: this.user.district,
        city: this.user.city,
        country: this.user.country,
        email: this.user.email,
        gender: this.user.gender,
        birthdate: this.user.birthdate,
        bggName: this.user.bggName,
        phoneNumber: this.user.phoneNumber,
        privacy: {
          showEmail: this.user.privacy.showEmail,
          showPhoneNumber: this.user.privacy.showPhoneNumber,
          showBirthdate: this.user.privacy.showBirthdate,
          showBggName: this.user.privacy.showBggName,
          showWebsite: this.user.privacy.showWebsite
        }
      });
    }
  }

  /**
   * Prepare the entity before submit
   *
   * @private
   * @returns {UserFullRepresentation}
   * @memberof userPrivacyFormComponent
   */
  private prepareSaveEntity(): UserFullRepresentation {
    return this.userPrivacyForm.value;
  }

  /**
   * Submit event
   *
   * @memberof userPrivacyFormComponent
   */
  public onSubmit(): void {
    if (this.userPrivacyForm.valid) {
      console.log('userPrivacyForm', this.prepareSaveEntity());
      this.saveUserPrivacy.emit(this.prepareSaveEntity());
    }
  }
}
