import { NgModule } from '@angular/core';

// Imports
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthUiModule } from './auth-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Declarations
import * as fromComponents from './components';
import * as fromPages from './pages';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, AuthUiModule, FormsModule, ReactiveFormsModule],
  declarations: [...fromComponents.components, ...fromPages.components]
})
export class AuthModule {}
