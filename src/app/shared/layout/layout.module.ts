import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from './header/header.component';

// Entry Components
import { LoginFormDialogComponent } from '@core/components/auth/login-form-dialog/login-form-dialog.component';
import { RegisterFormDialogComponent } from '@core/components/auth/register-form-dialog/register-form-dialog.component';

// UI
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';

const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent, RouterModule],
  entryComponents: [LoginFormDialogComponent, RegisterFormDialogComponent]
})
export class LayoutModule {}
