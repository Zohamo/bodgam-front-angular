import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faCalendarAlt, faCogs, faDice, faMapMarked, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Profile } from '@/models';
import { ProfileService, UserService } from '@/services';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent {
  public profileId: number;
  public profile$: Observable<Profile>;
  public isAdmin: boolean = null;

  // Font Awesome
  faCalendarAlt = faCalendarAlt;
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
        this.isAdmin = this.userService.id === this.profileId;
        this.profileService.getProfile(this.profileId).subscribe();
        return this.profileService.currentProfile$;
      })
    );
  }
}
