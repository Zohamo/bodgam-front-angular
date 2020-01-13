import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAtmosphereComponent } from './event-atmosphere.component';

describe('EventAtmosphereComponent', () => {
  let component: EventAtmosphereComponent;
  let fixture: ComponentFixture<EventAtmosphereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAtmosphereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAtmosphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
