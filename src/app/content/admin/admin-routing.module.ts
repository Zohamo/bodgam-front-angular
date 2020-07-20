import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent, AdminToolsPageComponent, AdminUsersPageComponent } from './pages';
import { AdminGuard, SuperAdminGuard } from '@/helpers';

const routes: Routes = [
  {
    path: 'administration',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    data: { name: 'read' },
    children: [
      { path: '', component: AdminToolsPageComponent },
      { path: 'tools', component: AdminToolsPageComponent },
      { path: 'users', component: AdminUsersPageComponent, canActivate: [SuperAdminGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
