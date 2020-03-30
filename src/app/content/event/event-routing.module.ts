import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventEditPageComponent, EventListPageComponent, EventPageComponent } from './pages';

const routes: Routes = [
  { path: 'events', component: EventListPageComponent },
  {
    path: 'events/create',
    component: EventEditPageComponent,
    data: { name: 'create' }
  },
  {
    path: 'events/edit/:id',
    component: EventEditPageComponent,
    data: { name: 'edit' }
  },
  { path: 'events/:id', component: EventPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {}
