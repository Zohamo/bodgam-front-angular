import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventListItemComponent } from './event-list/event-list-item/event-list-item.component';
import { EventFormModule } from './event-form.module';

export const components: any[] = [EventDetailComponent, EventListComponent, EventListItemComponent];
export const modules: any[] = [EventFormModule];

export * from './event-detail/event-detail.component';
export * from './event-list/event-list.component';
export * from './event-list/event-list-item/event-list-item.component';
