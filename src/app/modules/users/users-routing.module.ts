import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { PageNotFoundComponent } from '@shared/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'players', component: UsersPageComponent, data: { name: 'list' } },
  { path: 'players/:id', component: UserPageComponent, data: { name: 'read' } },
  { path: 'players/**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
