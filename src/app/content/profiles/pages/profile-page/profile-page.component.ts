import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  BggGameRepresentation,
  EventRepresentation,
  LocationRepresentation,
  ProfileFullRepresentation,
  ProfilePrivacyRepresentation
} from '@/models';
import {
  AlertService,
  UserService,
  BoardGameGeekService,
  EventService,
  LocationService,
  ProfileService
} from '@/services';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, first } from 'rxjs/operators';

// Components
import { ProfileFormDialogComponent } from '../../components';

// UI
import { faCalendarAlt, faCogs, faDice, faMapMarked, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public profileId: number;
  public profile$: Observable<ProfileFullRepresentation>;
  public games: BggGameRepresentation[] = null;
  public events: EventRepresentation[];
  public locations: LocationRepresentation[];
  // TODO : profile comments
  public comments: any[];

  // Booleans
  public isAdmin: boolean = null;
  public hasProfile: boolean = null;
  public isLoadingGames: boolean = null;
  public isLoadingEvents = true;
  public isLoadingLocations = true;

  // Font Awesome
  faCalendarAlt = faCalendarAlt;
  faCogs = faCogs;
  faDice = faDice;
  faMapMarked = faMapMarked;
  faUser = faUser;
  faUserCircle = faUserCircle;

  /**
   * Creates an instance of ProfilePageComponent.
   *
   * @param {ActivatedRoute} route
   * @param {ProfileService} profileService
   * @param {BoardGameGeekService} boardGameGeekService
   * @memberof ProfilePageComponent
   */
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private userService: UserService,
    private boardGameGeekService: BoardGameGeekService,
    private eventService: EventService,
    private locationService: LocationService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) {}

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties
   *
   * @memberof ProfilePageComponent
   */
  ngOnInit(): void {
    this.getProfile();

    this.profile$.pipe(takeUntil(this.destroy$)).subscribe(
      (profile: ProfileFullRepresentation) => {
        console.log('SUBSCRIBE profile', profile);
        this.hasProfile = Boolean(profile);
        if (profile) {
          if (profile.bggName) {
            this.isLoadingGames = true;
            this.getGames(profile.bggName);
          }
          if (profile.id) {
            this.getEvents(profile.id);
            this.getLocations();
          }
        }
      },
      (error) => {
        console.log('ERROR profile subscribe', error);
      }
    );

    console.log('isAdmin & hasProfile', this.isAdmin, this.hasProfile);
  }

  /**
   * Unsubscribe before component is destroyed
   *
   * @memberof ProfilePageComponent
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Get the profile's data
   *
   * @private
   * @memberof ProfilePageComponent
   */
  private getProfile(): void {
    this.profile$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.profileId = +params.get('id');
        this.isAdmin = this.userService.id === this.profileId;
        return this.profileService.getProfile(this.profileId);
      })
    );
  }

  /**
   * Opens the profile form dialog
   *
   * @memberof ProfilePageComponent
   */
  public openProfileFormDialog(): void {
    this.dialog.open(ProfileFormDialogComponent, {
      data: { id: this.profileId }
    });
  }

  /**
   * Call BGG API to retrieve the profile's games list
   *
   * @private
   * @param {string} bggName
   * @memberof ProfilePageComponent
   */
  private getGames(bggName: string): void {
    this.boardGameGeekService
      .getCollection(bggName)
      .pipe(first())
      .subscribe(
        (games: BggGameRepresentation[]) => {
          this.games = games && games.length > 0 ? games : null;
          this.isLoadingGames = false;
        },
        (error: HttpErrorResponse) => {
          console.log('bgg getCollection error', error);
          this.isLoadingGames = false;
        }
      );
  }

  /**
   * Get the profile's event list from the web service
   *
   * @private
   * @param {number} profileId
   * @memberof ProfilePageComponent
   */
  private getEvents(profileId: number): void {
    this.eventService
      .getEvents(profileId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (events) => {
          this.events = events && events.length > 0 ? events : null;
          this.isLoadingEvents = false;
        },
        (error: HttpErrorResponse) => {
          console.log('getEvents error', error);
          this.isLoadingEvents = false;
        }
      );
  }

  /**
   * Get the profile's location list from the web service
   *
   * @private
   * @memberof ProfilePageComponent
   */
  private getLocations(): void {
    this.locationService
      .getLocations(this.profileId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (locations) => {
          this.locations = locations && locations.length > 0 ? locations : null;
          this.isLoadingLocations = false;
        },
        (error: HttpErrorResponse) => {
          console.log('getLocations error', error);
          this.isLoadingLocations = false;
        }
      );
  }

  /**
   * Edit the profile's data through the web service
   *
   * @param {ProfileFullRepresentation} profile
   * @memberof ProfilePageComponent
   */
  public saveProfile(profile: ProfileFullRepresentation): void {
    this.profile$ = this.profileService.saveProfile(profile).pipe(takeUntil(this.destroy$));
  }

  /**
   * Edit the profile's privacy through the web service
   *
   * @param {ProfilePrivacyRepresentation} privacy
   * @memberof ProfilePageComponent
   */
  public saveProfilePrivacy(privacy: ProfilePrivacyRepresentation): void {
    this.profileService
      .saveProfilePrivacy(this.profileId, privacy)
      .pipe(first())
      .subscribe(
        (privacyResponse: ProfilePrivacyRepresentation) => {
          console.log('saveProfilePrivacy OK', privacyResponse);
          this.alertService.open('success-save-profile');
        },
        (error: HttpErrorResponse) => {
          console.log('saveProfilePrivacy ERROR', error);
          this.alertService.open('error-save-profile');
        }
      );
  }

  /**
   * Delete the profile through the web service
   *
   * @memberof ProfilePageComponent
   */
  public deleteProfile(): void {
    if (this.isAdmin) {
      this.userService
        .deleteUser(this.profileId)
        .pipe(first())
        .subscribe(
          (response) => {
            console.log('deleteProfile OK', response);
            this.alertService.open('success-delete-profile');
            this.userService.logout();
          },
          (error: HttpErrorResponse) => {
            console.log('deleteProfile ERROR', error);
            this.alertService.open('error-delete-profile');
          }
        );
    }
  }
}
