import { ButtonVisibilityModule } from './button-visibility/button-visibility.module';
import { DialogConfirmModule } from './dialog-confirm/dialog-confirm.module';
import { DialogUserLoginModule } from './dialog-user-login/dialog-user-login.module';
import { DialogUserRegisterModule } from './dialog-user-register/dialog-user-register.module';
import { EmailRegisterConfirmModule } from './email-register-confirm/email-register-confirm.module';
import { EmailVerificationModule } from './email-verification/email-verification.module';
import { MapModule } from './map/map.module';
import { RatingModule } from './rating/rating.module';
import { SnackBarMessageModule } from './snack-bar-message/snack-bar-message.module';
import { SpinnerModule } from './spinner/spinner.module';

export const modules: any[] = [
  ButtonVisibilityModule,
  DialogConfirmModule,
  DialogUserLoginModule,
  DialogUserRegisterModule,
  EmailRegisterConfirmModule,
  EmailVerificationModule,
  MapModule,
  RatingModule,
  SnackBarMessageModule,
  SpinnerModule
];

export * from './button-visibility/button-visibility.module';
export * from './dialog-confirm/dialog-confirm.module';
export * from './dialog-user-login/dialog-user-login.module';
export * from './dialog-user-register/dialog-user-register.module';
export * from './email-register-confirm/email-register-confirm.module';
export * from './email-verification/email-verification.module';
export * from './map/map.module';
export * from './rating/rating.module';
export * from './snack-bar-message/snack-bar-message.module';
export * from './spinner/spinner.module';
