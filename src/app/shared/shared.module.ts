import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';

import * as fromComponents from './components';
import { SnackBarMessageComponent } from './components/snack-bar-message/snack-bar-message.component';

@NgModule({
  declarations: [...fromComponents.components, SnackBarMessageComponent],
  imports: [CommonModule, LayoutModule, FontAwesomeModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  exports: [LayoutModule, ...fromComponents.components]
})
export class SharedModule {}
