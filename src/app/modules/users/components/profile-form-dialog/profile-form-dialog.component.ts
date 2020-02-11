import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { forkJoin, Subject } from 'rxjs';

// Models
import { UserFullRepresentation } from '../../models/user-full-representation.model';
import { Country } from '@shared/models/country.model';
import { BggGameRepresentation } from '@shared/models/bgg/bgg-game-representation.model';

// Services
import { BggWebService } from '@shared/services/bgg-web.service';
import { CountriesWebService } from '@shared/services/countries-web.service';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { UsersWebService } from '../../services/users-web.service';

// UI
import { faCheck, faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-form-dialog',
  templateUrl: './profile-form-dialog.component.html',
  styleUrls: ['./profile-form-dialog.component.scss']
})
export class ProfileFormDialogComponent implements OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public user: UserFullRepresentation;
  public userForm: FormGroup;
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private usersWebService: UsersWebService,
    private countriesWebService: CountriesWebService,
    private bggWebService: BggWebService,
    public snackBarService: SnackBarService
  ) {
    this.today = new Date();
    this.createForm();

    console.log('data', data);
    forkJoin(this.usersWebService.getUser(data.id), this.countriesWebService.getCountries())
      .pipe(takeUntil(this.destroy$))
      .subscribe(([user, countries]) => {
        console.log('user', user);
        console.log('countries', countries);
        this.user = user;
        this.countries = countries;

        this.populateForm();
        this.userForm.get('country').enable();
      });
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
   * @memberof ProfileFormDialogComponent
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
   * @memberof ProfileFormDialogComponent
   */
  private prepareSaveEntity(): UserFullRepresentation {
    const userForm = this.userForm.value;
    userForm.birthdate = moment(userForm.birthdate).valueOf();
    return userForm;
  }

  /**
   * Submit event
   *
   * @memberof ProfileFormDialogComponent
   */
  public onSubmit(): void {
    if (this.userForm.valid) {
      console.log('userForm', this.prepareSaveEntity());
      this.usersWebService
        .saveUser(this.prepareSaveEntity())
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (profileSaved) => {
            console.log('profile saved', profileSaved);
            this.snackBarService.open('success-save-profile');
            this.dialogRef.close(profileSaved);
          },
          (error) => {
            console.log('ERROR saving profile', error);
            this.snackBarService.open('fail-save-profile');
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
      .getCollection(this.userForm.value.bggName)
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
          this.snackBarService.open('fail-bgg-user');
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
        this.userForm.patchValue({ privacy: { showEmail: !this.userForm.value.privacy.showEmail } });
        break;
      case 'showPhoneNumber':
        this.userForm.patchValue({
          privacy: { showPhoneNumber: !this.userForm.value.privacy.showPhoneNumber }
        });
        break;
      case 'showBirthdate':
        this.userForm.patchValue({
          privacy: { showBirthdate: !this.userForm.value.privacy.showBirthdate }
        });
        break;
      case 'showBggName':
        this.userForm.patchValue({
          privacy: { showBggName: !this.userForm.value.privacy.showBggName }
        });
        break;
    }
  }
}
