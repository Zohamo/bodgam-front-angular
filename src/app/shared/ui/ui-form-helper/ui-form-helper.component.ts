import { Component, Input } from '@angular/core';
import { faQuestion, faAsterisk, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ui-form-helper',
  templateUrl: './ui-form-helper.component.html',
  styleUrls: ['./ui-form-helper.component.scss']
})
export class UiFormHelperComponent {
  faQuestion = faQuestion;
  faAsterisk = faAsterisk;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  @Input() public required = true;
  @Input() public privacy = false;
}
