import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';

import * as fromComponents from './components';

@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, LayoutModule, FontAwesomeModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  exports: [LayoutModule, ...fromComponents.components]
})
export class SharedModule {}
