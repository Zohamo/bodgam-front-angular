import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, OwnerGuard } from '@/helpers';
import { ErrorPageComponent } from '@/pages';

import {
  ProfileAgendaPageComponent,
  ProfileDetailPageComponent,
  ProfileEventListPageComponent,
  ProfileGameListPageComponent,
  ProfileLocationListPageComponent,
  ProfileLayoutComponent,
  ProfileListPageComponent,
  ProfileNotificationsPageComponent,
  ProfileSettingsPageComponent
} from './pages';
import { OwnerOrAuthGuard } from '@/helpers/guards/owner-or-auth.guard';

const routes: Routes = [
  { path: 'players', component: ProfileListPageComponent, canActivate: [AuthGuard] },
  {
    path: 'player/:id',
    component: ProfileLayoutComponent,
    data: { name: 'read' },
    canActivate: [OwnerOrAuthGuard],
    children: [
      { path: '', component: ProfileDetailPageComponent },
      { path: 'agenda', component: ProfileAgendaPageComponent, canActivate: [OwnerGuard] },
      { path: 'events', component: ProfileEventListPageComponent },
      { path: 'games', component: ProfileGameListPageComponent },
      { path: 'locations', component: ProfileLocationListPageComponent },
      { path: 'notifications', component: ProfileNotificationsPageComponent },
      { path: 'settings', component: ProfileSettingsPageComponent, canActivate: [OwnerGuard] }
    ]
  },
  { path: 'player/**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
