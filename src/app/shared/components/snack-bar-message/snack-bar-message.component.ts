import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-message',
  templateUrl: './snack-bar-message.component.html',
  styleUrls: ['./snack-bar-message.component.scss']
})
export class SnackBarMessageComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
