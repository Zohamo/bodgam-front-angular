import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { SharedComponentsModule } from './components/shared-components.module';
import { UiModule } from './ui/ui.module';

@NgModule({
  imports: [CommonModule, LayoutModule, SharedComponentsModule, UiModule],
  exports: [LayoutModule, SharedComponentsModule, UiModule]
})
export class SharedModule {}
