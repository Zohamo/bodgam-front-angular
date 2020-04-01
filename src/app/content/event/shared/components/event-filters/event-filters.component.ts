import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { EventBg } from '@/models';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-event-filters',
  templateUrl: './event-filters.component.html',
  styleUrls: ['./event-filters.component.scss']
})
export class EventFiltersComponent {
  public filter: FormControl = new FormControl('');
  private filter$: Observable<string>;

  /**
   * Input
   */

  private events$: Observable<EventBg[]>;
  @Input() set setEvents(events$: Observable<EventBg[]>) {
    if (events$) {
      this.events$ = events$;
      this.createFilters();
    }
  }

  /**
   * Output
   */

  @Output() filteredEvents$ = new EventEmitter<Observable<EventBg[]>>();

  /**
   * Creates an instance of EventFiltersComponent.
   *
   * @memberof EventFiltersComponent
   */
  constructor() {
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
  }

  /**
   * Create the filters.
   *
   * @private
   * @memberof EventFiltersComponent
   */
  private createFilters(): void {
    this.filteredEvents$.emit(
      combineLatest(this.events$, this.filter$).pipe(
        map(([events, filterString]) =>
          events.filter((event) => event.title.toLowerCase().indexOf(filterString.toLowerCase()) !== -1)
        )
      )
    );
  }
}
