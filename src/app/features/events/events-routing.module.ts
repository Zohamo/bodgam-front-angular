import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventsPageComponent } from "./pages/events-page/events-page.component";

const routes: Routes = [{ path: "events", component: EventsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
