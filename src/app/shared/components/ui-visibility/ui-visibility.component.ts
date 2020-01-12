import { Component, Input } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ui-visibility',
  templateUrl: './ui-visibility.component.html',
  styleUrls: ['./ui-visibility.component.scss']
})
export class UiVisibilityComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  @Input() public visible: boolean;
}
