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
          events.filter((event: EventBg) => {
            return [
              event.title,
              event.host.name,
              event.location.district,
              event.location.city,
              event.location.country
            ].find((param) => {
              if (this.isStringFound(filterString, param)) {
                return true;
              }
            });
          })
        )
      )
    );
  }

  /**
   * Search if "search" exists in "data".
   *
   * @private
   * @param {string} search
   * @param {string} data
   * @returns {boolean}
   * @memberof EventFiltersComponent
   */
  private isStringFound(search: string, data: string): boolean {
    return data ? data.toLowerCase().indexOf(search.toLowerCase()) !== -1 : false;
  }
}
