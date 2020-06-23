import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent, HomePageComponent } from './pages';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'error/:code', component: ErrorPageComponent },
  { path: 'error/:code/:message', component: ErrorPageComponent },
  { path: 'user/:id/email/verified', component: EmailVerificationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
