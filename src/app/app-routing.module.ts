import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent, HomePageComponent } from './pages';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'error/:code', component: ErrorPageComponent },
  { path: 'error/:code/:message', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
