import { Component, Input } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button-visibility',
  templateUrl: './button-visibility.component.html',
  styleUrls: ['./button-visibility.component.scss']
})
export class ButtonVisibilityComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  @Input() public visible: boolean;
}
