import { EventSubscription } from './event-subscription.model';

export class EventSubscriptionGroups {
  public accepted: EventSubscription[] = [];
  public refused: EventSubscription[] = [];
  public pending: EventSubscription[] = [];
  public hesitating: EventSubscription[] = [];

  constructor(subscriptions: EventSubscription[]) {
    subscriptions.forEach((subscription) => {
      subscription.isAccepted === null
        ? subscription.hasConfirmed
          ? this.pending.push(subscription)
          : this.hesitating.push(subscription)
        : subscription.isAccepted
        ? this.accepted.push(subscription)
        : this.refused.push(subscription);
    });
  }

  /**
   * Initialize
   *
   * @private
   * @memberof EventSubscriptionGroup
   */
  private init(): void {
    this.accepted = [];
    this.refused = [];
    this.pending = [];
    this.hesitating = [];
  }

  /**
   * Populate the groups
   *
   * @param {EventSubscription[]} subscriptions
   * @memberof EventSubscriptionGroup
   */
  public populateGroups(subscriptions: EventSubscription[]): void {
    this.init();
    subscriptions.forEach((subscription) => {
      subscription.isAccepted === null
        ? subscription.hasConfirmed
          ? this.pending.push(subscription)
          : this.hesitating.push(subscription)
        : subscription.isAccepted
        ? this.accepted.push(subscription)
        : this.refused.push(subscription);
    });
  }
}
