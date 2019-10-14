import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EventsRoutingModule } from "./events-routing.module";
import { EventItemComponent } from "./components/event-item/event-item.component";
import { EventsPageComponent } from "./pages/events-page/events-page.component";

@NgModule({
  declarations: [EventItemComponent, EventsPageComponent],
  imports: [CommonModule, EventsRoutingModule],
  exports: [EventsPageComponent]
})
export class EventsModule {}
