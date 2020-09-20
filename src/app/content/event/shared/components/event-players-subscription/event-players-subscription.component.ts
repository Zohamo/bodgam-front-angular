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
  public subscriptionStatus: 'accepted' | 'refused' | 'pending' | 'not-confirmed' | '';

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
      this.event = event;
      this.setSubscriptionStatus();
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
   * Set the subscription status
   *
   * @private
   * @memberof EventPlayersSubscriptionComponent
   */
  private setSubscriptionStatus(): void {
    this.subscriptionStatus = !this.event.subscription
      ? ''
      : this.event.subscription.isAccepted === true
      ? 'accepted'
      : this.event.subscription.isAccepted === false
      ? 'refused'
      : this.event.subscription.hasConfirmed
      ? 'pending'
      : 'not-confirmed';
  }

  /**
   * Prepare the EventSubscription entity before subscribe.
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
   * On event, call EventSubscriptionService to subscribe.
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
          console.log('SUBSCRIPTION OK', subscriptionRes);
          this.event.subscription = subscriptionRes;
          this.setSubscriptionStatus();
          this.alertService.open('success-event-subscription');
        },
        (error) => {
          console.log('SUBSCRIPTION ERROR', error);
          this.alertService.open('error-event-subscription');
        }
      );
  }

  /**
   * On event, call EventSubscriptionService to unsubscribe.
   *
   * @memberof EventPlayersSubscriptionComponent
   */
  public onUnsubscribe(): void {
    this.eventSubscriptionService
      .delete(this.event.subscription.eventId, this.event.subscription.userId)
      .pipe(first())
      .subscribe(
        (result) => {
          console.log('UNSUBSCRIPTION OK', result);
          this.event.subscription = null;
          this.setSubscriptionStatus();
          this.alertService.open('success-event-unsubscription');
        },
        (error) => {
          console.log('UNSUBSCRIPTION ERROR', error);
          this.alertService.open('error-event-unsubscription');
        }
      );
  }
}
