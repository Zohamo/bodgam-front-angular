import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLevelComponent } from './event-level.component';

describe('EventLevelComponent', () => {
  let component: EventLevelComponent;
  let fixture: ComponentFixture<EventLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
