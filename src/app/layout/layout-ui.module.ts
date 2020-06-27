import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [FontAwesomeModule, MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatTooltipModule],
  exports: [FontAwesomeModule, MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatTooltipModule]
})
export class LayoutUiModule {}
