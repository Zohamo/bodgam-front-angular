import { EventsModule } from './events/events.module';
import { GamesModule } from './games/games.module';
import { LocationsModule } from './locations/locations.module';
import { ProfilesModule } from './profiles/profiles.module';

export const modules: any[] = [EventsModule, GamesModule, LocationsModule, ProfilesModule];

export * from './events/events.module';
export * from './games/games.module';
export * from './locations/locations.module';
export * from './profiles/profiles.module';
