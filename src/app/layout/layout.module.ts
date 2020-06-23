import { NgModule } from '@angular/core';
// Imports
import { CommonModule } from '@angular/common';
import { DialogUserLoginModule, DialogUserRegisterModule } from '@/components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
// Declarations
import { HeaderComponent } from './header/header.component';
// Entry Components
import { PasswordForgotDialogComponent } from '@/auth/components';
import { DialogUserLoginComponent } from '@/components/dialog-user-login/dialog-user-login.component';
import { DialogUserRegisterComponent } from '@/components/dialog-user-register/dialog-user-register.component';
import { SnackBarMessageComponent } from '@/components/snack-bar-message/snack-bar-message.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    DialogUserLoginModule,
    DialogUserRegisterModule,
    FontAwesomeModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterModule
  ],
  declarations: [HeaderComponent, FooterComponent],
  entryComponents: [
    DialogUserLoginComponent,
    DialogUserRegisterComponent,
    PasswordForgotDialogComponent,
    SnackBarMessageComponent
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class LayoutModule {}
