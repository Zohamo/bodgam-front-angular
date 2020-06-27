import { NgModule } from '@angular/core';
// Imports
import { CommonModule } from '@angular/common';
import { LayoutUiModule } from './layout-ui.module';
import { RouterModule } from '@angular/router';
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
  imports: [CommonModule, LayoutUiModule, RouterModule],
  declarations: [...fromComponents.components],
  entryComponents: [
    PasswordForgotDialogComponent,
    UserLoginDialogComponent,
    UserRegisterDialogComponent,
    SnackBarMessageComponent
  ],
  exports: [...fromComponents.components]
})
export class LayoutModule {}
