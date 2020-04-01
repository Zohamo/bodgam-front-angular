import { Component, Input } from '@angular/core';
import {
  faMinus,
  faPlus,
  faQuestion,
  faThumbsDown,
  faThumbsUp,
  faTimes,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { EventSubscription, EventSubscriptionGroups } from '@/models';
import { EventSubscriptionService, AlertService } from '@/services';
import { first } from 'rxjs/operators';

/**
 * Event Players Administration Component
 *
 * @export
 * @class EventPlayersAdministrationComponent
 */
@Component({
  selector: 'app-event-players-administration',
  templateUrl: './event-players-administration.component.html',
  styleUrls: ['./event-players-administration.component.scss']
})
export class EventPlayersAdministrationComponent {
  public subscriptionGroups: EventSubscriptionGroups;

  // Font Awesome
  faMinus = faMinus;
  faPlus = faPlus;
  faQuestion = faQuestion;
  faThumbsDown = faThumbsDown;
  faThumbsUp = faThumbsUp;
  faTimes = faTimes;
  faUsers = faUsers;

  /**
   * Inputs
   */

  public subscriptions: EventSubscription[];
  @Input() set setSubscriptions(subscriptions: EventSubscription[]) {
    if (subscriptions) {
      console.log('input subscriptions', subscriptions);
      this.subscriptions = subscriptions;
      this.subscriptionGroups = new EventSubscriptionGroups(subscriptions);
    }
  }

  /**
   * Creates an instance of EventPlayersAdministrationComponent.
   *
   * @param {AlertService} alertService
   * @param {EventSubscriptionService} eventSubscriptionService
   * @memberof EventPlayersAdministrationComponent
   */
  constructor(private alertService: AlertService, private eventSubscriptionService: EventSubscriptionService) {}

  /**
   * On event, edit the Profile's Subscription
   *
   * @param {EventSubscription} eventSubscription
   * @param {boolean} [isAccepted=false]
   * @memberof EventPlayersAdministrationComponent
   */
  public onConfirm(eventSubscription: EventSubscription, isAccepted = false): void {
    console.log('onConfirm', eventSubscription);
    this.eventSubscriptionService
      .save(Object.assign(eventSubscription, { isAccepted }))
      .pipe(first())
      .subscribe(
        (subscription: EventSubscription) => {
          console.log('CONFIRM SUBSCRIPTION OK', subscription);
          this.updateSubscriptionItem(subscription);
          this.alertService.open(
            `success-event-administration-${isAccepted ? 'accept' : 'refuse'}`,
            subscription.profile.name
          );
        },
        (error) => {
          console.log('CONFIRM SUBSCRIPTION ERROR', error);
          this.alertService.open(
            `error-event-administration-${isAccepted ? 'accept' : 'refuse'}`,
            eventSubscription.profile.name
          );
        }
      );
  }

  /**
   * Update EventSubscription item in list.
   *
   * @private
   * @param {EventSubscription} subscription
   * @memberof EventPlayersAdministrationComponent
   */
  private updateSubscriptionItem(subscription: EventSubscription): void {
    this.subscriptions[this.subscriptions.findIndex((item) => item.userId === subscription.userId)] = subscription;
    this.subscriptionGroups = new EventSubscriptionGroups(this.subscriptions);
  }

  /**
   * Identify items in ngFor
   *
   * @memberof EventPlayersAdministrationComponent
   */
  public trackByUserId(index, subscription): number {
    return subscription.userId;
  }
}
