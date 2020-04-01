import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlayersSubscriptionComponent } from './event-players-subscription.component';

describe('EventPlayersSubscriptionComponent', () => {
  let component: EventPlayersSubscriptionComponent;
  let fixture: ComponentFixture<EventPlayersSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPlayersSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPlayersSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
