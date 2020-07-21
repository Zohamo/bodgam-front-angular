import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@/helpers';
import { EventEditPageComponent, EventListPageComponent, EventPageComponent } from './pages';

const routes: Routes = [
  { path: 'events', component: EventListPageComponent },
  {
    path: 'events/create',
    component: EventEditPageComponent,
    data: { name: 'create' },
    canActivate: [AuthGuard]
  },
  {
    path: 'events/edit/:id',
    component: EventEditPageComponent,
    data: { name: 'edit' },
    canActivate: [AuthGuard]
  },
  { path: 'events/:id', component: EventPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {}
