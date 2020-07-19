import { AdminModule } from './admin/admin.module';
import { EventModule } from './event/event.module';
import { GameModule } from './game/game.module';
import { LocationModule } from './location/location.module';
import { ProfileModule } from './profile/profile.module';

export const modules: any[] = [AdminModule, EventModule, GameModule, LocationModule, ProfileModule];

export * from './admin/admin.module';
export * from './event/event.module';
export * from './game/game.module';
export * from './location/location.module';
export * from './profile/profile.module';
