import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  faBell,
  faCalendarAlt,
  faCalendarCheck,
  faCogs,
  faDice,
  faMapMarked,
  faUser,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { Profile, User } from '@/models';
import { ProfileService, UserService } from '@/services';
import { Observable } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent {
  public profileId: number;
  public profile$: Observable<Profile>;
  public userIsOwner: boolean;
  public userHasEmailVerified: boolean;

  // UI
  faBell = faBell;
  faCalendarAlt = faCalendarAlt;
  faCalendarCheck = faCalendarCheck;
  faCogs = faCogs;
  faDice = faDice;
  faMapMarked = faMapMarked;
  faUser = faUser;
  faUserCircle = faUserCircle;

  /**
   * Creates an instance of ProfileLayoutComponent.
   *
   * @param {ActivatedRoute} route
   * @param {ProfileService} profileService
   * @param {UserService} userService
   * @memberof ProfileLayoutComponent
   */
  constructor(private route: ActivatedRoute, private profileService: ProfileService, private userService: UserService) {
    this.profile$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.profileId = +params.get('id');
        this.userService.currentUser$.subscribe((user: User) => {
          if (user) {
            this.userIsOwner = user.id === this.profileId;
            this.userHasEmailVerified = user.emailVerified;
          }
        });
        this.profileService
          .getProfile(this.profileId)
          .pipe(first())
          .subscribe();
        return this.profileService.currentProfile$;
      })
    );
  }
}
