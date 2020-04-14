import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EventBg } from '@/models';

@Component({
  selector: 'app-location-event-list-dialog',
  templateUrl: './location-event-list-dialog.component.html',
  styleUrls: ['./location-event-list-dialog.component.scss']
})
export class LocationEventListDialogComponent {
  /**
   * Creates an instance of LocationEventListDialogComponent.
   *
   * @param {{ locationName: string; events: EventBg[]; preventDelete?: boolean }} data
   * @memberof LocationEventListDialogComponent
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { locationName: string; events: EventBg[]; preventDelete?: boolean }
  ) {}
}
