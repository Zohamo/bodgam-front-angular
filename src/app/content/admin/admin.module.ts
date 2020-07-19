import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Imports
import { AdminRoutingModule } from './admin-routing.module';
import { AdminUiModule } from './admin-ui.module';
// Declarations
import * as fromComponents from './components';
import * as fromPages from './pages';
// Entry Components
import { PingComponent } from './components';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, AdminUiModule],
  declarations: [...fromComponents.components, ...fromPages.components],
  entryComponents: [PingComponent]
})
export class AdminModule {}
