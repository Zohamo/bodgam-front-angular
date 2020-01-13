import { EventsModule } from './events/events.module';
import { GamesModule } from './games/games.module';
import { LocationsModule } from './locations/locations.module';
import { UsersModule } from './users/users.module';

export const modules: any[] = [EventsModule, GamesModule, LocationsModule, UsersModule];

export * from './events/events.module';
export * from './games/games.module';
export * from './locations/locations.module';
export * from './users/users.module';
