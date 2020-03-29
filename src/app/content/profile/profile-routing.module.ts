import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '@/helpers';
import { PageNotFoundComponent } from '@/pages';

import {
  ProfileDetailPageComponent,
  ProfileEventListPageComponent,
  ProfileGameListPageComponent,
  ProfileLocationListPageComponent,
  ProfileLayoutComponent,
  ProfileListPageComponent,
  ProfileSettingsPageComponent
} from './pages';

const routes: Routes = [
  { path: 'players', component: ProfileListPageComponent },
  {
    path: 'player/:id',
    component: ProfileLayoutComponent,
    data: { name: 'read' },
    children: [
      { path: '', component: ProfileDetailPageComponent },
      { path: 'events', component: ProfileEventListPageComponent },
      { path: 'games', component: ProfileGameListPageComponent },
      { path: 'locations', component: ProfileLocationListPageComponent },
      { path: 'settings', component: ProfileSettingsPageComponent, canActivate: [AdminGuard] }
    ]
  },
  { path: 'player/**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
