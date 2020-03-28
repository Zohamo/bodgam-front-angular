import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationsPageComponent } from './pages/locations-page/locations-page.component';

const routes: Routes = [{ path: 'locations', component: LocationsPageComponent, data: { name: 'list' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {}
