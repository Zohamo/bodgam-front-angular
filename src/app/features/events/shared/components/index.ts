import { EventAtmosphereComponent } from './event-atmosphere/event-atmosphere.component';
import { EventLevelComponent } from './event-level/event-level.component';
import { EventLocationModule } from './event-location.module';
import { EventPlayersComponent } from './event-players/event-players.component';
import { EventTimeslotModule } from './event-timeslot.module';

export const components: any[] = [EventAtmosphereComponent, EventLevelComponent, EventPlayersComponent];
export const modules: any[] = [EventLocationModule, EventTimeslotModule];

export * from './event-atmosphere/event-atmosphere.component';
export * from './event-level/event-level.component';
