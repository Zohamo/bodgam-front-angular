import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BggGameRepresentation, Country, ProfileFullRepresentation, User } from '@/models';
import {
  AuthenticationWebService,
  BggWebService,
  CountriesWebService,
  ProfilesWebService,
  SnackBarService
} from '@/services';
import moment from 'moment';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';

// UI
import { faCheck, faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-form-dialog',
  templateUrl: './profile-form-dialog.component.html',
  styleUrls: ['./profile-form-dialog.component.scss']
})
export class ProfileFormDialogComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  private user: User;
  public profile: ProfileFullRepresentation = new ProfileFullRepresentation();
  public profileForm: FormGroup;
  public today: Date;
  public countries: Country[];
  public games: BggGameRepresentation[];
  public isLoadingBggGames: boolean;

  // UI
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;
  faSearch = faSearch;

  /**
   * Creates an instance of ProfileFormDialogComponent.
   *
   * @param {FormBuilder} fb
   * @memberof ProfileFormDialogComponent
   */
  constructor(
    public dialogRef: MatDialogRef<ProfileFormDialogComponent>,
    private fb: FormBuilder,
    private authenticationWebService: AuthenticationWebService,
    private profilesWebService: ProfilesWebService,
    private countriesWebService: CountriesWebService,
    private bggWebService: BggWebService,
    public snackBarService: SnackBarService
  ) {
    this.user = this.authenticationWebService.currentUserValue;
    this.today = new Date();
    this.createForm();
  }

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties
   *
   * @memberof ProfileFormDialogComponent
   */
  ngOnInit(): void {
    if (this.user && this.user.id) {
      forkJoin(this.profilesWebService.getProfile(this.user.id), this.countriesWebService.getCountries())
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          ([profile, countries]) => {
            console.log('profile', profile);
            console.log('countries', countries);
            if (profile) {
              this.profile = profile;
            }
            if (countries) {
              this.countries = countries;
            }

            this.populateForm();
            this.profileForm.get('country').enable();
          },
          (error) => {
            console.log('ERROR profile, countries', error);
          }
        );
    }
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof ProfileFormDialogComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
   * @memberof ProfileFormDialogComponent
   */
  private populateForm(): void {
    if (this.user && this.profile) {
      this.profileForm.setValue({
        id: this.profile.id,
        userId: this.user.id,
        name: this.user.name || this.profile.name,
        district: this.profile.district,
        city: this.profile.city,
        country: this.profile.country,
        email: this.user.email || this.profile.email,
        gender: this.profile.gender,
        birthdate: this.profile.birthdate ? moment.unix(this.profile.birthdate).format() : null,
        bggName: this.profile.bggName,
        phoneNumber: this.profile.phoneNumber,
        privacy: {
          showEmail: this.profile.privacy.showEmail,
          showPhoneNumber: this.profile.privacy.showPhoneNumber,
          showBirthdate: this.profile.privacy.showBirthdate,
          showBggName: this.profile.privacy.showBggName
        }
      });
    }
  }

  /**
   * Prepare the entity before submit
   *
   * @private
   * @returns {ProfileFullRepresentation}
   * @memberof ProfileFormDialogComponent
   */
  private prepareSaveEntity(): ProfileFullRepresentation {
    const profileForm = this.profileForm.value;
    profileForm.birthdate = moment(profileForm.birthdate).valueOf();
    return profileForm;
  }

  /**
   * Submit event
   *
   * @memberof ProfileFormDialogComponent
   */
  public onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('profileForm', this.prepareSaveEntity());
      this.profilesWebService
        .saveProfile(this.prepareSaveEntity())
        .pipe(first())
        .subscribe(
          (profileSaved) => {
            console.log('profile saved', profileSaved);
            this.snackBarService.open('success-save-profile');
            this.dialogRef.close(profileSaved);
          },
          (error) => {
            console.log('ERROR saving profile', error);
            this.snackBarService.open('error-save-profile');
          }
        );
    }
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
    this.bggWebService
      .getCollection(this.profileForm.value.bggName)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (games) => {
          this.isLoadingBggGames = false;
          console.log('games', games);
          this.games = games;
        },
        (error) => {
          this.isLoadingBggGames = false;
          console.log('ERROR get games', error);
          this.snackBarService.open('error-bgg-profile');
        }
      );
  }

  /**
   * On click switches the control value
   *
   * @param {string} control
   * @memberof ProfileFormDialogComponent
   */
  public onSwitchControlValue(control: string): void {
    switch (control) {
      case 'showEmail':
        this.profileForm.patchValue({ privacy: { showEmail: !this.profileForm.value.privacy.showEmail } });
        break;
      case 'showPhoneNumber':
        this.profileForm.patchValue({
          privacy: { showPhoneNumber: !this.profileForm.value.privacy.showPhoneNumber }
        });
        break;
      case 'showBirthdate':
        this.profileForm.patchValue({
          privacy: { showBirthdate: !this.profileForm.value.privacy.showBirthdate }
        });
        break;
      case 'showBggName':
        this.profileForm.patchValue({
          privacy: { showBggName: !this.profileForm.value.privacy.showBggName }
        });
        break;
    }
  }
}
