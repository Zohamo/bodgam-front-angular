import { ButtonVisibilityModule } from './button-visibility/button-visibility.module';
import { DialogConfirmModule } from './dialog-confirm/dialog-confirm.module';
import { EmailRegisterConfirmModule } from './email-register-confirm/email-register-confirm.module';
import { MapModule } from './map/map.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RatingModule } from './rating/rating.module';
import { SnackBarMessageModule } from './snack-bar-message/snack-bar-message.module';
import { SpinnerModule } from './spinner/spinner.module';

export const modules: any[] = [
  ButtonVisibilityModule,
  DialogConfirmModule,
  EmailRegisterConfirmModule,
  MapModule,
  NotificationsModule,
  RatingModule,
  SnackBarMessageModule,
  SpinnerModule
];

export * from './button-visibility/button-visibility.module';
export * from './dialog-confirm/dialog-confirm.module';
export * from './email-register-confirm/email-register-confirm.module';
export * from './map/map.module';
export * from './notifications/notifications.module';
export * from './rating/rating.module';
export * from './snack-bar-message/snack-bar-message.module';
export * from './spinner/spinner.module';
