import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LocationItem } from '@/models';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

// Entry Components
import { LocationDetailDialogComponent } from '@/content/location/components';

@Component({
  selector: 'app-event-location',
  templateUrl: './event-location.component.html',
  styleUrls: ['./event-location.component.scss']
})
export class EventLocationComponent {
  faBuilding = faBuilding;
  @Input() location: LocationItem;
  @Input() showLocation: boolean;

  /**
   * Creates an instance of EventLocationComponent.
   *
   * @param {MatDialog} dialog
   * @memberof EventLocationComponent
   */
  constructor(private dialog: MatDialog) {}

  /**
   * OnEvent open the Location detail dialog.
   *
   * @memberof EventLocationComponent
   */
  public onOpenLocationDetailDialog(): void {
    if (this.showLocation) {
      this.dialog.open(LocationDetailDialogComponent, {
        data: { id: this.location.id }
      });
    }
  }
}
