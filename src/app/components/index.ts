import { ButtonVisibilityModule } from './button-visibility/button-visibility.module';
import { DialogConfirmModule } from './dialog-confirm/dialog-confirm.module';
import { DialogUserLoginModule } from './dialog-user-login/dialog-user-login.module';
import { DialogUserRegisterModule } from './dialog-user-register/dialog-user-register.module';
import { MapModule } from './map/map.module';
import { RatingModule } from './rating/rating.module';
import { SnackBarMessageModule } from './snack-bar-message/snack-bar-message.module';
import { SpinnerModule } from './spinner/spinner.module';

export const modules: any[] = [
  ButtonVisibilityModule,
  DialogConfirmModule,
  DialogUserLoginModule,
  DialogUserRegisterModule,
  MapModule,
  RatingModule,
  SnackBarMessageModule,
  SpinnerModule
];

export * from './button-visibility/button-visibility.module';
export * from './dialog-confirm/dialog-confirm.module';
export * from './dialog-user-login/dialog-user-login.module';
export * from './dialog-user-register/dialog-user-register.module';
export * from './map/map.module';
export * from './rating/rating.module';
export * from './snack-bar-message/snack-bar-message.module';
export * from './spinner/spinner.module';
