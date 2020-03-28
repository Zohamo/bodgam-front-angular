import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTimeslotComponent } from './event-timeslot.component';

describe('EventTimeslotComponent', () => {
  let component: EventTimeslotComponent;
  let fixture: ComponentFixture<EventTimeslotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTimeslotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTimeslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
