import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ui-spinner',
  templateUrl: './ui-spinner.component.html',
  styleUrls: ['./ui-spinner.component.scss']
})
export class UiSpinnerComponent {
  @Input() message: string;
}
