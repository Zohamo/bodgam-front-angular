import { NgModule } from '@angular/core';
// Imports
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutUiModule } from './layout-ui.module';
// Declarations
import * as fromComponents from './components';
// Entry Components
import {
  PasswordForgotDialogComponent,
  UserLoginDialogComponent,
  UserRegisterDialogComponent
} from '@/auth/components';
import { SnackBarMessageComponent } from '@/components/snack-bar-message/snack-bar-message.component';

@NgModule({
  imports: [CommonModule, RouterModule, LayoutUiModule],
  declarations: [...fromComponents.components],
  entryComponents: [
    PasswordForgotDialogComponent,
    SnackBarMessageComponent,
    UserLoginDialogComponent,
    UserRegisterDialogComponent
  ],
  exports: [...fromComponents.components]
})
export class LayoutModule {}
