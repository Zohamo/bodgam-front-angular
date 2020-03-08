import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesPageComponent } from './pages/profiles-page/profiles-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { PageNotFoundComponent } from '@shared/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'players', component: ProfilesPageComponent, data: { name: 'list' } },
  { path: 'players/:id', component: ProfilePageComponent, data: { name: 'read' } },
  { path: 'players/**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule {}
