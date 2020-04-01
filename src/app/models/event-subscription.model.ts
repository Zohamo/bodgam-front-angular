import { Profile } from './profile.model';

export class EventSubscription {
  public isAccepted: boolean;
  public hasConfirmed: boolean;
  public eventId: number;
  public userId: number;
  public profile?: Profile;

  constructor(eventId: number, userId: number, hasConfirmed: boolean = null) {
    this.isAccepted = null;
    this.hasConfirmed = hasConfirmed;
    this.eventId = eventId;
    this.userId = userId;
  }
}
