import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileService, BoardGameGeekService } from '@/services';
import { BggGameRepresentation } from '@/models';

@Component({
  selector: 'app-profile-game-list-page',
  templateUrl: './profile-game-list-page.component.html',
  styleUrls: ['./profile-game-list-page.component.scss']
})
export class ProfileGameListPageComponent {
  public profileBggName: string;
  public games$: Observable<BggGameRepresentation[]>;

  /**
   * Creates an instance of ProfileGameListPageComponent.
   *
   * @param {BoardGameGeekService} boardGameGeekService
   * @param {ProfileService} profileService
   * @memberof ProfileGameListPageComponent
   */
  constructor(private boardGameGeekService: BoardGameGeekService, private profileService: ProfileService) {
    this.profileBggName = this.profileService.value.bggName;
    this.games$ = this.boardGameGeekService.getCollection(this.profileBggName);
  }
}
