import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormModule } from './event-form.module';

export const components: any[] = [EventDetailComponent, EventListComponent];
export const modules: any[] = [EventFormModule];

export * from './event-detail/event-detail.component';
export * from './event-list/event-list.component';
