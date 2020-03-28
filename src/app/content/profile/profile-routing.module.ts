import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '@/pages';
import { ProfilePageComponent, ProfilesPageComponent } from './pages';

const routes: Routes = [
  { path: 'players', component: ProfilesPageComponent, data: { name: 'list' } },
  { path: 'players/:id', component: ProfilePageComponent, data: { name: 'read' } },
  { path: 'players/**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
