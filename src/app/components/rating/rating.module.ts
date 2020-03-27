import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RatingComponent } from './rating.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [RatingComponent],
  exports: [RatingComponent]
})
export class RatingModule {}
