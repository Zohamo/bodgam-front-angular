import { Component, Input } from '@angular/core';
import { EventRepresentation } from '@/models';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  public event: EventRepresentation;

  @Input() set eventDetail(eventDetail: EventRepresentation) {
    this.event = eventDetail;
  }
}
