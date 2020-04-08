import { LocationItem, ProfileItem } from '@/models';
import moment from 'moment';
import { EventSubscription } from './event-subscription.model';

export class EventBg {
  id: number;
  title: string;
  isPrivate: boolean;
  // Datetime
  startDatetime: moment.Moment;
  endDatetime: moment.Moment;
  // Location
  location: LocationItem;
  // Players
  host: ProfileItem;
  subscription: EventSubscription; // the current User Subscription
  subscriptions: EventSubscription[]; // all the current Subscriptions for the Host to administrate
  players: ProfileItem[]; // all the Users with subscription.isAccepted = true
  minPlayers: number;
  maxPlayers: number;
  // Details
  description: string;
  level: number;
  atmosphere: number;

  constructor() {
    this.id = null;
    this.title = '';
    this.isPrivate = false;
    // Datetime
    this.startDatetime = moment()
      .add(1, 'h')
      .minutes(0);
    this.endDatetime = null;
    // Location
    this.location = null;
    // Players
    this.host = null;
    this.subscription = null;
    this.players = [];
    this.minPlayers = 1;
    this.maxPlayers = 4;
    // Details
    this.description = '';
    this.level = 0;
    this.atmosphere = 2;
  }
}
