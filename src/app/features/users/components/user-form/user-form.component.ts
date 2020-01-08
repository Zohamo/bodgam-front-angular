import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';

// Models
import { UserFullRepresentation } from '../../models/user-full-representation.model';
import { Country } from 'src/app/shared/models/country.model';
import { BggGameRepresentation } from 'src/app/shared/models/bgg/bgg-game-representation.model';

// UI
import { faCheck, faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  // Font Awesome
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;
  faSearch = faSearch;

  public userForm: FormGroup;
  public today: Date;
  public isLoadingBggGames: boolean;

  // Inputs

  public user: UserFullRepresentation;
  @Input() set userEditing(userEditing: UserFullRepresentation) {
    this.user = userEditing;
    this.populateForm();
  }

  public countries: Country[];
  @Input() set countryList(countryList: Country[]) {
    if (countryList) {
      this.countries = countryList;
      this.userForm.get('country').enable();
    }
  }

  public games: BggGameRepresentation[];
  @Input() set gamesList(gamesList: BggGameRepresentation[]) {
    if (gamesList) {
      this.isLoadingBggGames = false;
      this.games = gamesList;
    }
  }

  // Outputs

  @Output() saveUser = new EventEmitter<UserFullRepresentation>();
  @Output() getBggGames = new EventEmitter<string>();

  /**
   * Creates an instance of UserFormComponent.
   *
   * @param {FormBuilder} fb
   * @memberof UserFormComponent
   */
  constructor(private fb: FormBuilder) {
    this.today = new Date();
    this.createForm();
  }

  /**
   * Initialize the form
   *
   * @private
   * @memberof UserFormComponent
   */
  private createForm(): void {
    this.userForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      district: [],
      city: [],
      country: [{ value: '', disabled: !this.countries }, Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
      gender: [],
      birthdate: [],
      bggName: [],
      phoneNumber: [],
      privacy: this.fb.group({
        showEmail: ['', Validators.required],
        showPhoneNumber: ['', Validators.required],
        showBirthdate: ['', Validators.required],
        showBggName: ['', Validators.required]
      })
    });
  }

  /**
   * Populate the form
   *
   * @private
   * @memberof UserFormComponent
   */
  private populateForm(): void {
    if (this.user) {
      this.userForm.setValue({
        id: this.user.id,
        name: this.user.name,
        district: this.user.district,
        city: this.user.city,
        country: this.user.country,
        email: this.user.email,
        gender: this.user.gender,
        birthdate: this.user.birthdate ? moment.unix(this.user.birthdate).format() : null,
        bggName: this.user.bggName,
        phoneNumber: this.user.phoneNumber,
        privacy: {
          showEmail: this.user.privacy.showEmail,
          showPhoneNumber: this.user.privacy.showPhoneNumber,
          showBirthdate: this.user.privacy.showBirthdate,
          showBggName: this.user.privacy.showBggName
        }
      });
    }
  }

  /**
   * Prepare the entity before submit
   *
   * @private
   * @returns {UserFullRepresentation}
   * @memberof UserFormComponent
   */
  private prepareSaveEntity(): UserFullRepresentation {
    const userForm = this.userForm.value;
    userForm.birthdate = moment(userForm.birthdate).valueOf();
    return userForm;
  }

  /**
   * Submit event
   *
   * @memberof UserFormComponent
   */
  public onSubmit(): void {
    if (this.userForm.valid) {
      console.log('userForm', this.prepareSaveEntity());
      this.saveUser.emit(this.prepareSaveEntity());
    }
  }

  /**
   * Calls BoardGameGeek API to retrieve the games's list
   *
   * @memberof UserFormComponent
   */
  public onGetBggGames(): void {
    if (this.userForm.get('bggName').value.length >= 3) {
      this.isLoadingBggGames = true;
      this.getBggGames.emit(this.userForm.get('bggName').value);
    }
  }

  /**
   * On click switches the control value
   *
   * @param {string} control
   * @memberof UserFormComponent
   */
  public onSwitchControlValue(control: string): void {
    switch (control) {
      case 'showEmail':
        this.userForm.patchValue({ privacy: { showEmail: !this.userForm.get('privacy').get('showEmail').value } });
        break;
      case 'showPhoneNumber':
        this.userForm.patchValue({
          privacy: { showPhoneNumber: !this.userForm.get('privacy').get('showPhoneNumber').value }
        });
        break;
      case 'showBirthdate':
        this.userForm.patchValue({
          privacy: { showBirthdate: !this.userForm.get('privacy').get('showBirthdate').value }
        });
        break;
      case 'showBggName':
        this.userForm.patchValue({
          privacy: { showBggName: !this.userForm.get('privacy').get('showBggName').value }
        });
        break;
    }
  }
}
