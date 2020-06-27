import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordResetPageComponent } from './pages/password-reset-page/password-reset-page.component';
import { EmailVerificationPageComponent } from './pages';

const routes: Routes = [
  {
    path: 'auth/password/reset/:token',
    component: PasswordResetPageComponent
  },
  { path: 'user/:id/email/verified', component: EmailVerificationPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
