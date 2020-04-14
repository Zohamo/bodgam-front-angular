import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  faBuilding,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faDice,
  faInfoCircle,
  faSearch,
  faTimesCircle,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { BggGame, Country, Profile } from '@/models';
import { AlertService, BoardGameGeekService, CountryService, ProfileService } from '@/services';
import moment from 'moment';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile-form-dialog',
  templateUrl: './profile-form-dialog.component.html',
  styleUrls: ['./profile-form-dialog.component.scss']
})
export class ProfileFormDialogComponent implements OnInit {
  public profileForm: FormGroup;
  public today: Date;
  public countries: Country[];
  public games: BggGame[];
  public isLoadingBggGames: boolean;

  // Font Awesome
  faBuilding = faBuilding;
  faCheck = faCheck;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faDice = faDice;
  faInfoCircle = faInfoCircle;
  faSearch = faSearch;
  faTimesCircle = faTimesCircle;
  faUserCircle = faUserCircle;

  /**
   * Creates an instance of ProfileFormDialogComponent.
   *
   * @param {Profile} profile
   * @param {MatDialogRef<ProfileFormDialogComponent>} dialogRef
   * @param {FormBuilder} fb
   * @param {AlertService} alertService
   * @param {BoardGameGeekService} boardGameGeekService
   * @param {CountryService} countryService
   * @param {ProfileService} profileService
   * @memberof ProfileFormDialogComponent
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public profile: Profile,
    private dialogRef: MatDialogRef<ProfileFormDialogComponent>,
    private fb: FormBuilder,
    private alertService: AlertService,
    private boardGameGeekService: BoardGameGeekService,
    private countryService: CountryService,
    private profileService: ProfileService
  ) {
    this.today = new Date();
    this.createForm();
  }

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties
   *
   * @memberof ProfileFormDialogComponent
   */
  ngOnInit(): void {
    this.populateForm();

    this.countryService
      .getCountries()
      .pipe(first())
      .subscribe(
        (countries) => {
          console.log('countries', countries);
          if (countries) {
            this.countries = countries;
            this.profileForm.get('country').enable();
            this.profileForm.patchValue({
              country: this.profile.country || 'FR'
            });
          }
        },
        (error) => {
          console.log('ERROR countries', error);
        }
      );
  }

  /**
   * Initialize the form
   *
   * @private
   * @memberof ProfileFormDialogComponent
   */
  private createForm(): void {
    this.profileForm = this.fb.group({
      id: [],
      userId: [],
      name: ['', Validators.required],
      district: [],
      city: [],
      country: [{ value: '', disabled: !this.countries }, Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
      gender: [],
      birthdate: [],
      bggName: [],
      phoneNumber: [],
      website: [],
      privacy: this.fb.group({
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        birthdate: ['', Validators.required],
        bggName: ['', Validators.required],
        website: ['', Validators.required]
      })
    });
  }

  /**
   * Convenience getter for easy access to form fields
   *
   * @readonly
   * @type {{ [key: string]: AbstractControl }}
   * @memberof ProfileFormDialogComponent
   */
  get fc(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

  /**
   * Convenience getter for easy access to form value
   *
   * @readonly
   * @type {*}
   * @memberof ProfileFormDialogComponent
   */
  get fv(): any {
    return this.profileForm.value;
  }

  /**
   * Populate the form
   *
   * @private
   * @memberof ProfileFormDialogComponent
   */
  private populateForm(): void {
    if (this.profile) {
      this.profileForm.setValue({
        id: this.profile.id,
        userId: this.profile.id,
        name: this.profile.name,
        district: this.profile.district,
        city: this.profile.city,
        country: this.profile.country,
        email: this.profile.email,
        gender: this.profile.gender,
        birthdate: this.profile.birthdate ? moment(this.profile.birthdate).format() : null,
        bggName: this.profile.bggName,
        phoneNumber: this.profile.phoneNumber,
        website: this.profile.website,
        privacy: {
          email: this.profile.privacy.email,
          phoneNumber: this.profile.privacy.phoneNumber,
          birthdate: this.profile.privacy.birthdate,
          bggName: this.profile.privacy.bggName,
          website: this.profile.privacy.website
        }
      });
    }
  }

  /**
   * Prepare the entity before submit
   *
   * @private
   * @returns {Profile}
   * @memberof ProfileFormDialogComponent
   */
  private prepareSaveEntity(): Profile {
    const profileForm = this.profileForm.value;
    profileForm.birthdate = moment(profileForm.birthdate).format('YYYY-MM-DD');
    return profileForm;
  }

  /**
   * Submit event
   *
   * @memberof ProfileFormDialogComponent
   */
  public onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }
    console.log('profileForm', this.prepareSaveEntity());
    this.profileService
      .saveProfile(this.prepareSaveEntity())
      .pipe(first())
      .subscribe(
        (profileSaved) => {
          console.log('profile saved', profileSaved);
          this.alertService.open('success-save-profile');
          this.dialogRef.close(profileSaved);
        },
        (error) => {
          console.log('ERROR saving profile', error);
          this.alertService.open('error-save-profile');
        }
      );
  }

  /**
   * Close Dialog
   *
   * @memberof ProfileFormDialogComponent
   */
  public onClose(): void {
    this.dialogRef.close();
  }

  /**
   * Calls BoardGameGeek API to retrieve the games list
   *
   * @memberof ProfileFormDialogComponent
   */
  public onGetBggGames(): void {
    this.isLoadingBggGames = true;
    this.boardGameGeekService
      .getCollection(this.fv.bggName)
      .pipe(first())
      .subscribe(
        (games) => {
          this.isLoadingBggGames = false;
          console.log('games', games);
          this.games = games;
        },
        (error) => {
          this.isLoadingBggGames = false;
          console.log('ERROR get games', error);
          this.alertService.open('error-bgg-profile');
        }
      );
  }

  /**
   * OnEvent toggle a boolean control's value
   *
   * @param {AbstractControl} control
   * @memberof ProfileFormDialogComponent
   */
  public onToggleValue(control: AbstractControl): void {
    control.patchValue(!control.value);
    console.log('control', this.fv.privacy);
  }
}
