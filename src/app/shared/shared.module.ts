import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import * as fromComponents from './components';
import * as fromPages from './pages';

// Modules
import { AuthModule } from '../core/components/auth/auth.module';
import { LayoutModule } from './layout/layout.module';

// UI
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [...fromComponents.components, ...fromPages.components],
  imports: [
    AuthModule,
    CommonModule,
    FontAwesomeModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [AuthModule, LayoutModule, ...fromComponents.components, ...fromPages.components]
})
export class SharedModule {}
