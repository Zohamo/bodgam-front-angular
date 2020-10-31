import { Component, Input } from '@angular/core';
import { faQuestion, faThumbsDown, faThumbsUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { EventBg, EventSubscription } from '@/models';
import { AlertService, EventSubscriptionService } from '@/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-event-players-subscription',
  templateUrl: './event-players-subscription.component.html',
  styleUrls: ['./event-players-subscription.component.scss']
})
export class EventPlayersSubscriptionComponent {
  public eventSubscription: EventSubscription;
  public subscriptionStatus: 'accepted' | 'refused' | 'pending' | 'not-confirmed' | '' = '';

  // Font Awesome
  faQuestion = faQuestion;
  faThumbsDown = faThumbsDown;
  faThumbsUp = faThumbsUp;
  faTimes = faTimes;

  /**
   * Inputs
   */

  @Input() userId: number;

  public event: EventBg;
  @Input() set setEvent(event: EventBg) {
    if (event) {
      if (this.event && event.subscription !== this.event.subscription) {
        this.eventSubscriptionService.get(this.event.id, this.userId).subscribe((subscription: EventSubscription) => {
          event.subscription = subscription;
          this.event = event;
          this.setSubscriptionStatus(subscription);
        });
      } else {
        this.event = event;
        this.setSubscriptionStatus(event.subscription);
      }
    }
  }

  /**
   * Creates an instance of EventPlayersSubscriptionComponent.
   *
   * @param {AlertService} alertService
   * @param {EventSubscriptionService} eventSubscriptionService
   * @memberof EventPlayersSubscriptionComponent
   */
  constructor(private alertService: AlertService, private eventSubscriptionService: EventSubscriptionService) {}

  /**
   * Sets the subscription status.
   *
   * @private
   * @param {EventSubscription} subscription
   * @memberof EventPlayersSubscriptionComponent
   */
  private setSubscriptionStatus(subscription: EventSubscription): void {
    if (subscription && Object.keys(subscription).length) {
      this.subscriptionStatus =
        subscription.isAccepted === true
          ? 'accepted'
          : subscription.isAccepted === false
          ? 'refused'
          : subscription.hasConfirmed
          ? 'pending'
          : 'not-confirmed';
    }
  }

  /**
   * Prepares the EventSubscription entity before subscription.
   *
   * @private
   * @param {boolean} hasConfirmed
   * @returns {EventSubscription}
   * @memberof EventPlayersSubscriptionComponent
   */
  private prepareSubscription(hasConfirmed: boolean): EventSubscription {
    return new EventSubscription(this.event.id, this.userId, hasConfirmed);
  }

  /**
   * On event, calls EventSubscriptionService to subscribe the user to the event.
   *
   * @param {boolean} hasConfirmed
   * @memberof EventPlayersSubscriptionComponent
   */
  public onSubscribe(hasConfirmed: boolean): void {
    this.eventSubscriptionService
      .save(this.prepareSubscription(hasConfirmed))
      .pipe(first())
      .subscribe(
        (subscriptionRes: EventSubscription) => {
          this.event.subscription = subscriptionRes;
          this.setSubscriptionStatus(subscriptionRes);
          this.alertService.open('success-event-subscription');
        },
        (error) => {
          this.alertService.open('error-event-subscription');
        }
      );
  }

  /**
   * On event, calls EventSubscriptionService to unsubscribe the user to the event.
   *
   * @memberof EventPlayersSubscriptionComponent
   */
  public onUnsubscribe(): void {
    this.eventSubscriptionService
      .delete(this.event.subscription.eventId, this.event.subscription.userId)
      .pipe(first())
      .subscribe(
        (result) => {
          this.event.subscription = null;
          this.subscriptionStatus = '';
          this.alertService.open('success-event-unsubscription');
        },
        (error) => {
          this.alertService.open('error-event-unsubscription');
        }
      );
  }
}
