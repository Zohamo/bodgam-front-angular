import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Imports
import { EmailRegisterConfirmComponent } from '../email-register-confirm/email-register-confirm.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { SpinnerModule } from '../spinner/spinner.module';
// Declarations + Exports
import { DialogUserRegisterComponent } from './dialog-user-register.component';
// Entry Components
import { EmailRegisterConfirmModule } from '../email-register-confirm/email-register-confirm.module';

@NgModule({
  imports: [
    CommonModule,
    EmailRegisterConfirmModule,
    FontAwesomeModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  declarations: [DialogUserRegisterComponent],
  exports: [DialogUserRegisterComponent],
  entryComponents: [EmailRegisterConfirmComponent]
})
export class DialogUserRegisterModule {}
