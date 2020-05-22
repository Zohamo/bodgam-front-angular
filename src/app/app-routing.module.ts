import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent, PageNotFoundComponent } from './pages';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: 'user/:id/email/verified', component: EmailVerificationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
