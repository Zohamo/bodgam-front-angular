import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEventListDialogComponent } from './location-event-list-dialog.component';

describe('LocationEventListDialogComponent', () => {
  let component: LocationEventListDialogComponent;
  let fixture: ComponentFixture<LocationEventListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationEventListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationEventListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
