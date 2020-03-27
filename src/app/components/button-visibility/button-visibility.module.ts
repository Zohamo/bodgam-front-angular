import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonVisibilityComponent } from './button-visibility.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [ButtonVisibilityComponent],
  exports: [ButtonVisibilityComponent]
})
export class ButtonVisibilityModule {}
