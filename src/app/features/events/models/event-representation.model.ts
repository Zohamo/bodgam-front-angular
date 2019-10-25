import { UserRepresentation } from '../../users/models/user-representation.model';
import { LocationRepresentation } from '../../locations/models/location-representation.model';
import moment from 'moment';

export class EventRepresentation {
  id: number;
  title: string;
  // Datetime
  startDatetime: number;
  endDatetime: number;
  // Location
  location: LocationRepresentation;
  // Players
  host: UserRepresentation;
  players: UserRepresentation[];
  minPlayers: number;
  maxPlayers: number;
  // Details
  description: string;
  level: number;
  atmosphere: number;

  constructor() {
    this.id = null;
    this.title = '';
    // Datetime
    this.startDatetime = moment()
      .add(1, 'h')
      .minutes(0)
      .unix();
    this.endDatetime = null;
    // Location
    this.location = null;
    // Players
    this.host = null;
    this.players = [];
    this.minPlayers = 1;
    this.maxPlayers = 4;
    // Details
    this.description = '';
    this.level = 0;
    this.atmosphere = 0;
  }
}
