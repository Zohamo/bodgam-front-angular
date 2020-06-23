import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordResetPageComponent } from './pages/password-reset-page/password-reset-page.component';

const routes: Routes = [
  {
    path: 'auth/password/reset/:token',
    component: PasswordResetPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
