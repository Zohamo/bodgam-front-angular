import { EventAtmosphereComponent } from './event-atmosphere/event-atmosphere.component';
import { EventDateComponent } from './event-date/event-date.component';
import { EventLevelComponent } from './event-level/event-level.component';
import { EventLocationComponent } from './event-location/event-location.component';
import { EventPlayersComponent } from './event-players/event-players.component';
import { EventTimeslotComponent } from './event-timeslot/event-timeslot.component';

export const components: any[] = [
  EventAtmosphereComponent,
  EventDateComponent,
  EventLevelComponent,
  EventLocationComponent,
  EventPlayersComponent,
  EventTimeslotComponent
];

export * from './event-atmosphere/event-atmosphere.component';
export * from './event-date/event-date.component';
export * from './event-level/event-level.component';
export * from './event-location/event-location.component';
export * from './event-players/event-players.component';
export * from './event-timeslot/event-timeslot.component';
