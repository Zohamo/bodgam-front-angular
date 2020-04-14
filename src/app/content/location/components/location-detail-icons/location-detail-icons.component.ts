import { Component, Input } from '@angular/core';
// UI
import { faSmoking, faSmokingBan, faWheelchair } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-location-detail-icons',
  templateUrl: './location-detail-icons.component.html',
  styleUrls: ['./location-detail-icons.component.scss']
})
export class LocationDetailIconsComponent {
  faSmoking = faSmoking;
  faSmokingBan = faSmokingBan;
  faWheelchair = faWheelchair;

  @Input() isAllowedSmoking: boolean;
  @Input() isAccessible: boolean;
  @Input() size = 'sm';
}
