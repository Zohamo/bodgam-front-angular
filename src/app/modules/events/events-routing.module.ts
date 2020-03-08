import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { EventEditPageComponent } from './pages/event-edit-page/event-edit-page.component';
import { PageNotFoundComponent } from '@shared/pages/page-not-found/page-not-found.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { HasProfileGuard } from '@core/guards/has-profile.guard';

const routes: Routes = [
  { path: 'events', component: EventsPageComponent, data: { name: 'listAll' } },
  { path: 'players/:id/events', component: EventsPageComponent, data: { name: 'userList' } },
  {
    path: 'events/create',
    component: EventEditPageComponent,
    data: { name: 'create' },
    canActivate: [HasProfileGuard]
  },
  {
    path: 'events/edit/:id',
    component: EventEditPageComponent,
    data: { name: 'edit' },
    canActivate: [HasProfileGuard]
  },
  { path: 'events/:id', component: EventPageComponent, data: { name: 'read' } },
  { path: 'events/**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
