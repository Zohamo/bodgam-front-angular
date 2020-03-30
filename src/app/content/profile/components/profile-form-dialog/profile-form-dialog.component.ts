import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BggGame, Country, Profile } from '@/models';
import { BoardGameGeekService, CountryService, ProfileService, SnackBarService } from '@/services';
import moment from 'moment';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

// UI
import { faCheck, faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-form-dialog',
  templateUrl: './profile-form-dialog.component.html',
  styleUrls: ['./profile-form-dialog.component.scss']
})
export class ProfileFormDialogComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  // private user: User;
  // public profile: Profile = new Profile();
  public profileForm: FormGroup;
  public today: Date;
  public countries: Country[];
  public games: BggGame[];
  public isLoadingBggGames: boolean;

  // UI
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;
  faSearch = faSearch;

  /**
   * Creates an instance of ProfileFormDialogComponent.
   *
   * @param {MatDialogRef<ProfileFormDialogComponent>} dialogRef
   * @param {FormBuilder} fb
   * @param {ProfileService} profileService
   * @param {CountryService} countryService
   * @param {BoardGameGeekService} boardGameGeekService
   * @param {SnackBarService} snackBarService
   * @memberof ProfileFormDialogComponent
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public profile: Profile,
    private dialogRef: MatDialogRef<ProfileFormDialogComponent>,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private countryService: CountryService,
    private boardGameGeekService: BoardGameGeekService,
    private snackBarService: SnackBarService
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
        email: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        birthdate: ['', Validators.required],
        bggName: ['', Validators.required]
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
        privacy: {
          email: this.profile.privacy.email,
          phoneNumber: this.profile.privacy.phoneNumber,
          birthdate: this.profile.privacy.birthdate,
          bggName: this.profile.privacy.bggName
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
      this.profileService
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
    this.boardGameGeekService
      .getCollection(this.profileForm.value.bggName)
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
      case 'email':
        this.profileForm.patchValue({ privacy: { email: !this.profileForm.value.privacy.email } });
        break;
      case 'phoneNumber':
        this.profileForm.patchValue({
          privacy: { phoneNumber: !this.profileForm.value.privacy.phoneNumber }
        });
        break;
      case 'birthdate':
        this.profileForm.patchValue({
          privacy: { birthdate: !this.profileForm.value.privacy.birthdate }
        });
        break;
      case 'bggName':
        this.profileForm.patchValue({
          privacy: { bggName: !this.profileForm.value.privacy.bggName }
        });
        break;
    }
  }
}
